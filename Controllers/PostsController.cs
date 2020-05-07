using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turism.Data;
using turism.Models;
using System;


namespace turism.Controllers
{
    
    [ApiController]
    public class PostsController: ControllerBase
    {

        
        private readonly DataContext context;
        public Post posts {get;set;}
        
        public PostsController(DataContext context)
        {
            this.context = context;
        
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


          // var posts = await context.Post.Include(m => m.City).ForEachAsync(m=>m.cityId==cityId);
           //FirstOrDefaultAsync(m=>m.CityId==cityId);

           // var posts = await context.Post.Include(v => v.City).FirstOrDefaultAsync(m=>m.Id==cityId);

            //var posts = await context.Post.I
            
            //Attach(m => m.CityId == cityId);


            //AnyAsync(m => m.CityId == cityId).ToListAsync();
            //await context.Post.ToListAsync();
            
            // foreach(var post in allPosts){
            //     if(cityId == post.CityId)
            //          posts = new Post(post).ToListAsync();                    

               

            // var posts = (from p in context.Post join c in context.City on p.cityId=c.Id select *).ToListAsync();
    
           
        
    
        [Route("api/posts/{id}")]
        [HttpGet("{id}")]

        public async Task<IActionResult> GetPost(int id){
             var post = await context.Post.FirstOrDefaultAsync(x=>x.Id==id);
            // var posts = await context.Post.Include(v => v.City).Where(m=>m.Id==cityId).FirstOrDefaultAsync(x=>x.Id=id);
            // var posts = await context.Post.Include(p => p.City).Where(m=>m.CityId==cityId).ToListAsync();
         
            return Ok(post);
        }

        

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
                   
            }
        
        
    }

