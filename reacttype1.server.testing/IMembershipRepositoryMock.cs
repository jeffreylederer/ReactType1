
using ReactType1.Server.Contracts;
using ReactType1.Server.Models;
using ReactType1.Server.Repository;


public class IMembershipRepositoryMock
{
    public static IMembershipRepository GetMock()
    {
        List<Membership> lstUser = GenerateTestData();
        var dbContextMock = DbContextMock.GetMock<Membership, DbLeagueApp>(lstUser, x => x.Memberships);
        return new MembershipRepository(dbContextMock);
    }

    private static List<Membership> GenerateTestData()
    {
        var myEntities = new List<Membership>()
        {
            new Membership() {  Id = 1, FirstName = "John", LastName = "Doe", FullName = "John Doe", Shortname = "JD", NickName = "Johnny", Wheelchair = false },
            new Membership() {  Id = 2, FirstName = "Jack", LastName = "Doe", FullName = "John Doe", Shortname = "JD", NickName = "Johnny", Wheelchair = false },
            new Membership() {  Id = 3, FirstName = "Mary", LastName = "Doe", FullName = "John Doe", Shortname = "JD", NickName = "Johnny", Wheelchair = false }
        };
        return myEntities;
    }
}