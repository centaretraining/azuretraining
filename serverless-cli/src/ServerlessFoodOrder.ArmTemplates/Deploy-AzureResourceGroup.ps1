#Requires -Version 3.0

Param(
    [string] $ResourceGroupLocation = "eastus",
    [string] $ResourceGroupName = "training-exercise3-rg",
    [string] $StorageAccountName,
    [string] $StorageContainerName = $ResourceGroupName.ToLowerInvariant() + '-stageartifacts',
    [string] $TemplateFile = 'azuredeploy.json',
    [string] $TemplateParametersFile = 'azuredeploy.parameters.json',
    [string] $ArtifactStagingDirectory = '.',
    [switch] $ValidateOnly
)

$UploadArtifacts = $true

try {
    [Microsoft.Azure.Common.Authentication.AzureSession]::ClientFactory.AddUserAgent("VSAzureTools-$UI$($host.name)".replace(' ','_'), '3.0.0')
} catch { }

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 3

function Format-ValidationOutput {
    param ($ValidationOutput, [int] $Depth = 0)
    Set-StrictMode -Off
    return @($ValidationOutput | Where-Object { $_ -ne $null } | ForEach-Object { @('  ' * $Depth + ': ' + $_.Message) + @(Format-ValidationOutput @($_.Details) ($Depth + 1)) })
}

$OptionalParameters = New-Object -TypeName Hashtable

$OptionalParameters["uniqueString"] = "$env:username"

$TemplateFile = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($PSScriptRoot, $TemplateFile))
$TemplateParametersFile = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($PSScriptRoot, $TemplateParametersFile))

if ($UploadArtifacts) {
    # Convert relative paths to absolute paths if needed
    $ArtifactStagingDirectory = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($PSScriptRoot, $ArtifactStagingDirectory))

    # Parse the parameter file and update the values of artifacts location and artifacts location SAS token if they are present
    $JsonParameters = Get-Content $TemplateParametersFile -Raw | ConvertFrom-Json
    if (($JsonParameters | Get-Member -Type NoteProperty 'parameters') -ne $null) {
        $JsonParameters = $JsonParameters.parameters
    }
    $ArtifactsLocationName = '_artifactsLocation'
    $ArtifactsLocationSasTokenName = '_artifactsLocationSasToken'
    $OptionalParameters[$ArtifactsLocationName] = $JsonParameters | Select -Expand $ArtifactsLocationName -ErrorAction Ignore | Select -Expand 'value' -ErrorAction Ignore
    $OptionalParameters[$ArtifactsLocationSasTokenName] = $JsonParameters | Select -Expand $ArtifactsLocationSasTokenName -ErrorAction Ignore | Select -Expand 'value' -ErrorAction Ignore

    # Create a storage account name if none was provided
    if ($StorageAccountName -eq '') {
        $StorageAccountName = 'stage' + (az account show --query "id").Replace('"', '').Replace('-', '').substring(0, 17) + 'sa'
    }

    # Create the storage account if it doesn't already exist
    $StorageResourceGroupName = $ResourceGroupName
    az group create --location "$ResourceGroupLocation" --name $StorageResourceGroupName
    az storage account create `
        --name $StorageAccountName `
        --sku "Standard_LRS" `
        --resource-group $StorageResourceGroupName `
        --location "$ResourceGroupLocation" `
        --verbose

    # Generate the value for artifacts location if it is not provided in the parameter file
    if ($OptionalParameters[$ArtifactsLocationName] -eq $null) {
        $StorageBlobEndPoint = (az storage account show --name $StorageAccountName --query "primaryEndpoints.blob").Replace('"', '')
        $OptionalParameters[$ArtifactsLocationName] = $StorageBlobEndPoint + $StorageContainerName
    }

    # Copy files from the local storage staging location to the storage account container
    az storage container create --name $StorageContainerName --account-name $StorageAccountName

    az storage blob upload-batch `
        --destination $StorageContainerName `
        --account-name $StorageAccountName `
        --source $ArtifactStagingDirectory
    
    # Generate a 4 hour SAS token for the artifacts location if one was not provided in the parameters file
    if ($OptionalParameters[$ArtifactsLocationSasTokenName] -eq $null) {
            $OptionalParameters[$ArtifactsLocationSasTokenName] = (az storage container generate-sas `
                    --name $StorageContainerName `
                    --account-name $StorageAccountName `
                    --expiry (Get-Date).AddHours(12).ToUniversalTime().ToString("yyyy-MM-ddTHH:mmZ") `
                    --permissions lr).Replace('"', '')
            $OptionalParameters[$ArtifactsLocationSasTokenName] = "?" + $OptionalParameters[$ArtifactsLocationSasTokenName]
    }
}

# Create or update the resource group using the specified template file and template parameters file
if ("false" -eq (az group exists --name $ResourceGroupName)) {
    az group create --name $ResourceGroupName --location "$ResourceGroupLocation" --verbose
}

$Parameters = (($OptionalParameters.Keys | foreach { "\""$_\"":{\""value\"":\""$($OptionalParameters[$_])\""}" }) -join ",")
$Parameters = "{$Parameters}"
if ($ValidateOnly) {
    az group deployment test --name $deploymentName `
        --resource-group $ResourceGroupName `
        --template-file $TemplateFile `
        --parameters `@"$TemplateParametersFile" `
        --parameters $Parameters `
        --output json `
        --verbose
}
else {
    $deploymentName = ((Get-ChildItem $TemplateFile).BaseName + '-' + ((Get-Date).ToUniversalTime()).ToString('MMdd-HHmm'))
    az group deployment create --name $deploymentName `
        --resource-group $ResourceGroupName `
        --template-file $TemplateFile `
        --parameters `@"$TemplateParametersFile" `
        --parameters $Parameters `
        --output json `
        --verbose
}