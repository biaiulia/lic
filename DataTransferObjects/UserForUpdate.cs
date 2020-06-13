using Microsoft.AspNetCore.Http;

namespace turism.DataTransferObjects
{
    public class UserForUpdate
    {
        public string FirstName{get;set;}
        public string LastName{get;set;}
        public string Country{get;set;}
        public string City{get;set;}
         public string Url {get;set;}
        public IFormFile File {get;set;}
        public string PublicId { get; set; }
        
    }
}