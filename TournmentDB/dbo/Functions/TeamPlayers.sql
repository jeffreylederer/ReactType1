
CREATE FUNCTION [dbo].[TeamPlayers]
(
	@Teamsize int,
	@TeamId int
)
RETURNS varchar(50)
AS
BEGIN
Declare @players varchar(50)
select @players =
case
	when @TeamSize = 1 then m1.NickName
	when @TeamSize = 2 then m1.NickName + ', ' + m3.NickName
	else  m1.NickName + ', ' + m2.NickName + ', ' + m3.NickName

end 

from team t
join player p1 on t.Skip = p1.Id
left outer join player p2 on t.ViceSkip = p2.Id
left outer join player p3 on t.Lead = p3.Id
inner join Membership m1 on m1.id = p1.MembershipId
left join Membership m2 on m2.id = p2.MembershipId
left join Membership m3 on m3.id = p3.MembershipId
where t.id = @TeamId

return @players
END


