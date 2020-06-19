using System.Threading.Tasks;

namespace turism.Data
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}