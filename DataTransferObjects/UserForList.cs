using System;

namespace turism.DataTransferObjects
{
    public class UserForList
    {
          public int Id { get; set; }

        public string Username { get; set; }


        public DateTime Joined { get; set; }   

        public int Age;

        public string LastName { get; set; }
        public string FirstName { get; set; }


        public int Points { get; set; } 

        public string Country {get; set;}

        public string City { get; set; }

        public string ImgUrl { get; set; }
    }
    }
