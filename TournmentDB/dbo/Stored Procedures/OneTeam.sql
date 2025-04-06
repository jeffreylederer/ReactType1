CREATE procedure [dbo].[OneTeam]
@teamid int
as
SELECT T.[id]
      ,m1.NickName as [skip]
      ,m2.NickName as [ViceSkip]
      ,m3.NickName as [Lead]
	  ,p1.id as [skipid]
      ,p2.id as [ViceSkipid]
      ,p3.id as [Leadid]
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

