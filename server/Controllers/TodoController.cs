using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoServer.Models;
using TodoServer.Services;

namespace TodoServer.Controllers
{
    [ApiVersion("1")]
    [Consumes("application/json")]
    [Produces("application/json")]
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ILogger<TodoController> _logger;
        private readonly TodoService _todoService;

        public TodoController(TodoService todoService, ILogger<TodoController> logger)
        {
            _todoService = todoService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<List<TodoItem>> Get() => _todoService.Get();

        [HttpGet("{id:length(24)}", Name = "GetTodo")]
        [ProducesResponseType(typeof(TodoItem), 200)]
        [ProducesResponseType(404)]
        public ActionResult<TodoItem> Get(string id)
        {
            var book = _todoService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        [ProducesResponseType(typeof(String), 201)]
        public ActionResult<TodoItem> Create(TodoItem todo)
        {
            todo.DateLastModified = DateTime.Now;
            _todoService.Create(todo);
            return CreatedAtRoute("GetTodo", new { id = todo.Id.ToString() }, todo);
        }

        [HttpPut("{id:length(24)}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult Update(string id, TodoItem todoIn)
        {
            var todo = _todoService.Get(id);

            if (todo == null)
            {
                return NotFound();
            }

            _todoService.Update(id, new TodoItem
            {
                Id = todo.Id,
                DateLastModified = DateTime.Now,
                Description = todoIn.Description,
                Title = todoIn.Title,
                IsDone = todoIn.IsDone,
                DueDate = todoIn.DueDate,
            });
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult Delete(string id)
        {
            var t = _todoService.Get(id);

            if (t == null)
            {
                return NotFound();
            }

            _todoService.Delete(t.Id);
            return NoContent();
        }
    }
}
