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
                public async Task<IActionResult> AddPhoto(int postId, [FromForm] PhotoForCreation photoForCreation){
                        
                        //var postFromRep = await rep.GetPost(postId);
                        var file = photoForCreation.File;
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
                        photoForCreation.postId = postId;
                        photoForCreation.Url = uploadResult.Uri.ToString();
                        photoForCreation.PublicId = uploadResult.PublicId;

                        var photo = mapper.Map<Photo>(photoForCreation);
                        context.Photo.Add(photo);
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

              //  [HttpPost]

    /*    public async Task<IActionResult> AddPhotoForPost(int postId, [FromForm]PhotoForCreation photoForCreation)
        {


            var postFromRep = await rep.GetPost(postId);
            var file = photoForCreation.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = cloudinary.Upload(uploadParams);
                }
            }
            else return BadRequest();

            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.PublicId = uploadResult.PublicId;
            photoForCreation.postId = postId;

            var photo = mapper.Map<Photo>(photoForCreation);

            context.Add(photo);
            context.SaveChanges();
            return Ok();
        }
    }
}
        
            /*postFromRep.Photos.Add(photo);

            if (await rep.SaveAll())
            {
                var photoToReturn = mapper.Map<PhotoForReturn>(photo);
                return CreatedAtRoute("GetPhoto", new {postId=postId, id = photo.Id}, photoToReturn);
            }
            
            return BadRequest("Nu s-a putut adauga poza");
*/
        

    

       /*    [HttpPost]  // nu este suportat tipul de poza eroare 415 din cauza ca n-are from form[]

                   public async Task<IActionResult> AddPhotoForPost(int postId, [FromForm]PhotoForCreation photoForCreation){ // autorizam requestul 
                       
                    
                    var postFromRep = await rep.GetPost(postId);
                    var file = photoForCreation.File;
                    var uploadResult = new ImageUploadResult();

                    if(file.Length > 0)
                    {
                        using(var stream = file.OpenReadStream())
                        {
                            var uploadParams = new ImageUploadParams()
                            {
                                File = new FileDescription(file.Name, stream),
                                Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face") // aici cropam imaginea
                            };
                            uploadResult = cloudinary.Upload(uploadParams);
                        }
                    }
                    photoForCreation.Url = uploadResult.Uri.ToString();
                    photoForCreation.PublicId = uploadResult.PublicId;
                    photoForCreation.postId = postId;
                    


                    var photo = mapper.Map<Photo>(photoForCreation);
                    context.Photo.Add(photo);
                    context.SaveChanges();


                    
                        return Ok();
                   
                    
                }

            

    }}


[HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int postId,
            [FromForm]PhotoForCreation photoForCreation)
        {

            var postFromRep = await rep.GetPost(postId);

            var file = photoForCreation.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    System.Console.WriteLine(uploadParams);
                    uploadResult = cloudinary.Upload(uploadParams);
                }
            }

            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.PublicId = uploadResult.PublicId;

            var photo = mapper.Map<Photo>(photoForCreation);

            postFromRep.Photos.Add(photo);

            if (await rep.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add the photo");
        }}}

        */



        