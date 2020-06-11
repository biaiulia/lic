
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using turism.Models;

namespace turism.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager){
            if (!userManager.Users.Any()) // sa pun !
            {
                var userData = System.IO.File.ReadAllText("Data/UserData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
               
                var roles = new List<Role>
                {
                    new Role{Name= "Member"},
                    new Role{Name= "Admin"},
                };

                foreach(var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }
                foreach(var user in users){
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member");
                }
                var admin = new User{
                    UserName= "Admin"
                };
                var res = userManager.CreateAsync(admin,"password").Result;

                if(res.Succeeded)
                {
                    var adm = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(adm, new[] {"Admin"});
                }
               
            }
        }
         private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            
            using(var hash = new System.Security.Cryptography.HMACSHA512())// tot ce e in interioru {} va fi disposed dupa ce e foolosit
            {
                passwordSalt = hash.Key; // setam saltu cu cheia random
                passwordHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); 
            }
        }
    }
}

    