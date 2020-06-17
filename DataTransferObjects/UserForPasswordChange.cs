namespace turism.DataTransferObjects
{
    public class UserForPasswordChange
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string newPassword { get; set; }
    }
}