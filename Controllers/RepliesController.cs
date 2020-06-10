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
        public IActionResult AddReply(int postId, int userId, Reply reply)
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
                context.Replies.Add(replyCreate);
                context.SaveChanges();
                return StatusCode(201); // aici nu am pus await???????
            }
            return BadRequest("Nu ati introdus niciun text");
        }
        [Route("api/{userId}/deleteReply/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteReply(int userId, int id){
            
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var reply = await rep.GetReply(userId, id);
            if(reply==null)
                return BadRequest("Acest comentariu nu este al utilizatorului acesta");
            
            context.Replies.Remove(reply);
            context.SaveChanges();
            return Ok();

        }

    }
    }
