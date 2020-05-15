

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace turism.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        [IgnoreDataMember]
        public byte[] PasswordHash { get; set; }
        [IgnoreDataMember]

        public byte[] PasswordSalt { get; set; }

        public DateTime Joined { get; set; }   

        public DateTime BirthDate { get; set; } 

        public string LastName { get; set; }
        public string FirstName { get; set; }


        public int Points { get; set; } 

        public string Country {get; set;}

        public string City { get; set; }

        public string ImgUrl { get; set; }

        [IgnoreDataMember]
        public ICollection<Post> Posts {get; set;}

    }
}