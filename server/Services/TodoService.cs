using System;
using System.Collections.Generic;
using MongoDB.Driver;
using TodoServer.Models;

namespace TodoServer.Services
{
    public class TodoService
    {
        private readonly IMongoCollection<TodoItem> _todo;

        public TodoService(ITodoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);
            _todo = db.GetCollection<TodoItem>(settings.TodoCollectionName);
        }

        public List<TodoItem> Get(int sortBy = 1, int pageNumber = 10, int pageSize = 1)
        {
            var find = _todo.Find(todo => true);

            if (sortBy == 1)
                find.SortByDescending(field => field.DateLastModified);
            else
                find.SortBy(field => field.DateLastModified);

            if (pageSize > 0)
                find.Limit(pageSize).Skip(pageSize * pageNumber);

            return find.ToList();
        }

        public TodoItem Get(string id) => _todo.Find<TodoItem>(todo => todo.Id == id).FirstOrDefault();

        public void Create(TodoItem todo) => _todo.InsertOne(todo);

        public void Update(string id, TodoItem todoIn) => _todo.ReplaceOne(todo => todo.Id == id, todoIn);

        public void Delete(string id) => _todo.DeleteOne(t => t.Id == id);
    }
}
