using Microsoft.AspNetCore.Http;

namespace turism.DataTransferObjects
{
    public class PhotoForCreation
    {
        public string Url {get;set;}
        public IFormFile File {get;set;}
        public string Description { get; set; }

        public string PublicId { get; set; }

        public int postId { get; set; }

    }
   
}