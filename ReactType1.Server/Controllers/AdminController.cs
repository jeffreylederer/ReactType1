using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Code;
using ReactType1.Server.Models;
using System.Net.Mail;
using System.Net;
using ReactType1.Server.DTOs.Admin;





namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DbLeagueApp _context;
        private readonly IConfiguration _configuration;

        public AdminController(DbLeagueApp context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: Leagues/Create
        // login.tsx
        [HttpPost]
        public async Task<LoginResultDto?> Login(LoginDTO item)
        {
            User? user = await _context.Users.Where(x => x.Username == item.username).FirstOrDefaultAsync();
            if (user == null || item.password == null)
            {
                return null;
            }

            var pw = GetSha256Hash.Encode(item.password);
            if (pw != user.Password)
            {
                return null;
            }
            UserRole? role = _context.UserRoles.Where(x=>x.UserId == user.Id).FirstOrDefault();
            string? Role = "Observer";
            switch (role?.RoleId)
            {
                case 1: Role = "Observer"; break;
                case 2: Role = "Scorer"; break;
                case 3: Role = "Admin"; break;
                case 4: Role = "SiteAdmin"; break;
                
            };
            var result = new LoginResultDto()
            {
                Id = user.Id,
                UserName = user.Username,
                Role = Role
            };
            return result;
        }

       

       

        // UserUpdatePassword.tsx
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, UserUpdateDto item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            User? user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.Password = GetSha256Hash.Encode(item.password);

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
               if(!UserExists(id)) 
                    return NotFound();
               else
                    throw;
           
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return Ok();
        }

        // RecoverPasswordRequest.tsx
        [HttpPost("RecoverPasswordRequest")]
        public async Task<IActionResult> RecoverPasswordRequest(RecoverPasswordRequestDto item)
        {
            
            var user = await _context.Users.Where(x=>x.Username == item.UserName).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            var rp = new RecoverPassword()
            {
                Userid = user.Id,
                Id = Guid.NewGuid(),
                Time = DateTime.Now
            };

            try
            {
                _context.RecoverPasswords.Add(rp);
                _context.SaveChanges();
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }

           
            var link = $"{item.url}UpdateRecoverPassword?id={rp.Id.ToString()}";

            using (var smtp = new SmtpClient())
            {

                smtp.Host =  _configuration.GetValue<string>("Mailer:smtp");
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(_configuration.GetValue<string>("Mailer:userid"), _configuration.GetValue<string>("Mailer:password"));

                using (var message = new MailMessage(new MailAddress(_configuration.GetValue<string>("Mailer:sender")), new MailAddress(user.Username)))
                {

                    message.Subject = "Request to Recover Password";
                    message.Body = $"Hi,<br/><br/>We got your request for resetting your account password. Please click on the below link to reset your password<br/><br/><a href={link}>Reset Password link</a>"; ;
                    message.IsBodyHtml = true;
                    try
                    {
                        smtp.Send(message);

                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, ex.Message);
                    }
                }
            }

            return Ok();
        }

        
        [HttpGet("UpdatePassword/{id}")]
        public async Task<int?> UpdateUserPassword(string? id)
        {
            if (id == null)
            {
                return null;
            }
            var guid = new Guid(id);
            var result = _context.RecoverPasswords.Find(guid);
            if (result == null)
            {
                return null;
            }


            return result.Userid;
        }



        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }

    


   

    




   

   
}
