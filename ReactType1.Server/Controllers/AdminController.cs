using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Code;
using ReactType1.Server.Models;
using System.Net.Mail;
using System.Net;
using ReactType1.Server.DTOs.Admin;
using System;
using System.Reflection.Metadata.Ecma335;
using System.Text;





namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController(DbLeagueApp context, IConfiguration configuration) : ControllerBase
    {
        private readonly DbLeagueApp _context = context;
        private readonly IConfiguration _configuration = configuration;

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
            string Role = "";
            switch (user.RoleId)
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
        public async Task<ActionResult<UserUpdateDto>> Edit(int id, UserUpdateDto? item)
        {
            if (item == null || id != item.Id)
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
            return Ok(item);
        }

        // RecoverPasswordRequest.tsx
        [HttpPost("RecoverPasswordRequest")]
        public async Task<string> RecoverPasswordRequest(RecoverPasswordRequestDto item)
        {
            
            var user = await _context.Users.Where(x=>x.Username == item.UserName).FirstOrDefaultAsync();
            if (user == null)
            {
                return "User not found";
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
            catch(Exception ex)
            {
                StringBuilder stringBuilder = new (ex.Message);
                while(ex.InnerException != null)                
                {
                    stringBuilder.Append("; ");
                    ex = ex.InnerException;
                } 
                return stringBuilder.ToString();

            }


            var link = $"{item.url}UpdateRecoverPassword?id={rp.Id}";


            var fromEmail = new MailAddress(_configuration.GetValue<string>("Mailer:userid") ?? "jeffrey@winnlederer.com", "Lawn Bowling Pittsburgh");
            var toEmail = new MailAddress(user.Username);
            var fromEmailPassword = _configuration.GetValue<string>("Mailer:password");

            using SmtpClient smtp = new();
            { 

                smtp.Host = _configuration.GetValue<string>("Mailer:smtp")?? "";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword);

                using MailMessage message = new(fromEmail, toEmail);
                {

                    message.Subject = "Reset Password for Lawn Bowling League Management Application";
                    message.Body = $"Hi,<br/><br/>We got request for reset your account password. Please click on the below link to reset your password<br/><br/><a href={link}>Reset Password link</a>";
                    message.IsBodyHtml = true;
                    try
                    {
                        smtp.Send(message);

                    }
                    catch (Exception ex)
                    {
                        StringBuilder stringBuilder = new (ex.Message);
                        while (ex.InnerException != null)
                        {
                            stringBuilder.Append("; ");
                            ex = ex.InnerException;
                        }
                        return stringBuilder.ToString();

                    }
                }
            }

            return "email sent";
            
        }


            [HttpGet("UpdatePassword/{id}")]
        public int? UpdateUserPassword(string id)
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
            var today = DateTime.Now;
            var diffOfDates = today.Subtract(result.Time);
            
            if(diffOfDates.Ticks > 12000000000)
            {
                return 0;
            }


            return result.Userid;
        }



        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }

    


   

    




   

   
}
