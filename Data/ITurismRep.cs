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
    }
}