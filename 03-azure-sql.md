# SQL Server in Azure

## SQL Server (in the portal)

You’re going to create a SQL Server Database in Azure using the Azure Portal.

Steps

1. Open the portal (portal.azure.com)

2. Click “Create a Resource” (top left corner)

3. Click “SQL Database”. If you don't see it, search for SQL Database and select that.

4. Fill out the Basic Tab

- Select a subscription
- Select the resource group you created in the previous step
- Enter a database name
- Under Server, click “Create New”
  - Fill out the server name, server admin credentials, and pick an admin password.

- Click “Next”

5. On the Additional Settings and Tags tabs, Click Next

6. Click Create

Once the database is deployed (this takes a few minutes), go to SQL databases and see if your database is present. Feel free to connect to the server using your preferred SQL tool (SQL Server Management Studio or Visual Studio)

## SQL Server (using the CLI)

1. Setup some variables

```PowerShell
$adminLogin='ServerAdmin'

#change this to a better password...
$password='Password1234!'

#change this to something unique
$servername='server-name'

#change this to your resource group
$resourceGroup='an existing resource group'

#change this to a database
$databaseName='a database you want to make'
```

2. Create a Database Server

```PowerShell
az sql server create `
	--name $servername `
	--resource-group $resourceGroup `
	--location northcentralus  `
	--admin-user $adminLogin `
	--admin-password $password
```

3. Make a database on the server

```PowerShell
az sql db create `
	--resource-group $resourceGroup `
	--server $servername `
	--name $databaseName `
	--service-objective S0
```
Next: [Web Apps with Azure and Sql](04-web-apps.md)