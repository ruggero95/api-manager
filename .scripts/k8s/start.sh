#!/bin/sh
echo "Starting..."

# Clean up
echo "Cleaning up old tmp..."
rm -rf ./k8s-deploy-tmp

# Get environment variables
echo "Getting environment variables..."
ENV_FILE="./news-micro/.env"
if test -f "$ENV_FILE"; then
    export $(grep -v '^#' $ENV_FILE | xargs -0)
else 
    echo "No $ENV_FILE file found"
    return
fi
ENV_FILE="./auth-micro/.env"
if test -f "$ENV_FILE"; then
    export $(grep -v '^#' $ENV_FILE | xargs -0)
else 
    echo "No $ENV_FILE file found"
    return
fi
ENV_FILE="./manager-micro/.env"
if test -f "$ENV_FILE"; then
    export $(grep -v '^#' $ENV_FILE | xargs -0)
else 
    echo "No $ENV_FILE file found"
    return
fi
ENV_FILE="./gui-api-manager/.env"
if test -f "$ENV_FILE"; then
    export $(grep -v '^#' $ENV_FILE | xargs -0)
else 
    echo "No $ENV_FILE file found"
    return
fi

# Convert ENVs to base64
echo "Converting ENVs to base64..."
export CURRENTS_API_KEY=$(echo -n $CURRENTS_API_KEY | base64)
export ACCESS_TOKEN=$(echo -n $ACCESS_TOKEN | base64)
export MONGO_INITDB_ROOT_USERNAME=$(echo -n $MONGO_INITDB_ROOT_USERNAME | base64)
export MONGO_INITDB_ROOT_PASSWORD=$(echo -n $MONGO_INITDB_ROOT_PASSWORD | base64)
export POSTGRES_USER=$(echo -n $POSTGRES_USER | base64)
export POSTGRES_PASSWORD=$(echo -n $POSTGRES_PASSWORD | base64)

# Copy the k8s config file to a tmp directory
echo "Copying k8s config file to tmp directory..."
cp -r ./k8s-deploy ./k8s-deploy-tmp

# Replace ENVs in static files
echo "Replacing secrets in configs files..."
for filename in ./k8s-deploy-tmp/*.yml; do
    echo "Replacing secrets in $filename ..."
    sed -i "s|{{REPLACE_HERE_API_KEY}}|$CURRENTS_API_KEY|g" $filename
    sed -i "s|{{REPLACE_HERE_ACCESS_TOKEN}}|$ACCESS_TOKEN|g" $filename
    sed -i "s|{{REPLACE_HERE_MONGO_USER}}|$MONGO_INITDB_ROOT_USERNAME|g" $filename
    sed -i "s|{{REPLACE_HERE_MONGO_PASS}}|$MONGO_INITDB_ROOT_PASSWORD|g" $filename
    sed -i "s|{{REPLACE_HERE_PG_USER}}|$POSTGRES_USER|g" $filename
    sed -i "s|{{REPLACE_HERE_PG_PASS}}|$POSTGRES_PASSWORD|g" $filename
done

# Start k8s
echo "Starting k8s..."
kubectl apply -f ./k8s-deploy-tmp

# Clean up
echo "Cleaning up..."
rm -rf ./k8s-deploy-tmp
