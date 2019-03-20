if (""+$env.username -eq "") {
	$username = Read-Host -Prompt 'Input your CMUTUAL user name (e.g. "shk6756")'
	$env = @{}
	$env.username = $username
	$env.username = ($env.username -replace "[^0-9a-z]", "")
}

$resourceGroupName = "$env:username-lunch-servicebus-rg"
$webAppesourceGroupName = "$env:username-lunch-webapp-rg"
$serviceBusNamespaceName = "$env:username-lunch-sbns"
$topicName = "order-placed-sbt"
$ccSubscriptionName = "cc-processor-sbs"
$notifySubscriptionName = "notify-processor-sbs"
$apiAppServiceName = "$env:username-lunch-api-as"

if (!(pwd).Path.EndsWith("azuretraining")) {
    Write-Error "You must be in the azuretraining folder"
    exit
}
if ($env.username -eq "") {
    Write-Error 'The variable $env.username does not contain a user, aborting...'
    exit
}

if (Get-Command "git.exe" -ErrorAction SilentlyContinue) 
{ 
    Write-Host "Getting latest version of course from github..."
    git pull
} else {
    Write-Host "Warning - git not in path, skipping pull..."
}

Write-Host "Checking if resource group exists..."
if ("true" -eq (az group show --name $resourceGroupName)) {
    Write-Host "Resource group $resourceGroupName exists, deleting..."
    az group delete --name $resourceGroupName
}

Write-Host "Creating resource group..."
az group create --name $resourceGroupName --location "East US"

Write-Host "Creating service bus namespace $serviceBusNamespaceName..."
az servicebus namespace create `
    --name $serviceBusNamespaceName `
    --resource-group $resourceGroupName `
    --sku Standard

Write-Host "Creating topic $topicName..."
az servicebus topic create `
    --name $topicName `
    --namespace-name $serviceBusNamespaceName `
    --resource-group $resourceGroupName

Write-Host "Creating subscription $ccSubscriptionName..."
az servicebus topic subscription create `
    --name $ccSubscriptionName `
    --topic-name $topicName `
    --namespace-name $serviceBusNamespaceName `
    --resource-group $resourceGroupName

Write-Host "Creating subscription $notifySubscriptionName..."
az servicebus topic subscription create `
    --name $notifySubscriptionName `
    --topic-name $topicName `
    --namespace-name $serviceBusNamespaceName `
    --resource-group $resourceGroupName

Write-Host "Getting connection string..."
$serviceBusConnectionString = az servicebus namespace authorization-rule keys list `
    --namespace-name $serviceBusNamespaceName `
    --resource-group $resourceGroupNAme `
    --name RootManageSharedAccessKey `
    --query "primaryConnectionString"

Write-Host "Setting app config settings..."
$newAppSettings = "ServiceBusConnectionString=$serviceBusConnectionString"
az webapp config appsettings set --settings $newAppSettings `
                    --name $apiAppServiceName `
                    --resource-group $webAppesourceGroupName
$newAppSettings = "ServiceBusTopicName=$topicName"
az webapp config appsettings set --settings $newAppSettings `
                    --name $apiAppServiceName `
                    --resource-group $webAppesourceGroupName

Write-Host "Done!"
