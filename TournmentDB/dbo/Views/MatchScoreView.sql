


CREATE view [dbo].[MatchScoreView]
as
select 
dbo.TeamPlayers(l.Teamsize, m.TeamNo1) as player1,
dbo.TeamPlayers(l.Teamsize, m.TeamNo2) as player2,
m.Team1Score, m.Team2Score, m.ForFeitId, m.Rink+1 as Rink,
t.TeamNo as teamno1, t1.TeamNo as teamno2

from match m
join team t on t.id = m.teamno1
join team t1 on t1.id = m.teamno2
inner join League l on t.Leagueid = l.id




