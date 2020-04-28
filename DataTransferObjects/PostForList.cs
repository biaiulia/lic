using System;

namespace turism.DataTransferObjects
{
    public class PostForList
    {
        public string PostText {get; set;} 

        public DateTime DateAdded {get; set;}
    

    public PostForList()
    {
        DateAdded = DateTime.Now;
    }
}
}