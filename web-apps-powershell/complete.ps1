if (""+$env.username -eq "") {
	$username = Read-Host -Prompt 'Input your CMUTUAL user name (e.g. "shk6756")'
	$env = @{}
	$env.username = $username
	$env.username = ($env.username -replace "[^0-9a-z]", "")
}

$resourceGroupName = "$env:username-lunch-webapp-rg"
$appServicePlanName = "$env:username-lunch-hp"
$webAppServiceName = "$env:username-lunch-web-as"
$apiAppServiceName = "$env:username-lunch-api-as"
$sqlServerName = "$env:username-lunch-sql"
$sqlDatabaseName = "lunch-db"
$sqlAdminUserName = "lunchadmin"
$sqlAdminPassword = "%Lunch4U!"

Write-Host "Running SQL Server deployment script..."
./azure-sql/complete.ps1

Write-Host "Creating app service plan $appServicePlanName..."
az appservice plan create -g $resourceGroupName `
    --name $appServicePlanName `
    --sku S1 `
    --location eastus 

Write-Host "Creating app service $webAppServiceName..."
az webapp create -n $webAppServiceName `
                -p $appServicePlanName `
                -g $resourceGroupName `
                --verbose

az webapp show --name $webAppServiceName `
                --resource-group $resourceGroupName `
                --query defaultHostName `
                -o table

Write-Host "Creating app service $apiAppServiceName..."
az webapp create -n $apiAppServiceName `
                -p $appServicePlanName `
                -g $resourceGroupName `
                --verbose

az webapp show --name $apiAppServiceName `
                --resource-group $resourceGroupName `
                --query defaultHostName `
                -o table

Write-Host "Building API project"
dotnet publish ./web-apps-powershell/src/WebAppFoodOrder.Api/WebAppFoodOrder.Api.csproj -o ./publish/webapi
Write-Host "Building Web project"
dotnet publish ./web-apps-powershell/src/WebAppFoodOrder.Web/WebAppFoodOrder.Web.csproj -o ./publish/webapp
    
Write-Host "Compressing API..."
Compress-Archive -Path ./web-apps-powershell/src/WebAppFoodOrder.Api/publish/webapi/* -DestinationPath ./web-apps-powershell/src/WebAppFoodOrder.Api/publish/webappapi.zip -Force
Write-Host "Compressing web..."
Compress-Archive -Path ./web-apps-powershell/src/WebAppFoodOrder.Web/publish/webapp/* -DestinationPath ./web-apps-powershell/src/WebAppFoodOrder.Web/publish/webappweb.zip -Force

Write-Host "Deploying API..."
az webapp deployment source config-zip  -g $resourceGroupName `
                -n $apiAppServiceName `
                --src ./web-apps-powershell/src/WebAppFoodOrder.Api/publish/webappapi.zip

Write-Host "Deploying web..."
az webapp deployment source config-zip  -g $resourceGroupName `
                -n $webAppServiceName `
                --src ./web-apps-powershell/src/WebAppFoodOrder.Web/publish/webappweb.zip

Write-Host "Setting API app config..."
$newAppSettings= "ApiDomain=https://$apiAppServiceName.azurewebsites.net"
az webapp config appsettings set --settings $newAppSettings `
                    -n $webAppServiceName `
                    -g $resourceGroupName

$connectionString = "Server=tcp:$sqlServerName.database.windows.net,1433;Initial Catalog=$sqlDatabaseName;Persist Security Info=False;User ID=$sqlAdminUserName;Password=$sqlAdminPassword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
az webapp config connection-string set -g $resourceGroupName `
                    -n $apiAppServiceName -t SQLAzure `
                    --settings MenuConnection=$connectionString OrderConnection=$connectionString

Write-Host "Configuring CORS..."
az webapp cors add -g $resourceGroupName -n $apiAppServiceName --allowed-origins '*'

Write-Host "Done!"
Write-Host "Website at https://$webAppServiceName.azurewebsites.net"
