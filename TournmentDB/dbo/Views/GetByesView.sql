
CREATE view [dbo].[GetByesView]
as
SELECT T.[id]
      ,dbo.TeamPlayers(l.teamsize,t.id) as players
	  ,t.DivisionId as Division
      ,[TeamNo]
	  ,S.GameDate
 from league l
 inner join schedule s on s.Leagueid =l.id
 inner join match m on m.WeekId = s.id
 inner join team t on t.id = m.TeamNo1


