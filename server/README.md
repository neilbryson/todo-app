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

### Swagger page

A Swagger documentation is available on https://localhost:5001/swagger.
