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
            _logger.LogInformation("[{Get}] Called with {FilterOptions}", nameof(Get), filterOptions.ToJson());

            try
            {
                var result = _todoService.Get(sortBy, pageNumber, pageSize);
                _logger.LogInformation("[{Get}] Success", nameof(Get));
                return result;
            }
            catch (Exception e)
            {
                _logger.LogError("[{Get}] Error\n{ErrorMessage}", nameof(Get), e.Message);
                return Problem();
            }
        }

        [HttpGet("{id:length(24)}", Name = "GetTodo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ITodoItem> Get(string id)
        {
            _logger.LogInformation("[{Get} : {Id}] Called", nameof(Get), id);
            var todo = _todoService.Get(id);

            if (todo == null)
            {
                _logger.LogError("[{Get} : {Id}] ID not found", nameof(Get), id);
                return NotFound();
            }

            _logger.LogInformation("[{Get} : {Id}] Success", nameof(Get), id);
            return todo;
        }

        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<TodoItem>> Search([FromQuery] FilterOptionsWithSearch filterOptions)
        {
            var searchQuery = filterOptions?.SearchQuery ?? "";
            var sortBy = filterOptions?.SortBy ?? 1;
            var pageSize = filterOptions?.PageSize ?? 10;
            var pageNumber = filterOptions?.PageNumber ?? 1;
            _logger.LogInformation("[{Search}] Called `{SearchQuery}`", nameof(Search), searchQuery);

            var result = _todoService.Search(searchQuery, sortBy, pageNumber, pageSize);

            if (result == null)
            {
                _logger.LogInformation("[{Search}] No results for `{SearchQuery}`", nameof(Search), searchQuery);
                return new List<TodoItem>();
            }

            _logger.LogInformation("[{Search}] Success `{SearchQuery}`", nameof(Search), searchQuery);
            return result;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<ITodoItem> Create(TodoItem todo)
        {
            _logger.LogInformation("[{Create}] Called", nameof(Create));

            try
            {
                todo.DateLastModified = DateTime.Now;
                _todoService.Create(todo);
                _logger.LogInformation("[{Create}] Created {Id}", nameof(Create), todo.Id);
                return CreatedAtRoute("GetTodo", new {id = todo.Id}, todo);
            }
            catch (Exception e)
            {
                _logger.LogError("[{Create}] Error\n{ErrorMessage}", nameof(Create), e.Message);
                return Problem();
            }
        }

        [HttpPut("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IUpdatedTodoItem> Update(string id, TodoItem todoIn)
        {
            _logger.LogInformation("[{Update} : {Id}] Called", nameof(Update), id);

            try
            {
                var todo = _todoService.Get(id);

                if (todo == null)
                {
                    _logger.LogError("[{Update} : {Id}] ID not found", nameof(Update), id);
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

                _logger.LogInformation("[{Update} : {Id}] Success", nameof(Update), id);

                return Ok(new UpdatedTodoItem
                {
                    Id = updated.Id,
                    DateLastModified = updated.DateLastModified,
                });
            }
            catch (Exception e)
            {
                _logger.LogError("[{Update} : {Id}] Error\n{ErrorMessage}", nameof(Update), id, e.Message);
                return Problem();
            }
        }

        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Delete(string id)
        {
            _logger.LogInformation("[{Delete} : {Id}] Called", nameof(Delete), id);

            try
            {
                var t = _todoService.Get(id);

                if (t == null)
                {
                    _logger.LogError("[{Delete} : {Id}] ID not found", nameof(Delete), id);
                    return NotFound();
                }

                _todoService.Delete(t.Id);
                _logger.LogInformation("[{Delete} : {Id}] Success", nameof(Delete), id);
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError("[{Delete} : {Id}] Error\n{ErrorMessage}", nameof(Delete), id, e.Message);
                return Problem();
            }
        }

        [HttpPatch("change-done/{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult ChangeDone(string id, [FromBody] bool isDone)
        {
            _logger.LogInformation("[{ChangeDone} : {Id}] Called", nameof(ChangeDone), id);

            try
            {
                var t = _todoService.Get(id);

                if (t == null)
                {
                    _logger.LogError("[{ChangeDone} : {Id}]", nameof(ChangeDone), id);
                    return NoContent();
                }

                _todoService.Update(id, new TodoItem
                {
                    Id = t.Id,
                    Description = t.Description,
                    Title = t.Title,
                    DueDate = t.DueDate,
                    DateLastModified = t.DateLastModified,
                    IsDone = isDone,
                });
                _logger.LogInformation("[{ChangeDone} : {Id}] Success", nameof(ChangeDone), id);
                return NoContent();
            }
            catch (Exception e)
            {
                _logger.LogError("[{ChangeDone} : {Id}] Error\n{ErrorMessage}", nameof(ChangeDone), id, e.Message);
                return Problem();
            }
        }
    }
}
