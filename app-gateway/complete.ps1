$resourceGroupName = "$env:username-lunch-webapp-rg"
$backEndSubnetName = "backend-sn"
$appGatewaySubnetName = "dmz-sn"
$vnetName = "app-gateway-vnet"
$appGatewayName = "lunch-api-agw"
$publicIpAddressName = "lunch-app-gateway-ip"
$sku = "WAF_v2" # "Standard_Medium"
$location = "eastus"
$apiAppDnsName = "$env:username-lunch-api-as.azurewebsites.net"

Write-Host "Cleaning up resources..."
Write-Host "  Deleting app gateway..."
az network application-gateway delete `
  --name $appGatewayName `
  --resource-group $resourceGroupName
Write-Host "  Deleting public IP..."
az network public-ip delete `
  --name $publicIpAddressName `
  --resource-group $resourceGroupName
Write-Host "  Deleting subnets.."
az network vnet subnet delete `
  --name $backEndSubnetName `
  --vnet-name $vnetName `
  --resource-group $resourceGroupName
az network vnet subnet delete `
  --name $appGatewaySubnetName `
  --vnet-name $vnetName `
  --resource-group $resourceGroupName
Write-Host "  Deleting VNet..."
az network vnet delete `
  --name $vnetName `
  --resource-group $resourceGroupName

Write-Host "Creating VNet to hold App Gateway..."
az network vnet create `
  --name $vnetName `
  --resource-group $resourceGroupName `
  --location $location `
  --address-prefix 10.0.0.0/16 `
  --subnet-name $appGatewaySubnetName `
  --subnet-prefix 10.0.1.0/24 `
  --verbose

Write-Host "Creating subnet in VNet..."
az network vnet subnet create `
  --name $backEndSubnetName `
  --resource-group $resourceGroupName `
  --vnet-name $vnetName   `
  --address-prefix 10.0.2.0/24 `
  --verbose

Write-Host "Creating public IP address for gateway..."
az network public-ip create `
  --resource-group $resourceGroupName `
  --location $location `
  --sku Standard `
  --name $publicIpAddressName `
  --verbose

Write-Host "Creating application gateway, this may take a while..."
az network application-gateway create `
    --name $appGatewayName `
    --location $location `
    --resource-group $resourceGroupName `
    --capacity 2 `
    --sku $sku `
    --http-settings-cookie-based-affinity Enabled `
    --public-ip-address $publicIpAddressName `
    --vnet-name $vnetName `
    --subnet $appGatewaySubnetName `
    --servers "$apiAppDnsName" `
    --verbose

$appGatewayIp = (az network public-ip show `
  --resource-group $resourceGroupName `
  --name $publicIpAddressName `
  --query ipAddress).Replace('"', '')
Write-Host "You can reach your application gateway at: http://$appGatewayIp"

Write-Host "Updating HTTP settings for App Services..."
az network application-gateway http-settings update `
    --name appGatewayBackendHttpSettings `
    --gateway-name $appGatewayName `
    --resource-group $resourceGroupName `
    --host-name-from-backend-pool true

Write-Host "Enabling WAF prevention..."
az network application-gateway waf-config set `
    --gateway-name $appGatewayName `
    --resource-group $resourceGroupName `
    --enabled true `
    --firewall-mode Prevention `
    --rule-set-version 3.0
