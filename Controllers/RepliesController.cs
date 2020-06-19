using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using turism.Data;
using turism.Models;

namespace turism.Controllers
{
    [ApiController]
    
    public class RepliesController : ControllerBase
    {
        private readonly ITurismRep rep;
        private readonly DataContext context;

        public RepliesController(DataContext context, ITurismRep rep)
        {
            this.context = context;
            this.rep = rep;
        }
        [Route("api/post/{postId}/replies")]
        [HttpGet]
        public async Task<IActionResult> GetReplies(int postId){
            var replies =await rep.GetReplies(postId);

                return Ok(replies);
            
        }
        [Route("api/{userId}/reply/{postId}")]
        [HttpPost]
        public async Task<IActionResult> AddReply(int postId, int userId, Reply reply)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // aici verificam daca tokenul e ca path ul
                return Unauthorized();
            if (reply.Comment != null)
            {
                var replyCreate = new Reply
                {
                    Comment = reply.Comment,
                    UserId = userId,
                    PostId = postId

                };
                await context.Reply.AddAsync(replyCreate);
                
                 await rep.AddUserPoints(userId, 5);
                await context.SaveChangesAsync();
                return Ok(replyCreate); // aici nu am pus await???????
            }
            return BadRequest("Nu ati introdus niciun text");
        }
        [Route("api/deleteReply/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteReply(int id){
            
            
            var reply = await rep.GetReply(id);
            
            if(reply==null)
                return BadRequest("Acest comentariu nu este al utilizatorului acesta");
                if(reply.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            context.Reply.Remove(reply);
            await rep.RemoveUserPoints(reply.UserId, 5);
            await context.SaveChangesAsync();
            return Ok();

        }

    }
    }
