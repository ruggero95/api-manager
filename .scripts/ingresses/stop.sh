#!/bin/sh
echo "Stopping ingress-nginx..."

# Stop ingress-nginx
kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
