# Building An App Using Containers and Kubernetes

In this exercise, you're going to create a Kubernetes environment, upload a container to a registry, and run that container.

1. Create a resource group for your app. You're going to use this resource group to hold your, container registry and cluster.

```powershell

$kubernetesResourceGroup="something unique" #replace this with a unique name
az group create -l eastus -n $kubernetesResourceGroup
```

2. Create an Azure container registry to hold your images.

```powershell
$ACR_NAME='registry-name' #change this name (make it lowercase and unique)
az acr create --resource-group $kubernetesResourceGroup --name $ACR_NAME --sku Standard --location eastus
```

> Container registries hold your containers to use later. They are like NuGet or NPM repositories. They hold whole applications instead of libraries. When you build your apps, you can compile them into docker images. This is where you put those images for later deployment.

3. Build your docker images and upload them to Azure Container Registry

```powershell
az acr build --registry $ACR_NAME --image restaurant-frontend:v1.0.0 c:/azuretraining/kubernetes-cli/src/restaurant-frontend
```

> This command builds the application, compiles it into a Docker image, and then uploads that image to the Azure Container Registry. If this was a local project and you had docker installed, you could run `docker build` and push the image to the registry. Azure container registry does this for you, so you don't have to have Docker installed on your local machine.

When you are done, run the following command to see your registry.

```powershell
az acr repository list --name $ACR_NAME --output table
```

You should see the following.

```powershell
Result
------------
restaurant-frontend
```

4. Create a Service Principal

In order to authorize the kubernetes cluster to reference images from the container registry, we need to create a service principal. A service principal is like a userId for your application. To do create a service principal, run the following command. 

```powershell
az ad sp create-for-rbac --skip-assignment
```

This will return some json. Keep track of the appId and password by assigning them to variables.

```json
{
  "appId": "55aedf6c-53da-48c7-91ea-ddd17558b004",
  "displayName": "azure-cli-2019-03-08-21-58-25",
  "name": "http://azure-cli-2019-03-08-21-58-25",
  "password": "8443fd37-8aa4-4214-8881-d9083cf134b8",
  "tenant": "120ff116-711c-4978-9bb7-2d41205ed281"
}
```

```powershell
$appId='app id from the previous command output'
$password='password from the previous command output'
```

5. Grab the resource Id for your container registry and save it as a variable

```powershell
$acrID=az acr show --resource-group $kubernetesResourceGroup --name $ACR_NAME --query "id" --output tsv
```

> This command queries the container registry and then returns the id for the registry. We'll use that information in the next step. Note the `--query "id"` part of the command. This allows you to select a specific field in the json array. This is useful for grabbing data from Azure resources. Try running the `az acr show` command against without the query parameter and try querying different variables.

6. Grant pull permission to the app ID you just created. 

```powershell
az role assignment create --assignee $appId --scope $acrID --role acrpull
```

> This command adds the service principal you created to the acrpull role on the container registry. You're giving it access to pull container images from the registry.

7. Make a kubernetes cluster.

```powershell
az aks create `
    --resource-group $kubernetesResourceGroup `
    --name OrderingAppCluster `
    --node-count 1 `
    --service-principal $appId `
    --client-secret $password `
    --generate-ssh-keys `
    --location eastus
```

> This will take a few minutes. Stretch and/or grab a delightful beverage.

> This command creates a new Azure Kubernetes Cluster. This is where you will host your application. When creating the application, we're using the service principal we created a few steps ago. This means that the Kubernetes cluster will be able to read from the container registry.

8. Install the Kubernetes CLI on your machine. 

> Kubectl is a tool that manages Kubernetes clusters. Run the following commands and follow the on-screen instructions. After running this command, you'll need to ensure that the kubctl is in your path.

```powershell
az aks install-cli
```

9. Verify your AKS Cluster

```powershell
az aks get-credentials --resource-group $kubernetesResourceGroup --name OrderingAppCluster
```

> This command gets credentials for the kubernetes cluster and saves them to your local machine.

```powershell
kubectl get nodes
```

> This command gets a list of the nodes running on your Kubernetes cluster. The kubernetes cli is similar to the Azure CLI. If you need help, you can run the command and add `--help` to get more information.

You should see something like this

```powershell
NAME                       STATUS   ROLES   AGE   VERSION
aks-nodepool1-31029395-0   Ready    agent   3m    v1.11.8
```

10. Let's get the name of your container registry

```powershell
az acr list --resource-group $kubernetesResourceGroup --query "[].{acrLoginServer:loginServer}" --output table
```

You should get something that looks like this

```powershell
AcrLoginServer
--------------------------
testappregistry.azurecr.io
```

> This command queries your container registry and gets it's url.

11. Setup your deployment file

* Open up ./azuretraining/kubernetes-cli/frontend-deployment.yaml
* find the line with the following `image: restaurant-frontend:v1.0.0`
* prefix the image name with the url from the previous step | example: `image: testappregistry.azurecr.io/restaurant-frontend:v1.0.0`

12. Apply the deployment file

```powershell
kubectl apply -f ./azuretraining/kubernetes-cli/frontend-deployment.yaml
```

> This command applies your deployment. This will cause the Kubernetes cluster to spin up the instances of your container and create a service that exposes those pods to the internet.

13. Check your work

```powershell
kubectl get service restaurant-frontend --watch
```

> This command will keep refreshing. Once you see an entry under "External-IP", head to that URL in your web browser. You should see the "Back Office" application. The result will look like this:

```powershell
NAME                  TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
restaurant-frontend   LoadBalancer   10.0.218.140   137.135.92.218   80:31553/TCP   55s
```

> When you're done, go ahead and ctrl+c to close the command. 

### Further Exploration
Go to the portal and check out the resources you made. You can also explore the pods you deployed using `kubectrl get pods` or explore some of the other kubernetes concepts using the `kubectl explain --help`.

Congrats, you just created a Kubernetes container registry, uploaded a container to it, build a Kubernetes cluster, and deployed an application on it. In the next exercise, you'll create a serverless application.


Next: [Azure Functions and CosmosDB with ARM templates](06-serverless.md)