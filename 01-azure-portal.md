# Azure Portal

The Azure Portal is a web based UI for Azure. Everything you can do in Azure CLI, you can do in the portal. Generally, the CLI is a more efficient way to generate resources, but the portal is great for exploration and monitoring of resources.

> If you haven't activated you MSDN Azure benefits yet, go to [my.visualstudio.com](https://my.visualstudio.com) and activate them.

1. Head over to [portal.azure.com](https://portal.azure.com) and log in with your Azure account.

    > You will be greeted with a welcome message that gives you the option get a quick tour of the portal. Click "Start Tour" to get a brief overview of some of the major menu items we will be using.

2. Create a Resource Group
    * On the left hand menu, click "Resource Groups". This will bring up the Resource Group list.

    > Resource groups logically group Azure resources, like web apps and databases. Generally, you make a resource group per application.

3. Click "Add". This will bring up the "Create a Resource Group" blade. When navigating in the portal, new items often open new windows.

4. Fill out the form.
    * Select the appropriate subscription. If you have an MSDN subscription, pick the Visual Studio subscription. If you are using the free $200 credits, select the Free Trial subscription.
    * In the Resource Group field enter **"[Your CMUTUAL user name]-lunch-webapp-rg"**. For example: **"shk6756-lunch-webapp-rg"**. This resource group name will be referenced in subsequent exercises, so please use this naming convention.
    > Resource group names only need to be unique within a subscription. We are adding in your user name in case you are sharing a subscription with other class members.
    * Select the East US resource group.

    > There are many options for resource and resource group naming conventions. Using all lower case letters with dashes (except for storage accounts which can't have dashes) and pre or post-fixing the name with an abbreviation for the type of resource is common.  For example: "my-application-rg" for your resource group name. You will see this basic pattern in most of the exercises, however, a real world naming convention will likely be more complex.

5. Click "Review + Create" to move on to the review page. This page lists all changes that will be made. Click "Create". You should see your resource group in the list after a few seconds.

### Further Exploration
In the portal, do some exploring and see what's available. Check out the options on your resource group.

Next: [Azure Shell](02-azure-shell.md)
