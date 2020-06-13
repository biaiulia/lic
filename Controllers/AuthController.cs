using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    {           // dc readonly
        private readonly IConfiguration config; // de ce folosim asta???
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        public AuthController( IConfiguration config, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.config = config;
          
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegister userForRegister) // trebuie sa cream un Dto sau in data transfer object ca sa putem trimite aici datele
        {
            var user = await userManager.FindByNameAsync(userForRegister.Username);
            if(user!=null)
            {
                return BadRequest("Exista deja un utilizator cu acest nume pe platformă");

            }
            var userCreate = new User
            {
                UserName = userForRegister.Username,
                Joined = DateTime.Now
            };
            var result = await userManager.CreateAsync(userCreate, userForRegister.Password);
            if(result.Succeeded)
                return StatusCode(201);
            //return CreatedAtRoute("GetUser", new {controller = "Users", IDesignTimeMvcBuilderConfiguration= CreatedUser.Id});
             return BadRequest(result.Errors);
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLogin userForLogin)
        {


            var user = await userManager.FindByNameAsync(userForLogin.Username);

            if(user==null)
                return Unauthorized();
            var results = await signInManager.CheckPasswordSignInAsync(user, userForLogin.Password, false); // pentru lockoutul userului
            //await rep.Login(userForLogin.Username.ToLower(), userForLogin.Password); // verificam daca avem userul si folosim Dto ul si il transformam in tolower

        if(results.Succeeded){
            return Ok(new
            {
                token = GenerateJwtToken(user).Result
                //user
            });
        }
        return Unauthorized();
            
        
        }

        private async Task<String> GenerateJwtToken(User user)
        {

            var claims = new List<Claim> // ca sa putem adauga
           {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),  // primul claim este id ul
                new Claim(ClaimTypes.Name, user.UserName)  // al doilea claim este username ul
            };

            var roles = await userManager.GetRolesAsync(user);

            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

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

            return tokenHandler.WriteToken(token);
        }
    }
}