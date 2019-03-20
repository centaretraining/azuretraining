# Set up Azure Shell

  For many of the exercises, we will be using the Azure CLI. The Azure CLI is a command line interface that you can use with Power shell or the standard command line. If you haven't installed the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest), do so now. It only takes a few minutes.

  If can't / don't want to setup Azure CLI, you can also use the Azure Cloud Shell. Cloud shell has many utilities pre-installed (docker, git, npm, etc...), so it's a handy way to use occasional commands. Unfortunately, the Azure Shell times out after 20 minutes, so it's not easy to use for long term Azure sessions.

  You can access the cloud shell by navigating to [shell.azure.com](https://shell.azure.com) or clicking on the command line icon in the Azure Portal.

## Initialize environment

1. Open a PowerShell window. You can either open a PowerShell directly (I recommend using PowerShell ISE) or use an embedded PowerShell window in [Visual Studio Code](https://code.visualstudio.com/).

2. Log the CLI into your Azure account using your CUNA credentials. Follow the directions from the CLI.

    ```powershell
    az login
    ```

3. Set the current active subscription you will run your commands against. First, get a list of all subscriptions you have associated with your account:

    Using the Azure CLI ("az" command)
    ```powershell
    az account list
    ```
    >Try adding a [format parameter](https://docs.microsoft.com/en-us/cli/azure/format-output-azure-cli?view=azure-cli-latest), like `az account list -o table` or `az account list -o tsv` These will be easier to read than the default json format.

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

4. **If you have more than one subscription** - Find the name of your Azure subscription you want to use and set the current subscription. You MSDN subscription will likely be the "Visual Studio Enterprise" one.

    Azure CLI
    ```powershell
    az account set --subscription "Your Subscription Name or ID"
    ```

    All commands you run will now be performed on this subscription.

    > **Note that it is possible, though unlikely, that you have multiple subscriptions named the same thing. If this is the case, you must use the ID.  Be careful when creating resources in the portal as many will not work across subscriptions.**

5. View the properties of the resource group you created in exercise 1 to make sure everything is set up correctly:

    Azure CLI
    ```powershell
    az group show --name "$env:username-lunch-webapp-rg"
    ```

    > The $env variable is a built in Powershell value that allows you to access system information. Here we are using it to get your Windows user name.  **Note: if you are using the Azure Shell you will have to replace instances of $env:username by hand**.

    If you don't get any results back from this, you either selected the wrong subscription or entered your resource group name incorrectly. If you need to create the resource group again, run:
    ```powershell
    az group create --name "$env:username-lunch-webapp-rg" --location "East US"
    ```

6. Clone the Git repository with all of the exercises and code. If you don't have git installed download it [here](https://git-scm.com/downloads) or go to the repository and download the zip file and extract its contents.

    ```powershell
    cd <wherever you want to put the code>
    git clone https://github.com/centaretraining/azuretraining
    ```

7. Change the current working directory to the **azuretraining** folder. All exercises will assume you are in this subfolder:

    ```powershell
    cd <code directory>/azuretraining
    ```

### Further Exploration
Use `az help` to explore the Azure CLI and some of the commands. Each command and their sub-commands also have their own help. For example, `az group --help` or `az group create --help`.

Next: [Create a SQL Server](03-azure-sql.md)
