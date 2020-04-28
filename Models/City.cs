using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace turism.Models
{
    public class City
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description {get; set;}

        public string Url {get; set;}
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Post> Posts {get; set;}
    }
}