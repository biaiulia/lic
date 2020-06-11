

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace turism.Models
{
    public class User : IdentityUser<int> // id ca si int
    {

        public DateTime Joined { get; set; }   

        public DateTime BirthDate { get; set; } 

        public string LastName { get; set; }
        public string FirstName { get; set; }


        public int Points { get; set; } 

        public string Country {get; set;}

        public string City { get; set; }

        public string Url { get; set; }
        public string PublicId { get; set; }

        [IgnoreDataMember]
        public ICollection<Post> Posts {get; set;}

        public ICollection<UserRole> UserRoles {get; set;}

    }
}