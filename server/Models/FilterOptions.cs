using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace TodoServer.Models
{
    public class FilterOptions
    {
        [FromQuery(Name = "sortBy")]
        [SwaggerParameter("1 = descending ; 0 = ascending (DateLastModified)")]
        public int SortBy { get; set; }

        [FromQuery(Name = "pageSize")]
        [SwaggerParameter("Will return the entire todo object if set to 0")]
        public int PageSize { get; set; }

        [FromQuery(Name = "pageNumber")]
        public int PageNumber { get; set; }
    }
}
