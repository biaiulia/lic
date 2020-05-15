using System;

namespace turism.Models
{
    public class Reply
    {
        public int Id { get; set; }

        public string Comment { get; set; }

        public DateTime DateAdded {get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public Post Post {get; set;}
        public int PostId { get; set; }
    }
}