using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using turism.Data;
using turism.DataTransferObjects;
using turism.Helpers;
using turism.Models;

namespace turism.Controllers
{
        [Authorize] // autorizam sa nu poata puna oricine poze
        [Route("api/posts/{postId}/photos")]
        [ApiController]
    public class PhotosController : ControllerBase
    {
        



            private readonly ITurismRep rep;
            private readonly IMapper mapper;
            private readonly IOptions<CloudinarySettings> cloudinaryConfig;
            private Cloudinary cloudinary;
            private readonly DataContext context;


            public PhotosController(ITurismRep rep, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig, DataContext context)
            {
                this.cloudinaryConfig = cloudinaryConfig;
                this.rep = rep;
                this.mapper = mapper;
                this.context=context;
                
                Account acc = new Account(
                    cloudinaryConfig.Value.CloudName,
                    cloudinaryConfig.Value.ApiKey,
                    cloudinaryConfig.Value.ApiSecret
                    );
                                       
        
                    cloudinary = new Cloudinary(acc);
                                           
                }


                [HttpPost]
                public async Task<IActionResult> AddPhoto(int postId, [FromForm] PhotoForCreation photoForCreation)
                {
                        
                        //var postFromRep = await rep.GetPost(postId);
                        var file = photoForCreation.File;
                        var postFromRep = await rep.GetPost(postId);
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
                        }
                        else return BadRequest("Fisierul este gol");
                        photoForCreation.postId = postId;
                        photoForCreation.Url = uploadResult.Uri.ToString();
                        photoForCreation.PublicId = uploadResult.PublicId;

                        var photo = mapper.Map<Photo>(photoForCreation);
                        context.Photo.Add(photo);
                        postFromRep.Photos.Add(photo);
                        context.SaveChanges();
                        return Ok();





                }

            [HttpGet("{id}", Name="GetPhoto")] // tre sa i dam nume pt functia created AtRoute

            public async Task<IActionResult> GetPhoto(int id)
            {
                var photoFromRepo = await rep.GetPhoto(id);

                var photo = mapper.Map<PhotoForReturn>(photoFromRepo);
        
                return Ok(photo);
            }

    

    }
}

  

    

  