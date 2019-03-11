# Exercise 1: Web Apps and Azure SQL with Powershell

In this exercise we will deploy a .Net website with a SQL back end to an Azure Web Application with a managed Azure SQL instance.

The application consists of an ASP.Net Core API project, and an ASP.Net Core website that serves up the home page for an Angular single page application.

All resources will be created using the Powershell AzureRM module.

## Create an Azure App Service Hosting Plan with two App Services for your UI and API

1. Follow the setup instructions to connect to an Azure Shell.  

    - Make sure you are in the azuretraining folder under you $home directory.
        ```powershell
        cd $home/azuretraining
        ```
    - Make sure your **$resourceGroupName** and **$uniqueString** variables are set:
        ```powershell
        if ("$resourceGroupName" -eq "") { Write-Error '$resourceGroupName is NOT set!' } else { '$resourceGroupName is set!' }

        if ("$uniqueString" -eq "") { Write-Error '$uniqueString is NOT set!' } else { '$uniqueString is set!' }
        ```

2. Create an App Service Plan using the Standard tier.

    ```powershell
    # The name of the hosting plan that will contain the app services
    $appServicePlanName = "lunch-$uniqueString-hp"
    
    New-AzureRmAppServicePlan `
        -Name $appServicePlanName `
        -Location "North Central US" `
        -ResourceGroupName $resourceGroupName `
        -Tier Standard
    ```

4. Create an App Service in the hosting plan for the front end UI.

    ```powershell
    # the name of the app service, the URL for your site will be https://[app servicename].azurewebsites.net
    $webAppServiceName = "lunch-$uniqueString-web-as"

    $webApp = New-AzureRmWebApp `
        -Name $webAppServiceName `
        -AppServicePlan $appServicePlanName `
        -ResourceGroupName $resourceGroupName
    
    # Write out the results of the command
    $webApp
    # Get the host name for the new site
    $webApp.DefaultHostName
    ```

5. The output of the "$webApp.DefaultHostName" command will be the URL for your new site in the format XXXX.azurewebsites.net. Open up a browser an go this URL.  A default web application page should be displayed.

6. Create an App Service in the hosting plan for the APIs.

    ```powershell
    # The name of the app service, the URL for your site will be https://[app servicename].azurewebsites.net
    $apiAppServiceName = "lunch-$uniqueString-api-as"

    $apiApp = New-AzureRmWebApp `
        -Name $apiAppServiceName `
        -AppServicePlan $appServicePlanName `
        -ResourceGroupName $resourceGroupName
    
    # Write out the results of the command
    $apiApp
    # Get the host name for the new site
    $apiApp.DefaultHostName
    ```

7. Verify your API app was created by navigating to the app service URL in a browser.

8. Open the Azure portal at https://portal.azure.com.  Navigate to your resource group.  You should see resources for the App Hosting Plan and the two App Services in that plan.  Open them up and explore the options available for monitoring and configuring your App Service.

    ![Web App Resources](images/web-apps-resource-group.png)

## Deploy your code to the UI and API App Services

We'll deploy our code using a zip file deploy.

The application code for the website and API has already been created for you. You will publish it to a local folder and deploy it using zip deployments.

9. Build the web and API applications

    ```powershell
    # Build the ASP.Net Core API project
    dotnet publish ./web-apps-powershell/src/WebAppFoodOrder.Api/WebAppFoodOrder.Api.csproj -o $home/azuretraining/publish/webappapi

    dotnet publish ./web-apps-powershell/src/WebAppFoodOrder.Web/WebAppFoodOrder.Web.csproj -o $home/azuretraining/publish/webappweb
    ```

14. Zip up the output of the publish operations

    ```powershell
    Compress-Archive -Path ./publish/webappapi/* -DestinationPath ./publish/webappapi.zip -Force
    Compress-Archive -Path ./publish/webappweb/* -DestinationPath ./publish/webappweb.zip -Force
    ```

12. Deploy API application using zip file deployment.

    ```powershell
    # This script assumes the variable $apiAppServiceName is still set in your Powershell environment. If it is not set uncomment the line below and set it to your unique app service name.
    # $apiAppServiceName = "lunch-$uniqueString-api-as"

    # Retrieve the deploy user name and password
    $xml = [xml](Get-AzureRmWebAppPublishingProfile -Name $apiAppServiceName -ResourceGroupName $resourceGroupName)
    $deployUserName = $xml.SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@userName").value
    $deployPassword = $xml.SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@userPWD").value
    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $deployUserName, $deployPassword)))

    # HTTP POST the zip file to the app service management API
    Invoke-RestMethod -Uri "https://$apiAppServiceName.scm.azurewebsites.net/api/zipdeploy" -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -UserAgent "powershell/1.0" -Method POST -InFile "./publish/webappapi.zip" -ContentType "multipart/form-data"
    ```

13. Deploy the web application using zip file deployment.

    ```powershell
    # This script assumes the variable $webAppServiceName is still set in your Powershell environment. If it is not set uncomment the line below and set it to your unique app service name.
    # $webAppServiceName = "lunch-$uniqueString-web-as"

    # Retrieve the deploy user name and password
    $xml = [xml](Get-AzureRmWebAppPublishingProfile -Name $webAppServiceName -ResourceGroupName $resourceGroupName)
    $deployUserName = $xml.SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@userName").value
    $deployPassword = $xml.SelectNodes("//publishProfile[@publishMethod=`"MSDeploy`"]/@userPWD").value
    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $deployUserName, $deployPassword)))

    # HTTP POST the zip file to the app service management API
    Invoke-RestMethod -Uri "https://$webAppServiceName.scm.azurewebsites.net/api/zipdeploy" -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -UserAgent "powershell/1.0" -Method POST -InFile "./publish/webappweb.zip" -ContentType "multipart/form-data"
    ```

14. Update the app service's configuration settings with the SQL server location, database name, and credentials you used in the Azure SQL exercise.

    ```powershell
    $sqlServerName = "lunch-sql"
    $sqlServerDatabaseName = "lunch-db"
    $sqlAdminUserName = "XXXXX"
    $sqlAdminPassword = "XXXXX"

    $newAppSettings = @{"ApiDomain"="https://$apiAppServiceName.azurewebsites.net"}
    Set-AzureRmWebApp -AppSettings $newAppSettings -Name $webAppServiceName -ResourceGroupName $resourceGroupName

    $connectionString = "Server=tcp:$sqlServerName.database.windows.net,1433;Initial Catalog=$sqlDatabaseName;Persist Security Info=False;User ID=$sqlAdminUserName;Password=$sqlAdminPassword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
    $newAppSettings = @{"MenuConnection"=$connectionString;"OrderConnection"=$connectionString}
    Set-AzureRmWebApp -AppSettings $newAppSettings -Name $apiAppServiceName -ResourceGroupName $resourceGroupName
    ```
    > Configuration settings is Azure Web Applications are passed to your application as environment variables.  A common pattern for .Net applications is to use the Microsoft.Extensions.Configuration NuGet package and merge together the values in your appsettings.json file with environment variables.

15. Open a browser and navigate to your site at https://[your app service name].azurewebsites.net.  A basic site should come up that allows you to place lunch orders.

Next: [Containers and Kubernetes](05-containers-kubernetes.md)
