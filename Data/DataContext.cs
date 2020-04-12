using Microsoft.EntityFrameworkCore;
using turism.Controllers.Models;
using turism.Models;

namespace turism.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) 
        { //??
        }
        public DbSet<Value> Values {get;set;}
        
        public DbSet<User> Users { get; set; }

        
    }
}