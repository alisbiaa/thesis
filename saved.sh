kubectl create namespace dev
kubectl create configmap backend-dev-configmap --from-env-file=./k8s/backend/.env.dev -n dev
kubectl label configmap backend-dev-configmap  --overwrite app=backend env=dev -n dev
kubectl apply -f k8s/deployment.backend.dev.yaml
