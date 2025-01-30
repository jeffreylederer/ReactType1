using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using ReactType1.Server.Code;
using ReactType1.Server.Models;



// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly DbLeagueApp _context;

        public TeamsController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Teams
        [HttpGet("{id}")]
        public async Task<IEnumerable<TeamMember>> Get(int id)
        {
            var list = await _context.TeamMembers
                     .FromSql($"EXEC TeamAllowDelete {id}")
                    .ToListAsync();
            list.Sort((a, b) => a.TeamNo.CompareTo(b.TeamNo));
            return list;
        }

        // GET: Players/Details/5
        [HttpGet("NotOnTeam/{id}")]
        public async Task<IEnumerable<Membership>> NotOnTeam(int id)
        {
            List<Membership> list = await _context.Memberships
                     .FromSql($"EXEC NotOnTeam {id}")
                    .ToListAsync();
            list.Sort((a, b) => a.LastName.CompareTo(b.LastName));
            return list;
        }

        // GET: Teams/Details/5
        [HttpGet("getOne/{id}")]
        public OneTeamView? GetOne(int? id)
        {
            if (id == null)
            {
                return null;
            }

            try
            {
                SqlParameter[] parameters = {
                    new SqlParameter("leagueid", id)
                };
                var team = _context.OneTeamViews
                         .FromSqlRaw("EXEC OneTeam @leagueid", parameters)
                         .AsEnumerable()
                         .FirstOrDefault();
                         

                if (team == null)
                {
                    return null;
                }
                
                return team;
            }
            catch(Exception ex)
            {
                var mess = ex.Message;
            }
            return null;
        }

        // GET: Players/Details/5
        [HttpGet("TeamReport/{id}")]
        public string? TeamReport(int? id)
        {
            if (id == null)
            {
                return null;
            }
            QuestPDF.Settings.License = LicenseType.Community;
            var report = new TeamReportDoc();
            var document = report.CreateDocument(id.Value, _context);
            byte[] pdfBytes = document.GeneratePdf();
            var results = Convert.ToBase64String(pdfBytes);
            return results;
        }


        [HttpPost]
        public async Task Create(TeamTypeCreate item)
        {
            var teamNo = await _context.Teams.Where(x => x.Leagueid == item.Leagueid).CountAsync() + 1;

            var Team = new Team()
            {
                Id = item.Id,
                Skip = item.Skip == 0 ? null : item.Skip,
                ViceSkip = item.ViceSkip == 0 ? null : item.ViceSkip,
                Lead = item.Lead == 0 ? null : item.Lead,
                Leagueid = item.Leagueid,
                TeamNo = teamNo,
                DivisionId = item.DivisionId
            };
            _context.Teams.Add(Team);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                var message = ex.Message;
            }


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, TeamType item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            var teamNo = _context.Teams.Where(x => x.Leagueid == item.Leagueid).Count()+1;

            var Team = new Team()
            {
                Id = item.Id,
                Skip = item.Skip==0? null:  item.Skip,
                ViceSkip = item.ViceSkip == 0 ? null : item.ViceSkip,
                Lead = item.Lead == 0 ? null : item.Lead,
                Leagueid = item.Leagueid,
                TeamNo = item.TeamNo,
                DivisionId=item.DivisionId
            };

            _context.Entry(Team).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
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
            return NoContent();
        }


        // GET: Teams/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Teams.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Teams.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException)
            {
                return StatusCode(409, "Team cannot be deleted, the team is has been assigned to a match.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        private bool TeamExists(int id)
        {
            return _context.Teams.Any(e => e.Id == id);
        }
    }

    public partial class TeamType
    {
        public int Id { get; set; }

        public int? Skip { get; set; }

        public int? ViceSkip { get; set; }

        public int? Lead { get; set; }

        public int Leagueid { get; set; }

        public int TeamNo { get; set; }

        public short DivisionId { get; set; }
    }

    public partial class TeamTypeCreate
    {
        public int Id { get; set; }

        public int? Skip { get; set; }

        public int? ViceSkip { get; set; }

        public int? Lead { get; set; }

        public int Leagueid { get; set; }

        public int TeamNo { get; set; }

        public short DivisionId { get; set; }
    }
}
