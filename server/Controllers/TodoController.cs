using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TodoServer.Controllers
{
    [ApiVersion("1")]
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ILogger<TodoController> _logger;

        public TodoController(ILogger<TodoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return new OkObjectResult("Hello world");
        }
    }
}
