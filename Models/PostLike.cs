using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace turism.Models
{
    public class PostLike
    { 
        public int UserId { get; set; }

        [IgnoreDataMember]
        public User Users {get; set;}
        [IgnoreDataMember]
        public Post Posts {get; set;}
        public int PostId { get; set; }
    }
}