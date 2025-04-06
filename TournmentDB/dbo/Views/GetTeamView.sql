
CREATE View [dbo].[GetTeamView]
as
select t1.TeamNo as Team, t2.TeamNo as Team1,t1.DivisionId
from match m
inner join team t1 on  m.TeamNo1=t1.id
inner join team t2 on m.TeamNo2=t2.id
