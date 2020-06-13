
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using turism.Data;
using turism.DataTransferObjects;
using turism.Helpers;

namespace turism.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ITurismRep rep;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private Cloudinary cloudinary;

        public UsersController(ITurismRep rep, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig) // ????
        {
            this.cloudinaryConfig = cloudinaryConfig;
            this.rep = rep;
            this.mapper = mapper;

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


        return Ok();

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
                        if(await rep.SaveAll())
                             return Ok();
            return NoContent(); // daca nu returnam asta inseamna ca ceva a mers prost


       


   }
}
}