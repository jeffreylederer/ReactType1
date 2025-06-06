# Lawn Bowling League Management App

This application is built to manage multiple leagues in a lawn bowling club. 

The application can track the players, teams, and matches for multiple leagues. It is envisioned that all the leagues in a season can be managed from this application.

# Users

The user list contains all authorized users. Each user has a username which is an email address, password which is one way encrypted and whether a user is a site administrator. Only users in this list can log on to the application. Only site administrators can add, edit, and delete the user list.

The application allows user to change their password and recover lost passwords.

# Leagues

During a season, there can be one or more leagues. Each league has a name that will appear on all reports and screens associated with that league. When the league is created, the number of players on a team is specified. There can be one, two, or three players on a team. Each team in a league must have that number of players.

Site administrators can assign other users to a league. A non-site administrative user can have the following roles:

 - **League administrator** can do all the functions of an administrator but create, edit and delete leagues and users. A league administrator will only be able to manipulate items associated with that league.
   
- **Scorer** can view all items associated with that league, edit scores for matches in that league and run all reports.
   
- **Observer** can view all items associated with the league and run all reports.
   
A league cannot be deleted if there are any players or scheduled weeks assigned to that league.

Each league has the following properties:

- Team Size – how many players on each team

- Divisions - number of divisions, the default is 1 and the maximum is 2.

- Playoffs Allowed - this will allow the league administrator to select weeks in the schedule for playoffs

- Allowed Ties – if matches can end in a tie score.

- Points Count – if points scored by a team are used to help determine a team’s standing in the league

- Win Multiplier – how many points each win is worth in the standings

- Tie Multiplier – how many points each tie is worth to both teams in the standings.

- Bye Multiplier – how many points a bye is worth to the team with a bye in the standings.
- Limit Points to 20 - if checked, when calculating a teams standings a team can only be created with up to 20 points in a game.

Loses are always worth 0 points. Forfeits is a lose for the team that forfeits and a win for the other team. If point count, the other team gets 14 points.

A league’s properties can only be set when the league is created. The only property that can be changed later is the league’s title.

Standings are calculated by all the wins, ties, byes and forfeits and the total number of points (if this option is selected) so far in league play.

If points scored are allowed to help determine standings, then the total points scored in wins and losses for each team will break ties in points. The total points scored are determined with the following rules:

- A maximum of 20 points are awarded to any team for determining standings if that points limit are selected when the league is created if this option is selected.

- For byes, the team with a bye is 14 points and a win for determining standings.

- For forfeits, the team not forfeiting is awarded 14 points and a win for determining standings. The forfeiting team receives no scored points for that week and a lose. The other team gets 14 points.


# Membership

The membership list contains all active bowling members of the club. A person cannot be assigned to a league unless that person is on the membership list. A person can be given a shorten name if there are multiple players with the same first name. The person’s nickname will either be their shorten name or their first name if the shorten name is empty. Nicknames are used in reports where there is not enough room for the member’s full name. Members using wheelchairs can be specified when either creating a new member or when editing that member’s properties.

A member cannot be deleted from the membership list if that person is assigned to one or more leagues.

# Schedule

A league requires one or more scheduled weeks of play. Each week needs a date. As you add additional weeks, the add method automatically the week’s date by 7 days. A week's record can be updated to mark as cancelled; then all scores for that week are set to zero and that week is not counted in the league’s standings.

If the league allows playoffs, a week (probably the last few) can be marked as playoff weeks. During these weeks, no games will be scheduled. The league administrator can manually make up the schedules for these weeks.

A scheduled week cannot be deleted if there are one or more matches scheduled for that week.

# Players

Players are assigned to a league by selecting a member from the membership list. The same member cannot be assigned to the same league more than once. You can edit the player by selecting another player from the list of members. By making the change, that newly selected member will be automatically substituted for the original player on teams and matches.

A player cannot be deleted from a league’s player list once that player is assigned to a team.

# Teams

A league can have multiple teams. The teams consist of players assigned to that league. The number of players on a team is determined by the team size specified for that league. The application will not allow you to assign the same player to two different teams and the same player multiple times to the same team. You can edit a team to either change players or remove players from that team. Removing a player allows you to move a player to another team. If the league has multiple divisions, a team should be assigned to a division. 

A team cannot be deleted from a league once that team is scheduled for a match.

## Teams Report

This hyperlink above the list of teams will generate a printed report that shows a printable list of teams and their members.

# Create Matches

Once the teams and schedule are created, you can select the “Create Matches” menu item to create a round robin set of matches. Each team is assigned a different opponent for each scheduled week and each match is assigned a rink.

This method will not create matches if some players in the league are not assigned to a team, if some teams have empty player slots, all divisions are the same size or some matches already have been scored.

# Delete Matches

Once matches have been created, all the matches for a league can be deleted. This will allow you to add or remove teams after the matches are scheduled but before they are played. If any matches have scores, this method will not remove any matches.

# Matches

There is a list of matches for each week on that league’s schedule. Teams with players using wheelchairs will be highlighted in red. Next to each match on the list, there is an up arrow. You can use this to move teams with wheelchair players to outer rinks. This should be done before printing the league’s schedule.

From a week’s list of matches, you can specify the scores for each match. Matches cannot end in ties unless allowed by the league, but a team can forfeit a match.

## Standings Report

This hyperlink above a week’s list of matches will generate a printed report that shows results of that week’s matches and the standing so far since the first week of the league. The standing is ranking are determine by the rule give in the Leagues chapter of this document.

The standing report after the last week of the league is the final standings (except if there are playoffs.) See Standings Report  chapter for an example of this report.

## Schedule Report

This selections will generated a two part report:
- The makeup of all the teams in the league. If the league has mulitple divisions, the team listing will include the division of each team.
- A grid of matches where the lines are the weeks and the columns are the rinks and the cells are the team numbers of each game.

## Score Card Report

This hyperlink above a week’s list of matches will generate a printed report that shows the list of match team pairs that can be used to generated individual score cards. This should aid in making up the score cards for that week.
