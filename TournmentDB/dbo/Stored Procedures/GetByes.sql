CREATE procedure [dbo].[GetByes]
@leagueid int
as


SELECT distinct T.[id]
      ,dbo.TeamPlayers(l.teamsize,t.id) as Players
	  ,t.DivisionId as Division
      ,[TeamNo]
	  ,S.GameDate
 from league l
 inner join schedule s on s.Leagueid =l.id
 inner join match m on m.WeekId = s.id
 inner join team t on t.id = m.TeamNo1
 where l.id = @leagueid and m.rink=-1
 order by GameDate