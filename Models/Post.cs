using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace turism.Models
{
    public class Post
    {
      
        public int Id { get; set; }

        public string PostText {get; set;} 

        public DateTime DateAdded {get; set;}
        [JsonIgnore]
        public ICollection<Photo> Photos {get;set;}

        public User User {get; set;}

        public int UserId { get; set; }

        public City City {get; set;}

        public int CityId {get; set;}

        public static implicit operator List<object>(Post v)
        {
            throw new NotImplementedException();
        }
    }
}