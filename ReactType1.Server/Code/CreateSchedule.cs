
using ReactType1.Server.Models;

namespace ReactType1.Server.Code
{
    public class CreateScheduleList
    {
        private const int BYE = -1;

        /// <summary>
        /// It uses a week robin algoritm to generate the schedule.
        /// </summary>
        /// <param name="Weeks">number of weeks for this league</param>
        /// <param name="numTeams">number of teams in this league</param>
        /// <returns>Generates a list of matches. Each list has a week number, rink number, team 1 number and team 2 number. If the
        /// number of teams are odd, a bye week game is created with a rink of -1 and both teams are the same.</returns>
        public List<CalculatedMatch> RoundRobin(int Weeks, int numTeams)
        {
           
            List<CalculatedMatch> schedule = new ();
            // Create a list of teams
            List<int> teams = new List<int>();
            for (int i = 0; i < numTeams; i++)
            {
                teams.Add(i);
            }

            // If the number of teams is odd, add a dummy team
            if (numTeams % 2 != 0)
            {
                teams.Add(-1); // Dummy team represented by -1
                numTeams++;
            }

            int numofRinks = numTeams / 2;
            
            // Generate schedule for each week
            for (int week = 0; week < Weeks; week++)
            {
                int rink = 0;
                for (int i = 0; i < numofRinks; i++)
                {
                    int team1 = teams[i];
                    int team2 = teams[numTeams - 1 - i];

                    // Skip dummy team matches
                    if (team1 != -1 && team2 != -1)
                    {
                        schedule.Add(new CalculatedMatch()
                        {
                            Week = week,
                            Rink = (week + rink) % numofRinks,
                            Team1 = team1,
                            Team2 = team2
                        });
                        rink++;
                    }
                    else if (team1 == -1)
                    {
                        schedule.Add(new CalculatedMatch()
                        {
                            Week = week,
                            Rink = -1,
                            Team1 = team2,
                            Team2 = team2
                        });
                    }
                    else
                    {
                        schedule.Add(new CalculatedMatch()
                        {
                            Week = week,
                            Rink = -1,
                            Team1 = team1,
                            Team2 = team1
                        });
                    }
                }

                // Rotate teams for next week
                teams.Insert(1, teams[numTeams - 1]);
                teams.RemoveAt(numTeams);
            }
            return schedule;
        }

        public List<CalculatedMatch> matchesWithDivisions(int weeks, DbLeagueApp db, int leagueid)
        {
            var teams = db.Teams.Where(x=>x.Leagueid==leagueid).ToList();
            var teamsinDivision1 = teams.Count(x => x.DivisionId == 1);
            var teamsinDivision2 = teams.Count(x => x.DivisionId == 2);
            List<CalculatedMatch> x1 = RoundRobin(weeks, teamsinDivision1);
            List<CalculatedMatch> x2 = RoundRobin(weeks, teamsinDivision2);
            foreach(var item in x2)
            {
                item.Rink += teamsinDivision1;
                item.Team1 += teamsinDivision1;
                item.Team2 += teamsinDivision1;
                x1.Add(item);
            }
            return x1;
        }

        /// <summary>
        /// This is called to generate matches for leagues with multiple divisions. It will fill in weeks after the week robin play with
        /// inter divisional matches. If the number of teams is not divisible by 4, it will schedule inter divisional matches on bye weeks.
        /// </summary>
        /// <param name="weeks">number of weeks not counting playoffs</param>
        /// <param name="numberOfTeams">number of teams in the league. It must be divisible by 2</param>
        /// <returns>Generates a list of matches. Each list has a week number, rink number, team 1 number and team 2 number.
        /// </returns>
        
    }

    public class CalculatedMatch
    {
        public int Week;
        public int Rink;
        public int Team1;
        public int Team2;

    }
}