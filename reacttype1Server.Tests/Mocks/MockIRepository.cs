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
        mock.Setup(m => m.Get()).Returns(() => Memberships);
        mock.Setup(m => m.GetOne(It.IsAny<int>()))
            .Returns((int id) => Memberships.FirstOrDefault(o => o.Id == id));
        mock.Setup(m => m.Create(It.IsAny<Membership>()))
            .Callback(() => { return; });
        mock.Setup(m => m.Edit(It.IsAny<Membership>()))
           .Callback(() => { return; });
        mock.Setup(m => m.Delete(It.IsAny<Membership>()))
           .Callback(() => { return; });
        return mock;
    }
}