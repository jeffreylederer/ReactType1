CREATE procedure [dbo].[TotalScore]
@id int
as

select m.Team1Score + m.Team2Score + m.ForFeitId as total, m.id from match m
inner join team t1 on m.TeamNo1 = t1.id
inner join schedule s on s.id = m.WeekId
where t1.Leagueid=@id and m.rink <> -1