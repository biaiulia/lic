using System;
using System.ComponentModel.DataAnnotations;

namespace turism.DataTransferObjects
{
    public class UserForRegister
    {
        [Required]
        public string Username { get; set; }

        [Required][StringLength(8, MinimumLength=6, ErrorMessage = "Parola trebuie sa fie mai lunga de 6 caractere")]

        public string Password { get; set; }
        public DateTime DateJoined {get; set;}

    
    public UserForRegister()
    {
        DateJoined = DateTime.Now;
        
    }
}
}