using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using turism.Models;

namespace turism.Data
{
    public class TurismRep : ITurismRep
    {
        private DataContext context;

        public TurismRep(DataContext context)
        {
            this.context=context;
        }

        public void Add<T>(T entity) where T : class // folosim sincron pt ca nu facem query cu db
        {
            context.Add(entity);
         }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        public async Task<IEnumerable<City>> GetCities()
        {
            var cities = await context.City.ToListAsync();
            return cities;
        }

        public async Task<City> GetCity(int id)
        {
            var city = await context.City.FirstOrDefaultAsync(c=>c.Id==id);
            return city;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await context.Users.FirstOrDefaultAsync(u=>u.Id==id); // ceeee? el avea si .Include(p=>Photos)
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return users;
        }

           public async Task<IEnumerable<Post>> GetPosts(int cityId)
        {
             var posts = await context.Post.Include(p => p.PostLikes).Include(p => p.City).Where(m=>m.CityId==cityId).ToListAsync();

            

            return posts;
        }

        // private async Task<IEnumerable<User>> GetPostLikes(int postId,bool likers)
        // {
        //     //var likes = await context.Likes.Where(p=>p.PostId==postId).ToListAsync();
        //     // var likesNr = Post.PostLikes.Sum(p=>p.PostId.Count);

        //     var post = await context.Post.Include(p=>p.PostLikes).FirstOrDefaultAsync(p=>p.Id == postId);
        //     if(likers)
        //     {
        //      var users = await context.Users.Where(u=>u.Id == post.UserId).ToListAsync();
        //         return users;
        //     }
        //     else 
           // return BadRequest("Postarea nu are like uri"); aici tre schimbat

        // public async Task<IEnumerable<int>> GetPostLikesNr(int postId,bool likers)
        // {
        //     var posts = await context.Post.Include(p=> p.PostLikes).FirstOrDefaultAsync(p=>p.Id==postId);

        //     if(likers)
        //     {
        //         return posts.PostLikes.Select(p=> p.PostId == postId);
        //     }
            
        // }

        public async Task<IEnumerable<int>> GetPostLikersId(int postId){ // metoda care returneaza id urile persoanelor care au dat like la posturi
            var posts = await context.Post.Include(p=>p.PostLikes).FirstOrDefaultAsync(p=>p.Id==postId);
            var likes = posts.PostLikes.Select(l=>l.UserId);
            return likes; // ar trebui sa punem si un else pt erori dar nuj cum

        }

        public async Task<Post> GetPost(int id)
        {
            var post = await context.Post.FirstOrDefaultAsync(p=>p.Id==id);
            return post;
        }
        


        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0 ; // daca e mai mult ca 0 inseamna true si daca e egal cu 0 nu s-a salvat nik
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await context.Photo.FirstOrDefaultAsync(p=>p.Id==id);
            return photo;
        }

        public async Task<PostLike> GetLike(int userId, int postId)
        {
            return await context.Likes.FirstOrDefaultAsync(l => l.UserId == userId && l.PostId == postId);
        }
    }
}