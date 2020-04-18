using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using turism.Models;

namespace turism.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context){
            if (!context.Users.Any()) // sa pun !
            {
                var userData = System.IO.File.ReadAllText("Data/UserData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach(var user in users){
                    byte[] passwordhash, passwordSalt;
                    CreatePasswordHash("password", out passwordhash, out passwordSalt);
                    user.PasswordHash = passwordhash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
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