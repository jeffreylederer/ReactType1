CREATE procedure [dbo].[GetTeam]
@id int
as
select t1.TeamNo as Team, t2.TeamNo as Team1, t1.Divisionid 
from match m
inner join team t1 on  m.TeamNo1=t1.id
left outer join team t2 on m.TeamNo2=t2.id
where m.id = @id