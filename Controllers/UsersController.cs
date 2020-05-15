
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using turism.Data;
using turism.DataTransferObjects;

namespace turism.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ITurismRep rep;
        private readonly IMapper mapper;

        public UsersController(ITurismRep rep, IMapper mapper) // ????
        {
            this.rep = rep;
            this.mapper = mapper;
        }

        [HttpGet] // cand cineva da in link /users o sa returnam list de utilizatori
        public async Task<IActionResult> GetUsers(){
            var users = await rep.GetUsers();
            var userReturn = mapper.Map<IEnumerable<UserForList>>(users); // de ce si enumerable
            return Ok(users);
        }
        [HttpGet("{id}", Name="GetUser")] // ????????? luam id-ul 
        public async Task<IActionResult> GetUser(int id){
            var user = await rep.GetUser(id);
            var userReturn = mapper.Map<UserForList>(user);
            return Ok(userReturn);
        }
    
   [HttpPut("{id}")]
   public async Task<IActionResult> UpdateUser(int id, UserForUpdate userForUpdate)
    {
        if (id!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // aici verificam daca tokenul e ca path ul
            return Unauthorized();

        var userFromRep = await rep.GetUser(id);

        mapper.Map(userForUpdate, userFromRep); // mapam cele 2si le scrie din primu in al doilea

        if(await rep.SaveAll())
            return NoContent(); // daca nu returnam asta inseamna ca ceva a mers prost


    throw new System.Exception($"Updatarea userului {id} nu s-a reusit");
    }
}
}