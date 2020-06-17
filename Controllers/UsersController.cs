
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using turism.Data;
using turism.DataTransferObjects;
using turism.Helpers;
using turism.Models;

namespace turism.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ITurismRep rep;
        private readonly IMapper mapper;
        private readonly DataContext context;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private Cloudinary cloudinary;
        private readonly UserManager<User> userManager;

        public UsersController(ITurismRep rep, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig, UserManager<User> userManager, DataContext context) 
        {
            this.context= context;
            this.cloudinaryConfig = cloudinaryConfig;
            this.rep = rep;
            this.mapper = mapper;
            this.userManager = userManager;

             Account acc = new Account(
                    cloudinaryConfig.Value.CloudName,
                    cloudinaryConfig.Value.ApiKey,
                    cloudinaryConfig.Value.ApiSecret
                    );
                                       
        
                    cloudinary = new Cloudinary(acc);
                 
        }

        [HttpGet] // cand cineva da in link /users o sa returnam list de utilizatori
        public async Task<IActionResult> GetUsers(){
            var users = await rep.GetUsers();
            var userReturn = mapper.Map<IEnumerable<UserForList>>(users); // de ce si enumerable
            return Ok(users);
        }
        [AllowAnonymous]
        [HttpGet("userByPoints")]
        public async Task<IActionResult> GetUsersByPoints(){
            var users = await context.Users.OrderByDescending(u=> u.Points).Take(5).ToListAsync();
            var userReturn = mapper.Map<IEnumerable<UserForList>>(users); // de ce si enumerable
            return Ok(users);
        }


        
        [HttpGet("{id}", Name="GetUser")] // ????????? luam id-ul 
        public async Task<IActionResult> GetUser(int id){
            var user = await rep.GetUser(id);
            var userReturn = mapper.Map<UserForList>(user);
            return Ok(userReturn);
        }
        [AllowAnonymous]
         [HttpGet("username/{userName}")] // ????????? luam id-ul 
        public async Task<IActionResult> GetUserByName(string userName){
            var user = await userManager.FindByNameAsync(userName);
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
           context.Users.Update(userFromRep);
           context.SaveChanges();

          var userForList = mapper.Map<UserForList>(userFromRep);
        return Ok(userForList);

    }

    [HttpPut("photo/{id}")]
   public async Task<IActionResult> UpdateUserPhoto(int id, [FromForm] IFormFile File)
   {
       if (id!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // aici verificam daca tokenul e ca path ul
            return Unauthorized();

        var userFromRep = await rep.GetUser(id);
        if(userFromRep==null)
            return BadRequest("Nu exista utilizatorul asta");

        var file = File;
        var uploadResult = new ImageUploadResult();

        if(file.Length>0)
                        {
                            using(var stream = file.OpenReadStream())
                            {
                                var uploadParams = new ImageUploadParams()
                                {
                                    File=new FileDescription(file.Name, stream)
                                };
                                uploadResult = cloudinary.Upload(uploadParams);
                            }
                            userFromRep.Url = uploadResult.Uri.ToString();
                            userFromRep.PublicId = uploadResult.PublicId;
                        }
                        var userForList = mapper.Map<UserForList>(userFromRep);
                        if(await rep.SaveAll())
                             return Ok(userFromRep);
            return NoContent(); // daca nu returnam asta inseamna ca ceva a mers prost
   }
   [HttpPost("{userId}/changePassword")]
   public async Task<IActionResult> ChangePassword(int userId, string newPass)
   {
        if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // aici verificam daca tokenul e ca path ul
            return Unauthorized();

       if( newPass == null || newPass.Length<6){
           return BadRequest("Parola trebuie sa fie mai lunga de 6 caractere");
       }
       var user = await rep.GetUser(userId);
       var token = await userManager.GeneratePasswordResetTokenAsync(user); // sa nu folosim direct passwordhasher
       var result = await userManager.ResetPasswordAsync(user, token, newPass);
       return Ok();

   }
   
}
}