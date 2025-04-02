using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using ReactType1.Server.Code;
using ReactType1.Server.Models;
using System.Configuration;

// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly DbLeagueApp _context;
        private readonly IConfiguration _configuration;

        public MatchesController(DbLeagueApp context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: Matches
        [HttpGet("{id}")]
        public async Task<IEnumerable<OneMatchWeekView>?> Get(int id)
        {
            var list = await _context.OneMatchWeekViews
                     .FromSql($"EXEC OneMatchWeek {id}")
                    .ToListAsync();
            return list;
        }

        // GET: Matches
        [HttpGet("Reorder{id}")]
        public async Task<IActionResult> GetReorder(int id)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match == null)
                return NotFound();
            var weekMatches = _context.Matches.Where(x => x.WeekId == match.WeekId);
            var match1 = weekMatches.First(x => x.Rink == match.Rink - 1);
            match1.Rink = match.Rink;
            match.Rink = match1.Rink - 1;
            _context.Entry(match).State = EntityState.Modified;
            try
            {
               _context.SaveChanges();
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }


            return Ok();
        }

        // GET: Matches
        [HttpGet("Byes/{id}")]
        public String Byes(int id)
        {
            
            QuestPDF.Settings.License = LicenseType.Community;
            var report = new ByesReport();
            var site = _configuration.GetValue<string>("SiteInfo:clubname");
            var document = report.CreateDocument(id, _context, site);
            byte[] pdfBytes = document.GeneratePdf();
            var results = Convert.ToBase64String(pdfBytes);
            return results;
        }

        // GET: Matches/Details/5
        [HttpGet("getOne/{id}")]
        public OneMatchWeekView? Get(int? id)
        {
            if (id == null)
            {
                return null;
            }
            try
            {
                SqlParameter[] parameters = {
                    new SqlParameter("matchid", id)
                };
                var match =  _context.OneMatchWeekViews
                         .FromSqlRaw("EXEC OneMatch @matchid", parameters)
                         .AsEnumerable()
                         .FirstOrDefault();
                if (match == null)
                {
                    return null;
                }
                return match;
            }
            catch(Exception)
            {
                
            }
            return null;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, MatchType item)
        {
            if (id != item.id)
            {
                return BadRequest();
            }

            var match = _context.Matches.Find(id);
            if (match == null)
            {
                return NotFound();
            }
            match.Team1Score = item.team1Score;
            match.Team2Score = item.team2Score;
            match.ForFeitId = item.forFeitId;

            _context.Entry(match).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
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
            
        }

        // GET: Players/Details/5
        [HttpGet("Standings/{id}")]
        public string? Standings(int? id)
        {
            if (id == null)
            {
                return null;
            }
            QuestPDF.Settings.License = LicenseType.Community;
            var report = new StandingsReport();
            var site = _configuration.GetValue<string>("SiteInfo:clubname");
            var document = report.CreateDocument(id.Value, _context,site);
            byte[] pdfBytes = document.GeneratePdf();
            var results = Convert.ToBase64String(pdfBytes);
            return results;
        }

        [HttpGet("ScoreCard/{id}")]
        public string? ScoreCard(int? id)
        {
            if (id == null)
            {
                return null;
            }
            QuestPDF.Settings.License = LicenseType.Community;
            var site = _configuration.GetValue<string>("SiteInfo:clubname");
            var report = new ScorecardReport();
            var document = report.CreateDocument(id.Value, _context, site);
            byte[] pdfBytes = document.GeneratePdf();
            var results = Convert.ToBase64String(pdfBytes);
            return results;
        }

        [HttpGet("ScheduleReport/{id}")]
        public string? ScheduleReport(int? id)
        {
            if (id == null)
            {
                return null;
            }
            QuestPDF.Settings.License = LicenseType.Community;
            var site = _configuration.GetValue<string>("SiteInfo:clubname");
            var report = new ScheduleReport();
            var document = report.CreateDocument(id.Value, _context, site);
            byte[] pdfBytes = document.GeneratePdf();
            var results = Convert.ToBase64String(pdfBytes);
            return results;
        }

        [HttpGet("ClearSchedule/{id}")]
        public async Task<IActionResult> ClearSchedule(int? id)
        {
            if (id == null)
            {
                return StatusCode(500, "Bad value");
            }
            var list = await _context.TotalScoreViews
                     .FromSql($"EXEC TotalScore {id}")
                    .ToListAsync();
            if (list.Count() == 0)
            {
                return Ok();
            }
            if (list.Any(x => x.Total > 0))
            {
                return  StatusCode(500, "Matches cannot be delete, some matches have scores");
            }
            
            try
            {

                foreach (var item in list)
                {
                    Match? match = await _context.Matches.FindAsync(item.Id);
                    if (match != null)
                    {
                        _context.Matches.Remove(match);
                    }
                }

                
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                 return StatusCode(500, $"Matches were not removed, Error: {e.Message}"); ;
            }

            return Ok();
        }

        [HttpGet("CreateSchedule/{id}")]
        public async Task<IActionResult> CreateSchedule(int? id)
        {
            if (id == null)
            {
                return StatusCode(500, "Bad value");
            }

            var league = _context.Leagues.Find(id);
            var weeks = _context.Schedules.Where(x => x.Leagueid == id).ToList(); 
            var teams = _context.Teams.Where(x => x.Leagueid == id).ToList();
            if (weeks.Count() == 0)
            {
                return StatusCode(500, "No weeks scheduled");
            }
            if (teams.Count() == 0)
            {
                return StatusCode(500, "No teams have been created");
            }
            var list = await _context.TotalScoreViews
                    .FromSql($"EXEC TotalScore {id}")
                   .ToListAsync();
            if(list.Count() > 0)
            {
                return StatusCode(500, "Matches exist, clear schedule first");
            }

            var sl = new CreateScheduleList();
            List< CalculatedMatch > matches = new List<CalculatedMatch>();
            if(league.Divisions == 1)
            {
                matches = sl.RoundRobin(weeks.Count(), teams.Count());
            }
            else
            {
                matches = sl.matchesWithDivisions(weeks.Count(), teams.Count());
            }

            foreach(var item in matches)
            {
                var match = new Match()
                {
                    WeekId = weeks[item.Week].Id,
                    Rink = item.Rink,
                    TeamNo1 = teams.Find(x => x.TeamNo == item.Team1+1).Id,
                    TeamNo2 = teams.Find(x => x.TeamNo == item.Team2+1).Id,
                    Team1Score = 0,
                    Team2Score = 0,
                    ForFeitId = 0
                };
                _context.Matches.Add(match);
            }


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Could not create matches: {e.Message}");
            }
            return Ok();
        }


        private bool MatchExists(int id)
        {
            return _context.Matches.Any(e => e.Id == id);
        }
    }

    public class MatchType
    {
        public int id { get; set; }
        public int team1Score { get; set; }
        public int team2Score { get; set; }
        public int forFeitId { get; set; }
    }

}
