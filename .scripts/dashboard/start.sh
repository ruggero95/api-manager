#!/bin/sh
echo "Starting dashboard..."

# Start dashboard
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
