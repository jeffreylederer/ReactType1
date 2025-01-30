using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Code;
using ReactType1.Server.Models;
using System.Data;



namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DbLeagueApp _context;



        public UsersController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Users
        [HttpGet]
        public async Task<IEnumerable<DTOUserRoleDetails>> Get()
        {
            var newList = new List<DTOUserRoleDetails>();  
            try
            {
                var list = await _context.Users.ToListAsync();
                foreach (var user in list)
                {
                    var item = new DTOUserRoleDetails()
                    {
                        Id= user.Id,
                        IsActive = user.IsActive,
                        UserName = user.Username,
                        DisplayName = user.DisplayName
                    };
                    UserRole? userRole = await _context.UserRoles.Where(x => x.UserId == item.Id).FirstOrDefaultAsync();
                    if (userRole != null)
                    {
                        switch (userRole.RoleId)
                        {
                            case 1: item.Role = "Observer"; break;
                            case 2: item.Role = "Scorer"; break;
                            case 3: item.Role = "Admin"; break;
                            case 4: item.Role = "SiteAdmin"; break;
                        }
                    }
                    newList.Add(item);
                }
            }
            catch (Exception)
            {
                return newList;
            }
            return newList;
        }



        // GET: Users/Details/5
        [HttpGet("{id}")]
        public async Task<DTOUserRoleDetails?> Details(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var item = await _context.Users.FindAsync(id.Value);
            if (item == null)
            {
                return null;
            }

            var user = new DTOUserRoleDetails()
            {
                Id = id.Value,
                IsActive = item.IsActive,
                UserName = item.Username,
                DisplayName = item.DisplayName
            };

            var role = await _context.UserRoles.Where(x=>x.UserId == item.Id).FirstOrDefaultAsync();
            if (role != null)
            {
                user.RoleId = role.Id;
                switch (role.RoleId)
                {
                    case 1: user.Role = "Observer"; break;
                    case 2: user.Role = "Scorer"; break;
                    case 3: user.Role = "Admin"; break;
                    case 4: user.Role = "SiteAdmin"; break;
                    default: user.Role = "Observer"; break;
                }
            }
            
            return user;

        }

        // GET: Users/Create
        [HttpPost]
        public async Task<IActionResult> Create(DTOUserRoleCreate item)
        {
            string password = GetSha256Hash.Encode(item.Password);
            try
            {
                var user = new User()
                {
                    LastLoggedIn = null,
                    SerialNumber = Guid.NewGuid().ToString("N"),
                    Password = password,
                    IsActive = item.IsActive,
                    Username = item.Username,
                    DisplayName = item.DisplayName,
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var userRole = new UserRole() { RoleId = item.RoleId, UserId=user.Id };

                _context.UserRoles.Add(userRole);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return Ok();

        }

        // GET: Users/Edit/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, DTOUserRoleUpdate item)
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

            user.IsActive = item.IsActive;
            user.DisplayName = item?.DisplayName;
            _context.Entry(user).State = EntityState.Modified;

            //UserRole? userRole = await _context.UserRoles.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
            //if (userRole == null )
            //{
            //    _context.UserRoles.Add(new UserRole()
            //    {
            //        UserId = id,
            //        RoleId = item.RoleId
            //    });
                
            //}
            //else if(userRole != null)
            //{
            //    userRole.RoleId = item.RoleId;
            //    try
            //    {
            //        _context.Entry(userRole).State = EntityState.Modified;
            //    }
            //    catch(Exception ex1)
            //    {
            //        var mess = ex1.Message;
            //    }
            //}

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return Ok();
        }

        // GET: Users/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Users.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Users.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
