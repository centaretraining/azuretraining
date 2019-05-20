# Azure CLI

  For many of the exercises, you will be using the Azure CLI. The Azure CLI is a command line interface that you can use with PowerShell or the standard command line to manage resources in your subscription.

  <!-- If you haven't installed the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest), do so now. It only takes a few minutes.

  If can't / don't want to setup Azure CLI, you can also use the Azure Cloud Shell. Cloud shell has many utilities pre-installed (docker, git, npm, etc...), so it's a handy way to use occasional commands. Unfortunately, the Azure Shell times out after 20 minutes, so it's not easy to use for long term Azure sessions.

  You can access the cloud shell by navigating to [shell.azure.com](https://shell.azure.com) or clicking on the command line icon in the Azure Portal.
  -->

In this exercise, you will setup your Azure CLI environment.

## Initialize environment

1. Open a PowerShell window. I prefer the PowerShell terminal window in [Visual Studio Code](https://code.visualstudio.com/). That way you can take notes and record commands while running them in the shell without having to change windows.

2. Log the CLI into your Azure account using the same credentials you used to log into the portal. Follow the directions from the CLI.

    ```powershell
    az login --use-device-code
    ```

    User Name: **[Your CUNA user name]@centareazuretraining.onmicrosoft.com**  
    Password: **AzureTraining1!**

3. Set the current active subscription you will run your commands against. First, get a list of all subscriptions you have associated with your account:

    Using the Azure CLI ("az" command)
    ```powershell
    az account list
    ```
    > Try adding a [format parameter](https://docs.microsoft.com/en-us/cli/azure/format-output-azure-cli?view=azure-cli-latest), like `az account list -o table` or `az account list -o tsv` These will be easier to read than the default json format.

    You will get an output with one or more subscriptions like below:

    ```powershell
    [
        {
          "cloudName": "AzureCloud",
          "id": "5d9a2ae8-e702-4e27-a719-e660497a4eaf",
          "isDefault": true,
          "name": "Centare Azure Training",
          "state": "Enabled",
          "tenantId": "c858c611-56f4-4d5b-a6f1-3e68e913f6ac",
          "user": {
            "name": "shk6756@centareazuretraining.onmicrosoft.com",
            "type": "user"
          }
        }
    ]
    ```

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

    > The $env variable is a built in Powershell variable that exposes the environment variables on the system. Here we are using the username environment variable, `$env:username`, to get your Windows user name. We will be using variables throughout the course to ensure your resources have unique names.  **Note: if you are using the Azure Shell you might have to set $env:username by hand** (`$env:username="your user name"`).

    If you don't get any results back from this, you either selected the wrong subscription or entered your resource group name incorrectly. If you need to create the resource group again, run:
    ```powershell
    az group create --name "$env:username-lunch-webapp-rg" --location "East US"
    ```
  
<!--
6. Clone the Git repository with all of the exercises and code. If you don't have git installed download it [here](https://git-scm.com/downloads) or go to the repository and download the zip file and extract its contents.

    ```powershell
    cd <wherever you want to put the code>
    git clone https://github.com/centaretraining/azuretraining
    ```
-->

6. Change the current working directory to the **azuretraining** folder. All exercises will assume you are in this subfolder:

    ```powershell
    cd c:\azuretraining
    ```

### PowerShell basics
These are a few things you'll see in later shell scripts. 

```powershell
cd <directory> # changes the directory

# is a powershell comment. Anything after a # will not be executed.

$variablename="value" 
# Sets a shell variable. You can also assign the results of commands to a variable. Here we are setting it to a string but complex objects are also supported. Anything prefixed with "$" is a variable

$newvariable = "the variable is $variablename" 
# Variable values van be used in quoted strings

$newvariable 
# Simply typing the name of a variable and hitting enter will display the value.

` # this is a line continuation character. This allows you to use multiple lines in your commands. The exercises use this to make commands more readable. Here's an example:
command `
  -p1 value1 `
  -p2 value2

```

### Further Exploration
Use `az help` to explore the Azure CLI and some of the commands. Each command and their sub-commands also have their own help. For example, `az group --help` or `az group create --help`.

Congratulations, you just setup your Azure CLI. In the next exercise, you'll create a SQL Server. 

Next: [Create a SQL Server](03-azure-sql.md)
