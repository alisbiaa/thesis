# env == dev | prod , case sensitive
env=$1

# Define color variables
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'  # No Color


# Check if the environment is either "dev" or "prod"
if [ "$env" = "dev" ] || [ "$env" = "prod" ]; then
    echo "Valid environment: $env"
else
    echo "${RED}Error:${NC} Missing or Invalid param: $env"
    echo "${YELLOW}env == dev | prod${NC}"
    exit 1  # Exit the script with an error status
fi

kubectl delete namespace "$env"
docker-compose down

kubectl apply -f k8s/namespaces.yaml

  echo "${YELLOW} ================== database ================== "

kubectl apply -f k8s/deployment.database."$env".yaml

  echo "${YELLOW} ================== frontend ================== "

cp ./k8s/frontend/.env."$env" ./frontend/.env
docker-compose build frontend-"$env"
kubectl apply -f k8s/deployment.frontend."$env".yaml
rm ./frontend/.env

  echo "${YELLOW} ================== backend ================== "

kubectl delete configmap -n "$env" backend-"$env"-configmap
kubectl create configmap backend-"$env"-configmap --from-env-file=./k8s/backend/.env."$env" -n "$env"
kubectl label configmap backend-"$env"-configmap  --overwrite app=backend env="$env" -n "$env"
docker-compose build backend-"$env"
kubectl apply -f k8s/deployment.backend."$env".yaml
kubectl apply -f k8s/deployment.backend.dev.yaml



