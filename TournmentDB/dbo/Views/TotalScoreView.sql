CREATE View dbo.TotalScoreView

as

select m.Team1Score + m.Team2Score + m.ForFeitId as total, m.id from match m
inner join team t1 on m.TeamNo1 = t1.id
inner join team t2 on m.TeamNo2 = t2.id
