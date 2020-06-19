using System.Collections.Generic;
using System.Threading.Tasks;
using turism.Models;

namespace turism.Data
{
    public interface ITurismRep
    {
      //   void Add(User u);  //  puteam face void Add<T>(T entity)
           void Add<T> (T entity) where T: class;
           void Delete<T> (T entity) where T: class;
           Task<bool> SaveAll(); // vedem daca sunt save uri mai multe
           Task<IEnumerable<User>> GetUsers();
           Task<User> GetUser(int id);

           Task<City> GetCity(int id);

           Task<Post> GetPost(int id);
           Task<IEnumerable<Post>> GetPosts(int cityId);
           Task<Photo> GetPhoto(int id);

           Task<PostLike> GetLike(int postId, int userId);

          //  Task<Post> PostExists(int userId, int postId);
           Task<IEnumerable<City>> GetCities();
           Task<IEnumerable<City>> SearchCity(string search);

           Task<IEnumerable<Reply>> GetReplies(int postId);

           Task<IEnumerable<int>> GetPostLikersId(int postId);
           Task<Reply> GetReply(int id);
            // Task<Post> PostExists(int postId);
            // Task<User> UserExists(int userId);
            Task<User> AddUserPoints(int userId, int points);
            Task<User> RemoveUserPoints(int userId, int points);
            Task<IEnumerable<Post>> GetUnapprovedPosts(int cityId);
    }
}