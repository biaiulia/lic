

using System.Globalization;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turism.Data;

namespace turism.Controllers
{
    
    [ApiController]
    public class CitiesController: ControllerBase
    {
        private readonly DataContext context;

        public CitiesController(DataContext context)
        {
            this.context=context;
            
        }
        [Route("api/cities")]
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await context.City.Include(c=>c.Posts).ToListAsync();

            return Ok(cities);      }

       
      

        //  [HttpGet("{id}")]

        //  public async Task<IActionResult> GetCity(int id){
        //      var city = await context.City.FirstOrDefaultAsync( x => x.Id == id);

        //          return Ok(city);
        //  }
         [Route("api/{name}")]
         [HttpGet("{name}")]

        public async Task<IActionResult> GetCityByName(string name){

            var city = await context.City.FirstOrDefaultAsync( x => x.Name.ToLower() == name);

            return Ok(city);
        }
        
    }
}