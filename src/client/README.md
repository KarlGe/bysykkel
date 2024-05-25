# Bysykkel Client
## Requirements
[Node v20.13.1](https://nodejs.org/en/download/package-manager)
## Installing
```
npm i
```
## Running
Running in development mode, this will expose the FE on `localhost:3000`
```
npm run dev
```
Running in production mode, this will also expose the FE on `localhost:3000`
```
npm run build
npm run preview
```
*note* The API is set up to allow these ports for CORS so if you change them make sure you change the ports in the API as well