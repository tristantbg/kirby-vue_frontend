# Kirby Vue/Nuxt Frontend

Frontend built with [Nuxt.js](https://github.com/nuxt/nuxt.js)

## Setup

``` bash
# install dependencies
yarn install # Or npm install

# add .env to folder
API_USERNAME=E-Mail
API_PASSWORD=Password

# serve with hot reload at localhost:8080
yarn run dev

# build for production
yarn run build

```

## Deployment

To run this app via pm2 on a server use:
``` bash
pm2 start npm --name "mlsr-frontend" -- start
```
