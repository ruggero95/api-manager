#!/bin/sh
echo "Stopping dashboard..."

# Stop dashboard
kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml