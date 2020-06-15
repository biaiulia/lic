
using System.Linq;
using System.Threading.Tasks;
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
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ITurismRep rep;
        private readonly UserManager<User> userManager;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private Cloudinary cloudinary;
        public AdminController(DataContext context, UserManager<User> userManager, IOptions<CloudinarySettings> cloudinaryConfig, ITurismRep rep)
        {
            this.cloudinaryConfig = cloudinaryConfig;
            this.userManager = userManager;
            this.context = context;
            this.rep = rep;

            Account acc = new Account(
                    cloudinaryConfig.Value.CloudName,
                    cloudinaryConfig.Value.ApiKey,
                    cloudinaryConfig.Value.ApiSecret
                    );
                                       
        
                    cloudinary = new Cloudinary(acc);

        }


        [HttpGet("userRoles")]
        public async Task<IActionResult> GetUserRoles()
        {
            var users = await context.Users
            .OrderBy(u => u.UserName)
            .Select(user => new
            {
                Id = user.Id,
                UserName = user.UserName,
                Roles = (from userRole in user.UserRoles
                         join role in context.Roles
                         on userRole.RoleId
                         equals role.Id
                         select role.Name).ToList()
            }).ToListAsync();
            return Ok(users);
        }

        [HttpPost("rolesEdit/{userName}")]
         public async Task<IActionResult> EditRoles(string userName, RoleEdit roleEdit)
        {
            var user = await userManager.FindByNameAsync(userName);
            if(user==null)
                return BadRequest("Utilizatorul nu exista!");

            var userRoles = await userManager.GetRolesAsync(user);

            var selectedRoles = roleEdit.RoleNames;

            if(selectedRoles==null) 
                selectedRoles = new string[] { };
            var result = await userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles)); // adauga la roluri restul, exceptie facand cel care e deja

            if (!result.Succeeded)
                return BadRequest("Nu s-a putut adauga rolul");

            result = await userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles)); // scoatem restu 

            if (!result.Succeeded)
                return BadRequest("Nu s-au putut sterge rolurile");

            return Ok(await userManager.GetRolesAsync(user));
        }
        //Video 209 min 5


        [HttpPost("addCity")]
        public IActionResult AddCity([FromForm] CityForCreation cityForCreation)
        { 

            // 
            if (cityForCreation.Name == null || cityForCreation.Description == null)
                return BadRequest("nu ati introdus datele orasului!");
            var file = cityForCreation.File;
            var uploadResult = new ImageUploadResult();


            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };
                    uploadResult = cloudinary.Upload(uploadParams);
                }
                var cityCreate = new City
                {
                    Name = cityForCreation.Name,
                    Description = cityForCreation.Description,
                    Url = uploadResult.Uri.ToString(),
                    PublicId = uploadResult.PublicId

                };
                context.City.Add(cityCreate);
                context.SaveChanges();
                 return Ok("Ati introdus un oras");

            }
            else return BadRequest("Nu ati introdus o poza");
        }

        [HttpDelete("deletePost/{postId}")]
         public async Task<IActionResult> DeletePost(int postId)
        {
            var post = await rep.PostExists(postId);
            if(post==null)
                return BadRequest("Postarea nu exista, nu poate fi stearsa");
        
            context.Post.Remove(post);
            context.SaveChanges();
            return Ok();
        }

        [HttpDelete("deleteUser/{UserName}")]
         public async Task<IActionResult> DeleteUser(string UserName)
        {
            var user = await userManager.FindByNameAsync(UserName);
            if(user==null)
                return BadRequest("Utilizatorul nu exista, nu poate fi sters");
        
            context.Users.Remove(user);
            context.SaveChanges();
            return Ok();
        }

        [HttpDelete("deleteCity/{cityId}")]
         public async Task<IActionResult> DeleteCity(int cityId)
        {
            var city = await rep.GetCity(cityId);
            if(city==null)
                return BadRequest("Orasul nu exista, nu poate fi sters");
        
            context.City.Remove(city);
            context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{userId}/deleteReply/{id}")]
        public async Task<IActionResult> DeleteReply(int userId, int id){
            var reply = await rep.GetReply(userId, id);
            if(reply==null)
                return BadRequest("Acest comentariu nu este al utilizatorului acesta");
            
            context.Reply.Remove(reply);
            context.SaveChanges();
            return Ok();

        }

        [HttpPut("city/{id}")]
   public async Task<IActionResult> UpdateCity(int id, City city)
    {
        var cityFromRep = await rep.GetCity(id);
        if(city.Name!=null)
         cityFromRep.Name=city.Name;
        if(city.Description!=null)
         cityFromRep.Description=city.Description;
        if(await rep.SaveAll())
            return NoContent(); // daca nu returnam asta inseamna ca ceva a mers prost
        return Ok();

    }
    [HttpPut("cityPhoto/{id}")]
   public async Task<IActionResult> UpdateCityPhoto(int id, [FromForm] IFormFile File)
   {
        var cityFromRep = await rep.GetCity(id);
        if(cityFromRep==null)
            return BadRequest("Nu exista acest oras asta");

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
                            cityFromRep.Url = uploadResult.Uri.ToString();
                            cityFromRep.PublicId = uploadResult.PublicId;
                        }
                        if(await rep.SaveAll())
                             return Ok();
            return NoContent(); // daca nu returnam asta inseamna ca ceva a mers prost



   }


    }

}