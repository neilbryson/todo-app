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

        public List<TodoItem> Get() => _todo.Find(todo => true).ToList();

        public TodoItem Get(string id) => _todo.Find<TodoItem>(todo => todo.Id == id).FirstOrDefault();

        public void Create(TodoItem todo) => _todo.InsertOne(todo);

        public void Update(string id, TodoItem todoIn) => _todo.ReplaceOne(todo => todo.Id == id, todoIn);

        public void Delete(string id) => _todo.DeleteOne(t => t.Id == id);
    }
}
