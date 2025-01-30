using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Code;
using ReactType1.Server.Models;


namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DbLeagueApp _context;

        public AdminController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Leagues/Create
        [HttpPost]
        public async Task<UserTypeDetail?> Login(UserType item)
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
            var result = new UserTypeDetail()
            {
                id = user.Id,
                username = user.Username,
                role = Role
            };
            return result;
        }

        // GET: Leagues/Details/5
        [HttpGet("{id}")]
        public async Task<UserTypeDetail?> Details(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var user = await _context.Users.FindAsync(id.Value);
            if (user == null)
            {
                return null;
            }
            var detail = new UserTypeDetail()
            {
                id = user.Id,
                username = user.Username
            };
            return detail;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, UserTypeUpdate item)
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

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }






        public class UserType
    {
        public string? username { get; set; }
        public string? password { get; set; }
    }

    public class UserTypeDetail
    {
        public string? username { get; set; }
        public int id { get; set; }
        public string? role { get; set; }
    }

    public class UserTypeUpdate
    {
        public string? password { get; set; }
        public int Id { get; set; }
    }
}
