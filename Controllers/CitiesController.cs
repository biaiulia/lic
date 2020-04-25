

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turism.Data;

namespace turism.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController: ControllerBase
    {
        private readonly DataContext context;

        public CitiesController(DataContext context)
        {
            this.context=context;
            
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await context.City.ToListAsync();

            return Ok(cities);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetCity(int id){
            var city = await context.City.FirstOrDefaultAsync( x => x.Id == id);

            return Ok(city);
        }
        
    }
}