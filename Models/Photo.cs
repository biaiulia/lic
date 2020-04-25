namespace turism.Models
{
    public class Photo
    {
        public int Id {get; set;}

        public string Url {get; set;}

        public Post Post {get;set;} // pt cascade delete
        public int PostId { get; set; }


    }
}