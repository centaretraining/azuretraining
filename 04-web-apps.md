# Exercise 1: Web Apps and Azure SQL

In this exercise you will deploy a .Net website with a SQL back end to an Azure Web Application which connects to the managed Azure SQL instance you created in the previous exercise.

The application consists of an ASP.Net Core API project and an ASP.Net Core website that serves up the home page for an Angular single page application.

> This exercise builds on the Azure SQL Server created in exercise 3. If you did not complete it or made potentially breaking changes to the configuration you can run the following script to delete any resources you have and recreate the server:
> ```powershell
> c:\azuretraining\azure-sql\complete.ps1
> ```

## Create an Azure App Service Hosting Plan with two App Services for your UI and API

1. Open up a PowerShell console window
<!--and navigate to the azuretraining folder you downloaded in step 2.-->

<!--
2. Set a variable for the resource group you created in previous exercises. You will use this variable in many of the commands for this exercise so you don't have to retype it.

    ```powershell
    $resourceGroupName = "$env:username-lunch-webapp-rg"
    ```

    > The $env variable is a built in Powershell value that allows you to access system information. Here you are using it to get your Windows user name to make your resource group name is unique in case you are sharing a subscription with other class members.
-->

2. Create an App Service Plan using the Standard tier.

    ```powershell
    az appservice plan create `
        --resource-group "$env:username-lunch-webapp-rg" `
        --name "$env:username-lunch-hp" `
        --sku S1 `
        --location "eastus" `
        --verbose
    ```

    > The $env variable is a built in Powershell value that allows you to access system information. Here you are using it to get your Windows user name to make your resource group and resource names are unique since you are sharing a subscription with other class members.

    > You should now have an app service plan. An app service plan is a group of servers that underlie hosting options. This is the Azure equivalent of setting up an IIS server and putting your apps on it.

4. Create a Web App that uses the App Service Plan for the front end UI.

    ```powershell
    # the name of the app service, the URL for your site will be https://[app servicename].azurewebsites.net
    az webapp create `
        --resource-group "$env:username-lunch-webapp-rg" `
        --name "$env:username-lunch-web-as" `
        --plan "$env:username-lunch-hp" `
        --verbose
    ```

    > This is like creating a new website in IIS.

    ```powershell
    # Grab the hostname of the site. You can also look this up in the Azure portal.
    az webapp show `
        --name "$env:username-lunch-web-as" `
        --resource-group "$env:username-lunch-webapp-rg" `
        --query defaultHostName `
        --output table
    ```

    > You can use the query option to filter on specific fields. This is a handy way to get specific values to use in later variables. Try querying some different fields on the object.

5. Open up a browser go to the URL https://[Your CMUTUAL user name]-lunch-web-as.azurewebsites.net.  A default web application page should be displayed.

6. Create an App Service in the hosting plan for the APIs.

    ```powershell
    # The URL for your site will be https://[app servicename].azurewebsites.net
    az webapp create `
        --resource-group "$env:username-lunch-webapp-rg" `
        --name "$env:username-lunch-api-as" `
        --plan "$env:username-lunch-hp" `
        --verbose

    # Grab the hostname of the site. You can also look this up in the Azure portal.
    az webapp show `
        --name "$env:username-lunch-api-as" `
        --resource-group "$env:username-lunch-webapp-rg" `
        --query defaultHostName `
        --output table
    ```

7. Verify your API app was created by navigating to the app service URL in a browser (https://[Your CMUTUAL user name]-lunch-api-as.azurewebsites.net).

8. Open the Azure portal at https://portal.azure.com.  Navigate to your resource group.  You should see resources for the App Hosting Plan and the two App Services in that plan.  Open them up and explore the options available for monitoring and configuring your App Service.

    ![Web App Resources](images/web-apps-resource-group.png)

## Deploy your code to the UI and API App Services

We'll deploy our code using a zip file deploy.

The application code for the website and API has already been created for you. You will publish it to a local folder, zip up the application, and deploy the zip file by posting to a management service included with every Azure app service.

9. Build the web and API applications. You may need to install the [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download/visual-studio-sdks)

    ```powershell
    # Build the ASP.Net Core API project
    dotnet publish c:\azuretraining\web-apps-powershell\src\WebAppFoodOrder.Api\WebAppFoodOrder.Api.csproj -o c:\azuretraining\publish\webapi

    # Build the ASP.Net Core website project
    dotnet publish c:\azuretraining\web-apps-powershell\src\WebAppFoodOrder.Web\WebAppFoodOrder.Web.csproj -o c:\azuretraining\publish\webapp
    ```

10. Zip up the output of the publish operations

    ```powershell
    # Zip up the API application
    Compress-Archive -Path c:\azuretraining\publish\webapi\* -DestinationPath c:\azuretraining\publish\webappapi.zip -Force

    # Zip up the website application
    Compress-Archive -Path c:\azuretraining\publish\webapp\* -DestinationPath c:\azuretraining\publish\webappweb.zip -Force
    ```

11. Deploy API application using zip file deployment.

    ```powershell
    az webapp deployment source config-zip `
        --resource-group "$env:username-lunch-webapp-rg" `
        --name "$env:username-lunch-api-as" `
        --src c:\azuretraining\publish\webappapi.zip
    ```

12. Deploy the web application using zip file deployment.

    ```powershell
    az webapp deployment source config-zip  `
        --resource-group "$env:username-lunch-webapp-rg" `
        --name "$env:username-lunch-web-as" `
        --src c:\azuretraining\publish\webappweb.zip
    ```

13. Update the web app service's configuration settings with the URL of the API.

    ```powershell
    az webapp config appsettings set `
        --resource-group "$env:username-lunch-webapp-rg" `
        --settings "ApiDomain=https://$env:username-lunch-api-as.azurewebsites.net" `
        --name "$env:username-lunch-web-as"
    ```

14. Update the API app service's configuration settings with the SQL server location, database name, and credentials you used in the Azure SQL exercise. We will also set the ASPNETCORE_ENVIRONMENT variable to "Development" so ASP.Net Core will show us exception details if we have any issues.

    ```powershell
    $connectionString = "Server=tcp:$env:username-lunch-sql.database.windows.net,1433;Initial Catalog=lunch-db;Persist Security Info=False;User ID=lunchadmin;Password=%Lunch4U!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

    az webapp config connection-string set `
        --resource-group "$env:username-lunch-webapp-rg" `
        --name "$env:username-lunch-api-as" `
        --connection-string-type SQLAzure `
        --settings MenuConnection=$connectionString OrderConnection=$connectionString
    ```
    > Configuration settings is Azure Web Applications are passed to your application as environment variables.  A common pattern for .Net applications is to use the Microsoft.Extensions.Configuration NuGet package and merge together the values in your appsettings.json file with environment variables.

15. Set [CORS](https://docs.microsoft.com/en-us/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) on your API so it will respond to requests from the web app. 

    ```powershell
    az webapp cors add `
        --resource-group "$env:username-lunch-webapp-rg" `
        --name "$env:username-lunch-api-as" `
        --allowed-origins '*'
    ```

    > Don't set your allowed origins to "*" in production. That opens you up to cross site scripting attacks.

16. Open a browser and navigate to your site at https://[Your CMUTUAL user name]-lunch-web-as.azurewebsites.net.  A basic site should come up that allows you to place lunch orders.

### Further Exploration
Go to the portal and check out the resources you made. Explore the different web app options.

Congrats, you deployed a web application on Azure using an App Service plan. In the next exercise, you'll deploy a web application on a Kubernetes cluster.

Next: [Containers and Kubernetes](05-containers-kubernetes.md)
