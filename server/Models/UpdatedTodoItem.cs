using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Swashbuckle.AspNetCore.Annotations;

namespace TodoServer.Models
{
    public class UpdatedTodoItem : IUpdatedTodoItem
    {
        [SwaggerSchema(ReadOnly =  true)]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [SwaggerSchema(ReadOnly =  true)]
        public DateTime DateLastModified { get; set; }
    }

    public interface IUpdatedTodoItem
    {
        string Id { get; set; }
        DateTime DateLastModified { get; set; }
    }
}
