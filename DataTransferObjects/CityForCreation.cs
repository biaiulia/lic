using Microsoft.AspNetCore.Http;

namespace turism.DataTransferObjects
{
    public class CityForCreation
    {
        public string Name {get; set;}
        public string Description { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public IFormFile File { get; set; }
    }
}