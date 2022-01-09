#!/bin/sh
echo "Starting API Manager GUI..."
# Replace ENVs in static files
for filename in /usr/share/nginx/html/js/app*.js*; do
    echo "Replacing ENVs in $filename ..."
    sed -i "s|{{replace_auth_url}}|$AUTH_URL|g" $filename
    sed -i "s|{{replace_manager_url}}|$MANAGER_URL|g" $filename
done
# Run nginx 
nginx -g 'daemon off;'
