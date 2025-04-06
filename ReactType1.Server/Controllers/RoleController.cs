using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Models;

namespace ReactType1.Server.Controllers
{
    public class RolesController(DbLeagueApp context) : ControllerBase
    {
        private readonly DbLeagueApp _context = context;

        // GET: Leagues
        [HttpGet]
        public async Task<IEnumerable<Role>?> Get()
        {
            try
            {
                var list = await _context.Roles.ToArrayAsync();
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
