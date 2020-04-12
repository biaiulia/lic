using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using turism.Models;


namespace turism.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;
        public AuthRepository(DataContext context) //injectie
        {
            this.context = context;
        }


        public async Task<User> Login(string username, string password)
        {
            var user = await context.Users.FirstOrDefaultAsync( x=> x.Username == username);

            if (user == null)
                return null;
            
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
             using(var hash = new System.Security.Cryptography.HMACSHA512(passwordSalt))// tot ce e in interioru {} va fi disposed dupa ce e foolosit
            {
               
                var computedHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); 
                for(int i = 0; i< computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;

            
        } //????????

        

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            
            using(var hash = new System.Security.Cryptography.HMACSHA512())// tot ce e in interioru {} va fi disposed dupa ce e foolosit
            {
                passwordSalt = hash.Key; // setam saltu cu cheia random
                passwordHash = hash.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); 
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await context.Users.AnyAsync( x => x.Username == username)) // comparam cu orice alt utilizator din bd cu AnyAsync
                return true;

            return false;
        }
    }
}