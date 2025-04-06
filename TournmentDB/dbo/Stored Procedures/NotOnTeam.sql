CREATE procedure [dbo].[NotOnTeam]
@leagueid int
as

select p.[id]
      ,[FirstName]
      ,[LastName]
      ,[FullName]
      ,[shortname]
      ,[NickName]
      ,[Wheelchair] 

from membership m
join player p on m.id=p.MembershipId
where p.leagueid=@leagueid and p.id not in (

select distinct j.* from
(
select  p.id from membership m
join player p on p.MembershipId = m.id
join team t on t.skip = p.id
join league l on p.Leagueid = l.id
where l.id=@leagueid

union 
select  p.id from membership m
join player p on p.MembershipId = m.id
join team t on t.viceskip = p.id
join league l on p.Leagueid = l.id
where l.id=@leagueid


union 

select p.id from membership m
join player p on p.MembershipId = m.id
join team t on t.lead = p.id
join league l on p.Leagueid = l.id
where l.id=@leagueid

) j )
