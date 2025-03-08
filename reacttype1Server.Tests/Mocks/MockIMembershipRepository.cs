
internal class MockIMembershipRepository
{
    public static Mock<IMembershipRepository> GetMock()
    {
        var mock = new Mock<IMembershipRepository>();
        var Memberships = new List<Membership>()
        {
            new Membership()
            {
                 FirstName = "John",
                LastName = "Doe",
                ShortName = "JD",
                Wheelchair=true
            }
        };
        // Set up
      
        return mock;
    }

}