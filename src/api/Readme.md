# Bysykkel API
## Requirements
[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
## Running
From a command line, making sure you have the dotnet CLI prepared, and you've navigated to the Bysykke.API folder
```
dotnet run
```
This will expose the API on `localhost:8080` with Swagger documentation on `http://localhost:8080/swagger/index.html`
### Debugging with VSCode
If you happen to be using VSCode there is also a [launch.json](launch.json) file that will let you debug the project in the editor
### Tests
From this folder you can also run the tests for this project by running
```
dotnet test
```