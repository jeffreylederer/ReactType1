CREATE procedure dbo.GetByes
@leagueid int
as

SELECT T.[id]
      ,m1.NickName as [skip]
      ,m2.NickName as [ViceSkip]
      ,m3.NickName as [Lead]
	  ,t.DivisionId as Division
      ,[TeamNo]
	  ,S.GameDate
  from schedule s
  join match m on m.weekid = s.id
  join team t on m.TeamNo1 = t.id
  left outer join player p1 on p1.id = t.[skip]
  left outer join player p2 on p2.id = t.ViceSkip
  left outer join player p3 on p3.id = t.[lead]
  left outer join membership m1 on m1.id = p1.MembershipId
  left outer join membership m2 on m2.id = p2.MembershipId
  left outer join membership m3 on m3.id = p3.MembershipId
  where rink=-1 and s.leagueid=@leagueid
  order by S.GameDate
