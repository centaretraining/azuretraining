# Building An App Using Containers and Kubernetes

You're going to build a couple of microservices with .NET Core and SQL server and we're going to host them in a Kubernetes cluster.

1. Create a resource group for your app

```powershell
az group create -l eastus -n menuApi
```

2. Create an Azure container registry to hold your images.

```powershell
$ACR_NAME='<registry-name>' #change this name
az acr create --resource-group menuApi --name $ACR_NAME --sku Standard --location eastus
```

>Think of a container registry like you'd think of a NuGet or NPM repository, just for whole applications instead of libraries.

3. Build your docker images and upload them to Azure Container Registry

```powershell
az acr build --registry $ACR_NAME --image restaurant-frontend:v1.0.0 $home/azuretraining/kubernetes-cli/src/restaurant-frontend
```

> If this was a local project, you'd run `docker build`. Azure container registry runs this for you.

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

In order to authorize the kubernetes cluster to reference images from the container registry, we need to create a service principal. To do this, run the following command. 

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
$appId='<app id from the previous command output>'
$password='<password from the previous command output>'
```

5. Grab the resource Id for your container registry.

```powershell
az acr show --resource-group menuApi --name $ACR_NAME --query "id" --output tsv
```

You'll get something that looks like this.

```powershell
/subscriptions/8326d01c-4f7e-47d6-b58f-8d4596245ec1/resourceGroups/menuApi/providers/Microsoft.ContainerRegistry/registries/TestAppRegistry
```

Save that result as a variable

```powershell
$acrID='<arc ID from the previous command>'
```

6. Grant pull permission to the app ID you just created. 

```powershell
az role assignment create --assignee $appId --scope $acrID --role acrpull

```

7. Make a kubernetes cluster.

```powershell
az aks create `
    --resource-group menuApi `
    --name OrderingAppCluster `
    --node-count 1 `
    --service-principal $appId `
    --client-secret $password `
    --generate-ssh-keys `
    --location eastus
```

>This will take a few minutes

8. Verify your AKS Cluster

```powershell
az aks get-credentials --resource-group menuApi --name OrderingAppCluster
kubectl get nodes
```

You should see something like this

```powershell
NAME                       STATUS   ROLES   AGE   VERSION
aks-nodepool1-31029395-0   Ready    agent   3m    v1.11.8
```

9. Let's get the name of your container registry

```powershell
az acr list --resource-group menuApi --query "[].{acrLoginServer:loginServer}" --output table
```

You should get something that looks like this

```powershell
AcrLoginServer
--------------------------
testappregistry.azurecr.io
```

10. Setup your deployment file

* Open up ./azuretraining/kubernetes-cli/frontend-deployment.yaml
* find the line with the following `image: restaurant-frontend:v1.0.0`
* prefix the image name with the url from the previous step | example: `image: testappregistry.azurecr.io/restaurant-frontend:v1.0.0`

11. Apply the deployment

```powershell
kubectl apply -f ./azuretraining/kubernetes-cli/frontend-deployment.yaml
```

12. Check your work

```powershell
kubectl get service restaurant-frontend --watch
```

>This command will keep refreshing. Once you see an entry under "External-IP", head to that URL in your web browser. You should see the "Back Office" application. The result will look like this:

```powershell
NAME                  TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
restaurant-frontend   LoadBalancer   10.0.218.140   137.135.92.218   80:31553/TCP   55s
```

Next: [Azure Functions and CosmosDB with ARM templates](06-serverless.md)