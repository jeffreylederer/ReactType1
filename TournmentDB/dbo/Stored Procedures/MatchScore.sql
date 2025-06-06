﻿CREATE procedure [dbo].[MatchScore]
@weekid int
as
select 
dbo.TeamPlayers(l.Teamsize, m.TeamNo1) as player1,
dbo.TeamPlayers(l.Teamsize, m.TeamNo2) as player2,
m.Team1Score, m.Team2Score, m.ForFeitId, m.Rink as Rink,
t.TeamNo as teamno1, t1.TeamNo as teamno2

from match m
join team t on t.id = m.teamno1
join team t1 on t1.id = m.teamno2
inner join League l on t.Leagueid = l.id

where m.WeekId=@weekid
order by m.Rink