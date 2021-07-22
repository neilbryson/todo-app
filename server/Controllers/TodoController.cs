using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<List<TodoItem>> Get([FromQuery] FilterOptions filterOptions)
        {
            var sortBy = filterOptions?.SortBy ?? 1;
            var pageSize = filterOptions?.PageSize ?? 10;
            var pageNumber = filterOptions?.PageNumber ?? 1;
            _logger.LogInformation($"[{nameof(Get)}] Called with ${filterOptions.ToJson()}");

            try
            {
                var result = _todoService.Get(sortBy, pageNumber, pageSize);
                _logger.LogInformation($"[{nameof(Get)}] Success");
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError($"[{nameof(Get)}] Error\n{e.Message}");
                return Problem();
            }
        }

        [HttpGet("{id:length(24)}", Name = "GetTodo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<TodoItem> Get(string id)
        {
            _logger.LogInformation($"[{nameof(Get)} : {id}] Called");
            var todo = _todoService.Get(id);

            if (todo == null)
            {
                _logger.LogError($"[{nameof(Get)} : {id}] ID not found");
                return NotFound();
            }

            _logger.LogInformation($"[{nameof(Get)} : {id}] Success");
            return todo;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<TodoItem> Create(TodoItem todo)
        {
            _logger.LogInformation($"[{nameof(Create)}] Called");

            try
            {
                todo.DateLastModified = DateTime.Now;
                _todoService.Create(todo);
                _logger.LogInformation($"[{nameof(Create)}] Created {todo.Id}");
                return CreatedAtRoute("GetTodo", new {id = todo.Id}, todo);
            }
            catch (Exception e)
            {
                _logger.LogError($"[{nameof(Create)}] Error\n{e.Message}");
                return Problem();
            }
        }

        [HttpPut("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IUpdatedTodoItem> Update(string id, TodoItem todoIn)
        {
            _logger.LogInformation($"[{nameof(Update)} : {id}] Called");

            try
            {
                var todo = _todoService.Get(id);

                if (todo == null)
                {
                    _logger.LogError($"[{nameof(Update)} : {id}] ID not found");
                    return NotFound();
                }

                var updated = new TodoItem
                {
                    Id = todo.Id,
                    DateLastModified = DateTime.Now,
                    Description = todoIn.Description,
                    Title = todoIn.Title,
                    IsDone = todoIn.IsDone,
                    DueDate = todoIn.DueDate,
                };

                _todoService.Update(id, updated);

                _logger.LogInformation($"[{nameof(Update)} : {id}] Success");

                return Ok(new UpdatedTodoItem
                {
                    Id = updated.Id,
                    DateLastModified = updated.DateLastModified,
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"[{nameof(Update)} : {id}] Error\n{e.Message}");
                return Problem();
            }
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Delete(string id)
        {
            _logger.LogInformation($"[{nameof(Delete)} : {id}] Called");

            try
            {
                var t = _todoService.Get(id);

                if (t == null)
                {
                    _logger.LogError($"[{nameof(Delete)} : {id}] ID not found");
                    return NotFound();
                }

                _todoService.Delete(t.Id);
                _logger.LogInformation($"[{nameof(Delete)} : {id}] Success");
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError($"[{nameof(Delete)} : {id}] Error\n{e.Message}");
                return Problem();
            }
        }
    }
}
