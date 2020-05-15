using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using turism.Data;
using turism.DataTransferObjects;
using turism.Models;

namespace turism.Controllers
{
    
     // totul din acest controller trebuie sa fie un request authorized
    [Route("api/[controller]")] //unde sa rutam, controller e placeholder pt ValuesController
    [ApiController]
    public class AuthController : ControllerBase// trebe sa injectam repository ul creat
    {
        private readonly IAuthRepository rep;               // dc readonly
        private readonly IConfiguration config;
        public AuthController(IAuthRepository rep, IConfiguration config)
        {
            this.config = config;
            this.rep = rep;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegister userForRegister) // trebuie sa cream un Dto sau in data transfer object ca sa putem trimite aici datele
        {
            
            // validam requestul

            userForRegister.Username = userForRegister.Username.ToLower(); //consistenta in baza de date sa nu fie scrise mari

            if (await rep.UserExists(userForRegister.Username)) // aici de schimbat in user nu userforregister
                return BadRequest("Utilizatorul exista deja"); // badrequest este din COntrollerBase

            var userCreate = new User
            {
                 Username = userForRegister.Username,
                   Joined = DateTime.Now
            };

            var CreatedUser = await rep.Register(userCreate, userForRegister.Password); 

            return StatusCode(201);
            //return CreatedAtRoute("GetUser", new {controller = "Users", IDesignTimeMvcBuilderConfiguration= CreatedUser.Id});
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLogin userForLogin)
        {
            

            var userFromRep = await rep.Login(userForLogin.Username.ToLower(), userForLogin.Password); // verificam daca avem userul si folosim Dto ul si il transformam in tolower

            if (userFromRep == null)
                return Unauthorized(); // nu dam detalii daca e de parola sau utilizator

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRep.Id.ToString()),  // primul claim este id ul
                new Claim(ClaimTypes.Name, userFromRep.Username)  // al doilea claim este username ul
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));  // ceeee? asta e cheie cu care putem face signingcredentials

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature); 

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(2), // expira in 2 zile
                SigningCredentials = cred
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor); // tokenu pt credentiale

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}