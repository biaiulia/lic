using System.Collections.Generic;

namespace turism.Models
{
    public class City
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description {get; set;}

        public string Url {get; set;}

        public ICollection<Post> Posts {get; set;}
    }
}