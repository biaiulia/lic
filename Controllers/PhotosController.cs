using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using turism.Data;
using turism.DataTransferObjects;
using turism.Helpers;

namespace turism.Controllers
{
    [   Authorize] // autorizam sa nu poata puna oricine poze
        [Route("api/[controller]")]
        [ApiController]
    public class PhotosController : ControllerBase
    {
        

            private readonly ITurismRep rep;
            private readonly IMapper mapper;
            private readonly IOptions<CloudinarySettings> cloudinaryConfig;
            private Cloudinary cloudinary;


            public PhotosController(ITurismRep rep, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
            {
                this.cloudinaryConfig = cloudinaryConfig;
                this.rep = rep;
                this.mapper = mapper;
                
                Account acc = new Account(
                    cloudinaryConfig.Value.CloudName,
                    cloudinaryConfig.Value.ApiKey,
                    cloudinaryConfig.Value.CloudName);
                                       

                    cloudinary = new Cloudinary(acc);
                                           
                }

                //[HttpPost]

//                public async Task<IActionResult> AddPhotoForPost(int postId, PhotoForCreation photoForCreation){ // autorizam requestul 
                    
               // }
            

        }
}
        
    
