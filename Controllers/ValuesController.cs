using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turism.Data;

namespace turism.API.Controllers //era in 2.8 .net, luat de acolo
{
    //localhostL5000/api/values 
    [Authorize] 
    [Route("api/[controller]")] //unde sa rutam, controller e placeholder pt ValuesController
    [ApiController] // valideaza automat requesturi
    public class ValuesController : ControllerBase // exista alternativa, de ex clasa Controller. Nu are ViewSuport ControllerBase, o sa avem View ul din Angular
    {
        private readonly DataContext context;
        public ValuesController(DataContext context) //injectam data context 

        {
            this.context = context;

        }
        // GET api/values
        [HttpGet]
        //public ActionResult<IEnumerable<string>> Get() - aici returna doar stringuri
        public async Task<IActionResult> GetValues() //sa afisam pt requesturi http
        {
            var values = await context.Values.ToListAsync(); //ia din db ca lista

            return Ok(values); //cu http 200 ok response
            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id) 
        {
            var value = await context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);  // de sters s-ul 
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
