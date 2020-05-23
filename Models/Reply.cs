using System;
using System.Runtime.Serialization;

namespace turism.Models
{
    public class Reply
    {
        public int Id { get; set; }

        public string Comment { get; set; }

        public DateTime DateAdded {get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        [IgnoreDataMember]
        public Post Post {get; set;}
        public int PostId { get; set; }
    
    public Reply()
    {
        DateAdded = DateTime.Now;
        
    }

}
}