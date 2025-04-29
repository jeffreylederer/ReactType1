using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using ReactType1.Server.Code;
using ReactType1.Server.Models;
using System.Text;

// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController(DbLeagueApp context, IConfiguration configuration) : ControllerBase
    {
        private readonly DbLeagueApp _context= context;
        private readonly IConfiguration _configuration= configuration;

        
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
        [HttpGet("GetAllMatches/{id}")]
        public int GetAllMatches(int id)
        {
            var query =from m in _context.Matches
            join s in _context.Schedules 
            on  m.WeekId equals s.Id
            where s.Leagueid == id && m.Rink != -1
            select new
            {
               m.Id
            };
            var count =  query.ToList().Count;
            return count;
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
            var site = _configuration.GetValue<string>("SiteInfo:clubname")??"Unknown club";
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
                SqlParameter[] parameters = [
                    new("matchid", id)
                ];
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
            if (id != item.Id)
            {
                return BadRequest();
            }

            var match = _context.Matches.Find(id);
            if (match == null)
            {
                return NotFound();
            }
            match.Team1Score = item.Team1Score;
            match.Team2Score = item.Team2Score;
            match.ForFeitId = item.Forfeit;
           

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
            Schedule? schedule = _context.Schedules.Find(id);
            League? league = _context.Leagues.Find(schedule?.Leagueid);
            QuestPDF.Settings.License = LicenseType.Community;
            string results = "";
            if (league != null && league.PointsCount)
            {
                var report = new StandingsReport();
                var site = _configuration.GetValue<string>("SiteInfo:clubname") ?? "Unknown club";
                var document = report.CreateDocument(id.Value, _context, site);
                byte[] pdfBytes = document.GeneratePdf();
                results = Convert.ToBase64String(pdfBytes);
            }
            else
            {

                var report = new StandingsNoPoinrsReport();
                var site = _configuration.GetValue<string>("SiteInfo:clubname") ?? "Unknown club";
                var document = report.CreateDocument(id.Value, _context, site);
                byte[] pdfBytes1 = document.GeneratePdf();
                results = Convert.ToBase64String(pdfBytes1);
            }
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
            var site = _configuration.GetValue<string>("SiteInfo:clubname") ?? "Unknown club";
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
            var site = _configuration.GetValue<string>("SiteInfo:clubname") ?? "Unknown club";
            var report = new ScheduleReport();
            try
            {
                var document = report.CreateDocument(id.Value, _context, site);
                byte[] pdfBytes = document.GeneratePdf();
                var results = Convert.ToBase64String(pdfBytes);
                return results;
            }
            catch (Exception ex)
            {
                StringBuilder str = new(ex.Message);
                while (ex.InnerException != null) {
                    str.Append(", " +ex.InnerException.Message);
                    ex = ex.InnerException;
                }
                return $"Exception: {str.ToString()}";
            }
        }

        [HttpGet("ClearSchedule/{id}")]
        public async Task<IActionResult> ClearSchedule(int? id)
        {
            if (id == null)
            {
                return StatusCode(500, "Bad value");
            }

            var list = _context.Matches
             .Join(
                  _context.Schedules,
                  match => match.WeekId,
                  schedule => schedule.Id,
                  (match, schedule) => new
                  {
                      match.Id,
                      schedule.Leagueid,
                      score = match.Team2Score + match.Team1Score + match.ForFeitId,
                      match.Rink
                  }
                )
              .Where(x => x.Leagueid == id )
             .ToList();

            if(list.Count == 0)
                return Ok();
        
            if (list.Any(x => x.score > 0))
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
            if (weeks.Count == 0)
            {
                return StatusCode(500, "No weeks scheduled");
            }
            if (teams.Count == 0)
            {
                return StatusCode(500, "No teams have been created");
            }
            var list = await _context.TotalScoreViews
                    .FromSql($"EXEC TotalScore {id}")
                   .ToListAsync();
            if (list.Count > 0)
            {
                return StatusCode(500, "Matches exist, clear schedule first");
            }

            var sl = new CreateScheduleList();
            List<CalculatedMatch> matches = [];
            if (league?.Divisions == 1)
            {
                matches = sl.RoundRobin(weeks.Count, teams.Count);
            }
            else
            {
                matches = sl.matchesWithDivisions(weeks.Count, _context, id.Value);
            }
            if (teams != null)
            { 
                foreach (var item in matches)
                {
                    var TeamNo1 = teams.Find(x => x.TeamNo == item.Team1 + 1);
                    var TeamNo2 = teams.Find(x => x.TeamNo == item.Team2 + 1);
                    var match = new Match()
                    {
                        WeekId = weeks[item.Week].Id,
                        Rink = item.Rink,
                        TeamNo1 = TeamNo1== null ? 0 : TeamNo1.Id,
                        TeamNo2 = TeamNo2 == null? 0 : TeamNo2.Id,
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
            return BadRequest();
        }


        private bool MatchExists(int id)
        {
            return _context.Matches.Any(e => e.Id == id);
        }
    }

    public class MatchType
    {
        public int Id { get; set; }
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
        public int Forfeit { get; set; }

    }

}
