
<p align="center">
  <img src="./gui-api-manager/public/favicon_package_v0.16/android-chrome-384x384.png" alt="header" height="200px">
</p>
<h1 align="center">API MANAGER</h1>
<h3 align="center">A simple API platform. With NEWS API DEMO.</h3>
<p align="center">
    <a href="https://github.com/ruggero95/api-manager/actions/workflows/k8s-deploy-api-manager.yml">
        <img src="https://github.com/ruggero95/api-manager/actions/workflows/k8s-deploy-api-manager.yml/badge.svg" alt="Deploy API MANAGER to the VM">
    </a>
</p>

### Project requirements
Goal: creation of a cloud-native microservices application
- At least three REST microservices or at least two microservices and one FaaS
- At least one external API must be used (there are several, weather, twitter, etc.)
- At least two different databases (besides the microservices) 
  - Ex. MongoDB, MySQL, ...
- At least one microservice pattern

### Summary
API Manager is **a simple API platform**.  
You can log in and create an api plan. With the generated API KEY, it will be possible to make requests to the api to get some news.

### Architecture
![summary](./.assets/summary.png)

The main components are:
- a **news-micro**: a microservice capable of returning news.
- a **auth-micro**: a microservice to manage user authentications.
- a **manager-micro**: a microservice to manage the proprietary API service, with
  - creation and deletion of new API plan w/ API KEY
  - count and manage API requests

Extra features are:
- a GUI to easily use the platform

### Automations
The repo is equipped with multiple automations [using GiHub Actions](https://github.com/ruggero95/api-manager/actions) capable of:
- building the [news-micro image](https://github.com/ruggero95/api-manager/pkgs/container/api-manager%2Fnews-micro) and pushing it to the GitHub Docker Registry.
- building the [auth-micro image](https://github.com/ruggero95/api-manager/pkgs/container/api-manager%2Fauth-micro) and pushing it to the GitHub Docker Registry.
- building the [manager-micro image](https://github.com/ruggero95/api-manager/pkgs/container/api-manager%2Fmanager-micro) and pushing it to the GitHub Docker Registry.
- deploying all to virtual machine through SSH connection.

### Credits
| [<img src="https://avatars.githubusercontent.com/u/4183824?v=4" width="100px;" alt="derogab"/><br /><sub><b>derogab</b></sub>](https://github.com/derogab) | [<img src="https://avatars.githubusercontent.com/u/9202746?v=4" width="100px;" alt="ruggero95"/><br /><sub><b>ruggero95</b></sub>](https://github.com/ruggero95) | 
| :---: | :---: |
