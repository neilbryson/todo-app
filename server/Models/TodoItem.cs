using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Swashbuckle.AspNetCore.Annotations;

namespace TodoServer.Models
{
    public class TodoItem
    {
        [SwaggerSchema(ReadOnly =  true)]
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [SwaggerSchema(ReadOnly =  true)]
        public DateTime DateLastModified { get; set; }

        public DateTime DueDate { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsDone { get; set; }
    }
}
