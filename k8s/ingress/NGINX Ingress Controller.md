
Refer to this documentation link for more details [https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-manifests/](https://docs.nginx.com/nginx-ingress-controller/installation/installation-with-manifests/)
### Clone the Ingress Controller repo and change into the deployments folder

```shell
git clone https://github.com/nginxinc/kubernetes-ingress.git --branch v3.2.0
cd kubernetes-ingress/deployments
```
### 1. Configure RBAC

RBAC stands for Role-Based Access Control

Create a namespace and a service account for the Ingress Controller
```shell
kubectl apply -f common/ns-and-sa.yaml
```

Create a cluster role and cluster role binding for the service account:
```shell
kubectl apply -f rbac/rbac.yaml
```

### 2. Create Common Resources
Create a config map for customizing NGINX configuration
```shell
kubectl apply -f common/nginx-config.yaml
```

Create an IngressClass resource
```shell
kubectl apply -f common/ingress-class.yaml
```
> **Note:**
If you would like to set the Ingress Controller as the default one, uncomment the annotation ingressclass.kubernetes.io/is-default-class. With this annotation set to true all the new Ingresses without an ingressClassName field specified will be assigned this IngressClass.


### 3. Create Custom Resources

Create custom resource definitions
```shell
kubectl apply -f common/crds/k8s.nginx.org_virtualservers.yaml
kubectl apply -f common/crds/k8s.nginx.org_virtualserverroutes.yaml
kubectl apply -f common/crds/k8s.nginx.org_transportservers.yaml
kubectl apply -f common/crds/k8s.nginx.org_policies.yaml
```

### 4. Deploy the Ingress Controller

```shell
kubectl apply -f deployment/nginx-ingress.yaml
```

Check that the Ingress Controller is running
```shell
kubectl get pods --namespace=nginx-ingress
```


### Uninstall
```shell
kubectl delete namespace nginx-ingress
kubectl delete clusterrole nginx-ingress
kubectl delete clusterrolebinding nginx-ingress
kubectl delete -f common/crds/
```
