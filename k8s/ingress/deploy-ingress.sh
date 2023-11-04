
# create namespace and service accounts
kubectl apply -f common/ns-and-sa.yaml

# create configmap
kubectl apply -f common/nginx-config.yaml

# create roles and bind roles
kubectl apply -f rbac/rbac.yaml

# run deployment
kubectl apply -f deployment/nginx-ingress.yaml

# apply service nodeport
