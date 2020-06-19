using System.Collections;
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
         public async Task<IEnumerable<City>> SearchCity(string search)
        {
            var cities = await context.City.Where(c=>c.Name.ToLower().Contains(search.ToLower())).ToListAsync();
            
            return cities;
        }

        public async Task<City> GetCity(int id)
        {
            var city = await context.City.Include(c=>c.Posts).FirstOrDefaultAsync(c=>c.Id==id);
            return city;
        }
        public async Task<City> GetCityByName(string name)
        {
            var city = await context.City.Include(c=>c.Posts).ThenInclude(p=>p.User).FirstOrDefaultAsync( x => x.Name.ToLower() == name.ToLower());
            return city;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await context.Users.FirstOrDefaultAsync(u=>u.Id==id); 
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return users;
        }
    
  
           public async Task<IEnumerable<Post>> GetPosts(int cityId)
        {
             var posts = await context.Post.Include(p => p.PostLikes).Include(p => p.City).Where(m=>m.CityId==cityId && m.Approved == 1).ToListAsync();

            return posts;
        }
         public async Task<IEnumerable<Post>> GetUnapprovedPosts(int id)
        {
            var posts=  await context.Post.Include(p=>p.User).Where(p =>p.CityId==id && p.Approved==0).ToListAsync();
            return posts;
        }
        public async Task<User> AddUserPoints(int userId, int points){
            var user = await context.Users.FirstOrDefaultAsync(u=>u.Id==userId);
            user.Points += points;

            return user;
        
        }
        public async Task<User> RemoveUserPoints(int userId, int points){
            var user = await context.Users.FirstOrDefaultAsync(u=>u.Id==userId);
            user.Points -= points;

            return user;
        }

     
        public async Task<IEnumerable<int>> GetPostLikersId(int postId){ // metoda care returneaza id urile persoanelor care au dat like la posturi
            var posts = await context.Post.Include(p=>p.PostLikes).FirstOrDefaultAsync(p=>p.Id==postId); // nu cred ca mi trebe???
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
            return await context.Like.FirstOrDefaultAsync(l => l.UserId == userId && l.PostId == postId);
        }

        public async Task<IEnumerable<Reply>> GetReplies(int postId)
        {
            return await context.Reply.Include(r=>r.User).Where(r => r.PostId==postId).ToListAsync();

           

        }

        public Task<Post> PostExists(int postId)
        {
            var post = context.Post.FirstOrDefaultAsync(p=>p.Id==postId);
            if(post!=null)
                return post;
            return null;
                 
        }

        public Task<Reply> GetReply(int id)
        {
            return context.Reply.FirstOrDefaultAsync(r=> r.Id==id);
        }

        public Task<User> UserExists(int userId)
        {
            return context.Users.FirstOrDefaultAsync(u=>u.Id==userId);
        }

      
    }
}