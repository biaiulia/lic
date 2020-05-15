using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace turism.Models
{
    public class PostLike
    { 
        public int UserId { get; set; }

        public User Users {get; set;}

        public Post Posts {get; set;}
        public int PostId { get; set; }
    }
}