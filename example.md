# DEMO
Just some demo curl commands to test the microservices.

### AUTH MICRO
Login
```bash
curl -X "POST" -H "Content-Type: application/json" -d '{"username":"test","password":"1234"}'  http://backend.api/auth-micro/auth/login
```
Check user
```bash
curl -X "POST" -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN"  http://backend.api/auth-micro/auth/check-user
```

### MANAGER MICRO 
Add a Plan
```bash
curl -X "POST" -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d '{"name":"plan_test"}' http://backend.api/manager-micro/plans/add
```
Delete a Plan
```bash
curl -X "POST" -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d '{"plan_id": "PLAN_ID"}' http://backend.api/manager-micro/plans/delete
```
Get all plans of the user
```bash
curl -X "GET" -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" http://backend.api/manager-micro/plans/user
```
Get single plan
```bash
curl -X "GET" -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN"  http://backend.api/manager-micro/plans/key/API_KEY
```
Make the API request
```bash
curl -X "GET" -H "Content-Type: application/json" -H "Authorization: Bearer API_KEY"  http://backend.api/manager-micro/news?q=car
```
