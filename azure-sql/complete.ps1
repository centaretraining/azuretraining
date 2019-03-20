if (""+$env.username -eq "") {
	$username = Read-Host -Prompt 'Input your CMUTUAL user name (e.g. "shk6756")'
	$env = @{}
	$env.username = $username
	$env.username = ($env.username -replace "[^0-9a-z]", "")
}

$sqlAdminUserName = 'lunchadmin'
$sqlAdminPassword = '%Lunch4U!'
$sqlServerName = "$env:username-lunch-sql"
$resourceGroupName = "$env:username-lunch-webapp-rg"
$sqlDatabaseName = 'lunch-db'

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
if ("true" -eq (az group exists --name $resourceGroupName)) {
    Write-Host "Resource group $resourceGroupName exists, deleting..."
    az group delete --name $resourceGroupName -y
}

Write-Host "Creating resource group $resourceGroupName"
az group create --name $resourceGroupName --location "East US"

Write-Host "Creating SQL Server $sqlServerName"
az sql server create `
	--name $sqlServerName `
	--resource-group $resourceGroupName `
	--location eastus  `
	--admin-user $sqlAdminUserName `
	--admin-password $sqlAdminPassword

Write-Host "Creating database $sqlDatabaseName"
az sql db create `
	--resource-group $resourceGroupName `
	--server $sqlServerName `
	--name $sqlDatabaseName `
	--service-objective S0

Write-Host "Creating firewall rule..."
az sql server firewall-rule create -g $resourceGroupName -s $sqlServerName -n "allowAzure" --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

Write-Host "SQL Server created!"