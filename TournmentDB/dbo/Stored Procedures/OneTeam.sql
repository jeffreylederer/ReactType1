CREATE procedure [dbo].[OneTeam]
@teamid int
as
SELECT T.[id]
      ,isNull(m1.NickName,'') as [skip]
      ,isNull(m2.NickName,'') as [ViceSkip]
      ,isNull(m3.NickName,'') as [Lead]
	  ,isNull(p1.id,0) as [skipid]
      ,isNull(p2.id,0) as [ViceSkipid]
      ,isNull(p3.id,0) as [Leadid]
      ,T.[Leagueid]
	  ,t.DivisionId as Division
      ,[TeamNo]
  FROM [dbo].[Team] t
  left outer join player p1 on p1.id = t.[skip]
  left outer join player p2 on p2.id = t.ViceSkip
  left outer join player p3 on p3.id = t.[lead]
  left outer join membership m1 on m1.id = p1.MembershipId
  left outer join membership m2 on m2.id = p2.MembershipId
  left outer join membership m3 on m3.id = p3.MembershipId
  where t.id = @teamid

