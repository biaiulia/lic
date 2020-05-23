using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turism.Data;
using turism.Models;
using System;
using System.Security.Claims;
using turism.DataTransferObjects;
using AutoMapper;

namespace turism.Controllers
{
    
    [ApiController]
    public class PostsController: ControllerBase
    {

        
        private readonly DataContext context;
         private readonly ITurismRep rep;
         private readonly IMapper mapper;
        
       
        
        public PostsController(DataContext context, ITurismRep rep, IMapper mapper)
        {
            this.context = context;
            this.rep = rep;
            this.mapper = mapper;

            
        
        }
        [Route("api/cities/{cityId}/posts")]
        [HttpGet]
        public async Task<IActionResult> GetPosts(int cityId)
        {
        //    var posts = await context.Post.Include(p => p.City).FirstOrDefaultAsync(m=>m.CityId==cityId);
            var posts = await context.Post.Include(p => p.City).Where(m=>m.CityId==cityId).ToListAsync();

         //var posts = await context.Post.ToListAsync();
        
            return Ok(posts);
        }

        
    
        [Route("api/posts/{id}", Name="GetPost")]
        [HttpGet("{id}")]

        public async Task<IActionResult> GetPost(int id){
             var post = await context.Post.Include(ph=>ph.Photos).Include(u=>u.User).Include(l=>l.PostLikes).Include(r=>r.Replies).FirstOrDefaultAsync(x=>x.Id==id);
            // var posts = await context.Post.Include(v => v.City).Where(m=>m.Id==cityId).FirstOrDefaultAsync(x=>x.Id=id);
            // var posts = await context.Post.Include(p => p.City).Where(m=>m.CityId==cityId).ToListAsync();
         
            return Ok(post);
        }
        [Route("api/posts/likes/{postId}")]
        [HttpGet("{id}")]
        public async Task<IEnumerable<int>> GetPostLikersIds(int postId){
            if(await rep.GetPost(postId) == null)
                return null;
            var likerIds = await rep.GetPostLikersId(postId);
            return likerIds;
        }

        [Route("api/posts/likesnr/{postId}")]
        [HttpGet("{id}")]
        public async Task<int> GetPostLikeNr(int postId){ // mai trebe puse conditiile daca nr postarii nu exista

             if(await rep.GetPost(postId) == null)
                 return 0;
        
            var likerIds = await rep.GetPostLikersId(postId);
                return likerIds.Count();
        }


        [Route("api/{userId}/{cityId}/posts")] // merge cu debugger, daca-l scot mai da internal error
        [HttpPost]
         public async Task<IActionResult> AddPost(int userId, int cityId, Post post)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(post.PostText!=null){
            var postCreate = new Post{
                UserId = userId,
                CityId = cityId,
                PostText = post.PostText,
                DateAdded = DateTime.Now
            };
            await context.Post.AddAsync(postCreate);

            await context.SaveChangesAsync(); // de facut 

            return Ok(postCreate);
            }
            return BadRequest("Trebuie sa introduceti text");
           


            // return CreatedAtRoute("GetPhoto", new {userId=userId, id=post.Id, cityId=post.CityId}, post);

        }



        [Route("api/{userId}/like/{postId}")]

         [HttpPost]
         

         public async Task<IActionResult> LikePost(int userId, int postId)
         {

             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await rep.GetLike(userId, postId);
            if(like!=null) 
                return BadRequest("Deja ai apreciat aceasta postare");

            if(await rep.GetPost(postId) == null)
                return NotFound();
            
            var likeCreate = new PostLike{
                UserId = userId,
                PostId = postId
            };
            if(likeCreate!=null)
            {
            context.Likes.Add(likeCreate);
            context.SaveChanges();
            return Ok();
            }
            return BadRequest("Nu s-a putut adauga like-ul");
           /* rep.Add<PostLike>(like); // nu e async,nu salveaza in bd aici

            if(await rep.SaveAll())
                return Ok();

            return BadRequest("Nu s-a putut adauga like-ul");*/

         }

         [Route("api/{userId}/like/{postId}")]
         [HttpDelete]
         public async Task<IActionResult> DislikePost(int userId,int postId)
         {
             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var like = await rep.GetLike(userId, postId);
            if(like==null)
                return BadRequest("Nu exista like la aceasta postare");
            
            context.Likes.Remove(await context.Likes.FirstOrDefaultAsync(l =>l.UserId==userId && l.PostId==postId));
            context.SaveChanges();
            return Ok();

         }
         [Route("api/{userId}/likes/{postId}")]
         [HttpGet]
         public async Task<Boolean> IsLiked(int userId, int postId)
         {
            var like = await rep.GetLike(userId, postId);
            if(like!=null)
                return true;
            
            return false;

         }
    }
}







            /*if (await rep.SaveAll())
            {
                var postToReturn = mapper.Map<PostForList>(post);
                return CreatedAtRoute("GetPhoto", new {userId=userId, id=post.Id, cityId=post.CityId}, postToReturn);
            } // returnam posttoreturn ca sa nu returnam si userii si city urile
            return BadRequest("Nu s-a putut adauga postarea");
*

        }// nu e bine

       /* public async Task<IActionResult> AddPost(int userId, PostForCreation postForCreation)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRep = await rep.GetUser(userId);
            postForCreation.UserId = userId;
            postForCreation.DateAdded = postForCreation.DateAdded;
            postForCreation.PostText
            

             

           // if(cityId != ) cum sa fac verificarea la cityId?

                /*var userFromRep = await rep.GetUser(userId); // de ce sa luam userul
                postForCreation.PostText=postForCreation.PostText;

            var postCreate = new Post
            {
                PostText = postForCreation.PostText,
                DateAdded = DateTime.Now,
                CityId = cityId,
                UserId = userId
                
            };
            return StatusCode(201);
           */

        

        

    //    [HttpGet]

        // public async Task<IActionResult> GetCityPosts(int cityid){
        //     var posts = await context.Post.Include(m => m.City).FirstOrDefaultAsync(m=>m.CityId==cityid);
        //     return Ok(posts);
        // }
    //    public IQueryable<Post> GetCityPosts(int cityId){
            // var posts = from p in context.Post.Where(p => p.CityId == cityId)
            // join cts in context.City on p.CityId equals cts.Id
            // select new Post{
              /* var posts = from p in context.Post
                            from c in context.City
                            where p.CityId==cityId
                   
                    select new{
                        p.DateAdded,
                        p.PostText,
                        p.UserId
                    };
                    
                    return (IQueryable<Post>)Ok(posts);*/
                   
            
        
        
    

