Create View [dbo].[AllTeamsView]

as
SELECT T.[id]
      ,m1.fullname as [skip]
      ,m2.fullname as [ViceSkip]
      ,m3.Fullname as [Lead]
	  ,p1.id as [skipid]
      ,p2.id as [ViceSkipid]
      ,p3.id as [Leadid]
      ,T.[Leagueid]
	  ,t.DivisionId as Division
      ,[TeamNo]
  From League l
  inner join team t on t.Leagueid=l.id
  left outer join player p1 on p1.id = t.[skip]
  left outer join player p2 on p2.id = t.ViceSkip
  left outer join player p3 on p3.id = t.[lead]
  left outer join membership m1 on m1.id = p1.MembershipId
  left outer join membership m2 on m2.id = p2.MembershipId
  left outer join membership m3 on m3.id = p3.MembershipId


