using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace turism.Models
{
    public class Post
    {
      
        public int Id { get; set; }
        public string Type { get; set; }
        public string Title {get; set;}
        public string PostText {get; set;} 
        public string GetThere { get; set; }
        public int Approved { get; set; }

        public DateTime DateAdded {get; set;}
        // [JsonIgnore]
        public ICollection<Photo> Photos {get;set;}
        
        public User User {get; set;}

        public int UserId { get; set; }

        public City City {get; set;}

        public int CityId {get; set;}

        public ICollection<PostLike> PostLikes {get;set;}

        public ICollection<Reply> Replies {get; set;}

        public static implicit operator List<object>(Post v)
        {
            throw new NotImplementedException();
        }
    }
}