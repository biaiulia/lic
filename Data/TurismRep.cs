using System.Collections.Generic;
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

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0 ; // daca e mai mult ca 0 inseamna true si daca e egal cu 0 nu s-a salvat nik
        }
    }
}