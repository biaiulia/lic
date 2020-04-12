using System.Threading.Tasks;
using turism.Models;

namespace turism.Data
{
    public interface IAuthRepository

    {
         Task<User> Register(User user, string password);

         Task<bool> UserExists(string username);
         Task<User> Login(string username, string password);
    
         
    }
}