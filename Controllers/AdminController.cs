using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turism.Data;
using turism.DataTransferObjects;
using turism.Models;

namespace turism.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext context;
        private readonly UserManager<User> userManager;
        public AdminController(DataContext context, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.context = context;

        }


        [HttpGet("userRoles")]
        public async Task<IActionResult> GetUserRoles()
        {
            var users = await context.Users
            .OrderBy(u => u.UserName)
            .Select(user => new
            {
                Id = user.Id,
                UserName = user.UserName,
                Roles = (from userRole in user.UserRoles
                         join role in context.Roles
                         on userRole.RoleId
                         equals role.Id
                         select role.Name).ToList()
            }).ToListAsync();
            return Ok(users);
        }

        [HttpPost("rolesEdit/{userName}")]
         public async Task<IActionResult> EditRoles(string userName, RoleEdit roleEdit)
        {
            var user = await userManager.FindByNameAsync(userName);
            if(user==null)
                return BadRequest("Utilizatorul nu exista!");

            var userRoles = await userManager.GetRolesAsync(user);

            var selectedRoles = roleEdit.RoleNames;

            if(selectedRoles==null) 
                selectedRoles = new string[] { };
            var result = await userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles)); // adauga la roluri restul, exceptie facand cel care e deja

            if (!result.Succeeded)
                return BadRequest("Nu s-a putut adauga rolul");

            result = await userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles)); // scoatem restu 

            if (!result.Succeeded)
                return BadRequest("Nu s-au putut sterge rolurile");

            return Ok(await userManager.GetRolesAsync(user));
        }
        //Video 209 min 5
        




    }

}