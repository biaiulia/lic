using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turism.Data;
using turism.Models;
using System;
using System.Security.Claims;
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
            var posts = await context.Post.Include(p => p.City).Include(p => p.User).Where(m=>m.CityId==cityId).ToListAsync();

         //var posts = await context.Post.ToListAsync();
        
            return Ok(posts);
        }


        
    
        [Route("api/posts/{id}", Name="GetPost")]
        [HttpGet("{id}")]

        public async Task<IActionResult> GetPost(int id){
             var post = await context.Post.Include(p=>p.Photos).Include(p=>p.User).Include(l=>l.PostLikes).Include(r=>r.Replies).ThenInclude(r=>r.User).FirstOrDefaultAsync(x=>x.Id==id);
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


        [Route("api/{userId}/{cityId}/posts")] 
        [HttpPost]
         public async Task<IActionResult> AddPost(int userId, int cityId, Post post)
        {
            if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) 
                    return Unauthorized();
            if(post.PostText!=null){
            var postCreate = new Post{
                UserId = userId,    
                CityId = cityId,
                PostText = post.PostText,
                DateAdded = DateTime.Now,
                Type= post.Type
            };
            if(post.GetThere!=null){
                postCreate.GetThere=post.GetThere;
            }

            await context.Post.AddAsync(postCreate);
            await rep.AddUserPoints(userId, 10);
            await context.SaveChangesAsync(); // de facut 
            

            return Ok(postCreate);
            }
            return BadRequest("Trebuie sa introduceti text");
           


            // return CreatedAtRoute("GetPhoto", new {userId=userId, id=post.Id, cityId=post.CityId}, post);

        }
        [Route("api/{userId}/deletePost/{postId}")] // merge cu debugger, daca-l scot mai da internal error
        [HttpDelete]
         public async Task<IActionResult> DeletePost(int userId, int postId)
        {
            var post = await rep.PostExists(userId, postId);
            if(post==null)
                return BadRequest("Postarea nu exista, nu poate fi stearsa");

            if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // aici verificam daca tokenul e ca path ul
                    return Unauthorized();
        
            context.Post.Remove(post);
            return Ok();
                

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
            context.Like.Add(likeCreate);
            await rep.AddUserPoints(userId, 3);
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
            
            context.Like.Remove(like);
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


