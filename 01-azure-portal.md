# Azure Portal

The Azure Portal is a web based UI for Azure. Everything you can do in Azure CLI, you can do in the portal. Generally, the CLI is a more efficient way to generate resources, but the portal is great for exploration and monitoring of resources.

> If you haven't activated you MSDN Azure benefits yet, go to my.visualstudio.com and activate them.

1. Head over to portal.azure.com and log in with your Azure account.

    > You will be greeted with a welcome message that gives you the option get a quick tour of the portal. Click "Start Tour" to get a brief overview of some of the major menu items we will be using.

2. Create a Resource Group
* On the left hand menu, click "Resource Groups". This will bring up the Resource Group list.

    > Resource groups logically group Azure resources, like web apps and databases. Generally, you make a resource group per application.

3. Click "Add". This will bring up the "Create a Resource Group" blade. When navigating in the portal, new items often open new windows.

4. Fill out the form.
    * Select the appropriate subscription. If you have an MSDN sub, pick the Visual Studio subscription. 
    * For the name, enter in whatever you want. We'll use it in future exercises so keep note of what you choose. 
    > **If you are sharing a subscription with other users your resource group name must be unique to the subscription**
    * Select the North Central US resource group.

    > There are many options for resource and resource group naming conventions. Using all lower case letters with dashes (except for storage accounts which can't have dashes) and pre or post-fixing the name with an abbreviation for the type of resource is common.  For example: "azure-training-rg" for your resource group name. You will see this basic pattern in most of the exercises, however, a real world naming convention will likely be more complex.

5. Click "Create". You should see your resource group in the list after a few seconds.

### Further Exploration
In the portal, do some exploring and see what's available. Check out the options on your resource group.

Next: [Azure Shell](02-azure-shell.md)