
using System.Collections.Generic;
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
        [HttpGet("{id}")] // ????????? luam id-ul 
        public async Task<IActionResult> GetUser(int id){
            var user = await rep.GetUser(id);
            var userReturn = mapper.Map<UserForList>(user);
            return Ok(userReturn);
        }
    }
}