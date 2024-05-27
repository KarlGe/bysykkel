# Bysykkel Client & API 🚲
This is an example of how one can use the [Oslo Bysykkel open API](https://oslobysykkel.no/apne-data/sanntid) to make a map over Oslo with available city bikes.
The frontend is built as a single page application using React, while the backend is built using .NET 8
## Running
### Docker
Using docker you can run the project from the root folder using 
`docker compose up`
This will expose the API on `localhost:8080` and FE on `localhost:3000` 🥳
Each application can be run independently from their own folders
## Frontend
[Frontend Readme](./src/client/README.md)
## API
[API Readme](./src/api/README.md)