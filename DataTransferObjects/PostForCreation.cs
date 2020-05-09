using System;

namespace turism.DataTransferObjects
{
    public class PostForCreation
    {
        public string PostText { get; set; }
        
        public DateTime DateAdded { get; set; }

        public int UserId { get; set; }

        public int CityId { get; set;}

    public PostForCreation()
    {
        DateAdded = DateTime.Now;
    }
        
    }
}