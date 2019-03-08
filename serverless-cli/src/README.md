# Project Setup
## Database Setup
1. Open the Azure Portal and navigate to Azure Cosmos DB
2. Add a new Cosmos DB  Account. Choose "Core (SQL)" as the API and pick a location close to you.
3. Wait for the CosmosDB Account to finish creating. Then navigate to the newly created account and click on "Data Explorer" on the left pane.
4. Click on "New Database" in the top left and name the Database ID as "FoodOrder" and save it.
5. Click on "New Collection". For the Database ID use the existing "FoodOrder" database you just created. Set the Collection ID to "MenuOption" and the partition key to "id". Then hit "OK" to create the collection.
6. Create a second collection with the same settings as the first, except set the Collection ID to "Order"
7. Keep the azure portal open, and open the `ServerlessFoodOrderApi.sln` in Visual Studio
8. In the `ServerlessFoodOrder.Api` project create a file called `local.settings.json`. Give it the following contents:
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet"
  },
  "Host": {
    "CORS": "*"
  },
  "ConnectionStrings": {
    "CosmosDBEndpoint": "{YOUR_COSMOS_DB_ENDPOINT}",
    "CosmosDBKey": "{YOUR_COSMOS_DB_KEY}"
  }
}
```

9. On the azure portal, go to the Cosmos DB Account you created and click on the "Overview" option on the left pane. Copy the Replace the "URI" value and paste it in the `{YOUR_COSMOS_DB_ENDPOINT}` field of the `local.settings.json` file.
10. On the azure portal, navigate to the "Keys" option on the left pane. Copy the "Primary Key" value and paste it in place of `{YOUR_COSMOS_DB_KEY}` in the `local.settings.json` file.

You should now be able to set `ServerlessFoodOrder.Api` as the startup project and run the Azure Functions locally through Visual Studio.

## Front End Setup
1. Use Visual Studio Code and open the `ServerlessFoodOrderApi.Web` directory.
2. Make sure you have Node.js and NPM installed. Then run `npm install` to install all of the dependencies.
3. Run `npm start` to start the front end static site. The site should be hosted on `http://localhost:4200`

# Deployment
## Azure Function Deployment
1. In Visual Studio right click on the `ServerlessFoodOrder.Api` project and select "Publish...". When creating a new publish profile, choose "Azure Function App". Select a resource group, hosting plan, etc. and click create. Then click the publish button to publish to Azure.
2. In the Azure portal, navigate to the "Function App" page. Click on the Function App you just created and then select the "Platform Features" tab.
3. Select the "Application Settings" option and scroll down to the "Connection Strings" section. Add two new entries called `CosmosDBEndpoint` and `CosmosDBKey` and use the same values you set in the `local.settings.json` file.

## Static Site Deployment
1. Install the Azure Storage extension for Visual Studio Code found [here](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage)
2. Click on the new Azure icon on the left pane of VS Code and sign into your Azure account.
3. On the Azure Portal, navigate to the "Storage Accounts" section and create a new storage account. Make sure that you choose "StorageV2 (general purpose v2)" as the Account Kind as this is required to host a static site.
4. Once it is finished being created, navigate to the new storage account. Click on "Static website"
5. On the Azure Portal, navigate to your Function App. Copy the URL from the Overview section and paste it in the `apiDomain` variable in the `src/environments/environments.prod.ts` file.
6. Run `npm run build:prod` to build the site. This will output to the `dist` directory.
7. Right click on the `dist/serverless-food-order-web` directory and select "Deploy to Static Website". Select the storage account you previously set up.
8. Once it is deployed, you'll need to set up CORS so it can communicate with the API. Go back to the storage account's "Static website" page. Copy the "Primary endpoint" value. Then navigate to your Function App > Platform features > CORS and add the URL as an allowed origin. Navigating to that same URL should display the hosted site communicating with your Azure Function back end.