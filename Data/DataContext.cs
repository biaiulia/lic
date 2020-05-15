using System;
using System.Threading.Tasks;
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

        public DbSet<City> City {get; set;}

        public DbSet<Post> Post { get; set;}

        public DbSet<Photo> Photo { get; set;}

        public DbSet<PostLike> Likes {get; set;}

        public DbSet<Reply> Replies {get; set;}

        internal Task Where(Func<object, object> p)
        {
            throw new NotImplementedException();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PostLike>().HasKey(l => new {l.PostId, l.UserId});
        
           
        }
    }
}