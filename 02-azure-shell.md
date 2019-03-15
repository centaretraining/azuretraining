# Set up Azure Shell

  For many of the exercises, we will be using the Azure CLI. The Azure CLI is a command line interface that you can use with Power shell or the standard command line. If you haven't installed the Azure CLI, do so now. It only takes a few minutes.

  If can't / don't want to setup Azure CLI, you can also use the Azure Cloud Shell. Cloud shell has many utilities pre-installed (docker, git, npm, etc...), so it's a handy way to use occasional commands. Unfortunately, the Azure Shell times out after 20 minutes, so it's not easy to use for long term Azure sessions.

  You can access the cloud shell by  navigating to [shell.azure.com](https://shell.azure.com) or clicking on the command line icon in the Azure Portal.

## Initialize environment

1. Open a PowerShell window. You can either open up a PowerShell directly (I recommend using PowerShell ISE) or use an embedded PowerShell window in Visual Studio Code.

2. Set the current active subscription you will run your commands against. First, get a list of all subscriptions you have associated with your account:

    Using the Azure CLI ("az" command)
    ```powershell
    az account list
    ```
    >Try adding a format parameter, like `az account list -o table` or `az account list -o tsv` These will be easier to read than the default json format.

You will get an output with one or more subscriptions like below:

    ```powershell
    [
      {
        "cloudName": "AzureCloud",
      "id": "12345678-90ab-cdef-1234-567890123456",
        "isDefault": false,
        "name": "Visual Studio Premium with MSDN",
        "state": "Enabled",
        "tenantId": "12345678-90ab-cdef-1234-567890123456",
        "user": {
          "cloudShellID": true,
          "name": "",
          "type": "user"
        }
      },
      {
        "cloudName": "AzureCloud",
        "id": "12345678-90ab-cdef-1234-567890123456",
        "isDefault": true,
        "name": "Azure Free Trial",
        "state": "Enabled",
        "tenantId": "12345678-90ab-cdef-1234-567890123456",
        "user": {
          "cloudShellID": true,
          "name": "",
          "type": "user"
        }
      }
    ]

3. **If you have more than one subscription** - Find the name of your Azure subscription you want to use and set the current subscription. You MSDN subscription will likely be the "Visual Studio Enterprise" one.

    Azure CLI
    ```powershell
    az account set --subscription "Your Subscription Name"
    ```

    All commands you run will now be performed on this subscription.

4. Create a PowerShell variable for the resource group. We'll be using variables throughout the lab:

    ```powershell
    # Set this string to the resource group you made in exercise 1 to store your Azure SQL Server.
    $resourceGroupName = "<resource group from the previous exercise>"
    ```
  >If you close the Azure Shell window or if it resets, you'll need to recreate your shell variables. You might want to keep track of these in a text file.

5. View the resource group properties to make sure you set it correctly:

    Azure CLI
    ```powershell
    az group show --name "$resourceGroupName"
    ```

6. Clone the Git repository with all of the exercises and code. If you don't have git installed, go to the repository and download the zip file.

    ```powershell
    cd <wherever you want to put the code>
    git clone https://github.com/centaretraining/azuretraining
    ```

7. Change the current working directory to the **azuretraining** folder. All exercises will assume you are in this subfolder:

    ```powershell
    cd <code directory>/azuretraining
    ```

### Further Exploration
Use `az help` to explore the Azure CLI and some of the commands. Each command also has it's own help. For example `az group --help`

Next: [Create a SQL Server](03-azure-sql.md)