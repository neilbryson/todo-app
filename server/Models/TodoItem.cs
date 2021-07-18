using System;

namespace TodoServer.Models
{
    public class TodoItem
    {
        public DateTime DateCreated { get; set; }

        public DateTime DateLastModified { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsDone { get; set; }
    }
}
