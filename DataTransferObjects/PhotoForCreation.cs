using Microsoft.AspNetCore.Http;

namespace turism.DataTransferObjects
{
    public class PhotoForCreation
    {
        public string Url { get; set; }

        public IFormFile File {get;set;} // file trimis cu http request, e poza pe care o uploadam
        public string PublicId { get; set; }

        
    }
}