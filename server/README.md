# todo-app server

## Requirements

* [.NET 5.0](https://dotnet.microsoft.com/download/dotnet/5.0)
* [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)

## Database setup

1. Create a new directory in which the MongoDB schema will be saved
1. Connect MongoDB to the directory created in the last step
   ```bash
   mongod --dbpath /path/to/directory
   ```
1. Open another shell and connect to the database
   ```bash
   mongo
   ```
1. In the opened MongoDB shell, run the following :
   ```bash
   # TodoDatabaseSettings.DatabaseName
   use TodoDb

   # TodoDatabaseSettings.TodoCollectionName
   db.createCollection('Todo')
   ```
   The database configuration can be modified in the *appsettings.json* file.

## Starting the development server

```bash
dotnet run
```

This starts the development server at https://localhost:5001.

NOTE : Don't forget to start the MongoDB instance.

## Swagger page

A Swagger documentation is available on https://localhost:5001/swagger.

## Release build

```bash
dotnet publish -c Release -o build
```

This generates all the necessary libraries at `build/`.

To run the release build : 

```bash
dotnet build/TodoServer.dll
```

## Docker build

A Docker setup is provided which includes both the .NET server and MongoDB.

### Requirements

#### Windows / macOS

* [Docker Desktop](https://www.docker.com/products/docker-desktop)

#### Linux

* [Docker Engine](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Starting the containers

```bash
docker-compose up
```

The .NET server will be bound on port 50001 (SSL) and 50000 (HTTP), MongoDB on 27018.

### Rebuilding

```bash
docker-compose build
```

### Removing the containers

```bash
docker-compose down
```
