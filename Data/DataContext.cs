using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using turism.Models;

namespace turism.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>> // ca sa definim id urile la int
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) 
        { //??
        }
        

        public DbSet<City> City {get; set;}

        public DbSet<Post> Post { get; set;}

        public DbSet<Photo> Photo { get; set;}

        public DbSet<PostLike> Like {get; set;}

        public DbSet<Reply> Reply {get; set;}

        internal Task Where(Func<object, object> p)
        {
            throw new NotImplementedException();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // sa nu avem eroare???
            builder.Entity<UserRole>(userRole=>
            {
                userRole.HasKey(key => new {key.UserId, key.RoleId});

                userRole.HasOne(key=> key.Role)
                .WithMany(r=>r.UserRoles)
                .HasForeignKey(key=>key.RoleId)
                .IsRequired();

                userRole.HasOne(key=> key.User)
                .WithMany(r=>r.UserRoles)
                .HasForeignKey(key=>key.UserId)
                .IsRequired();
            });
            builder.Entity<PostLike>().HasKey(l => new {l.PostId, l.UserId});
        
           
        }
    }
}