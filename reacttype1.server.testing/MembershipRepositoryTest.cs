using ReactType1.Server.Models;


public class MembershipRepositoryTest
{
   

    [Fact]
    public async Task GetMemberships()
    {
        //Arrange
        var membershipRepository = IMembershipRepositoryMock.GetMock();

        //Act
        IList<Membership> lstData = await membershipRepository.Get();


        //Assert
        Assert.Multiple(() =>
        {
            Assert.NotEmpty(lstData);
            Assert.Equal(3, lstData.Count);
            
        });
    }

    [Fact]
    public async Task GetMembershipById()
    {
        //Arrange
        var membershipRepository = IMembershipRepositoryMock.GetMock();
        int id = 1;

        //Act
        Membership data = await membershipRepository.GetOne(id);

        //Assert
        Assert.Multiple(() =>
        {
            Assert.NotNull(data);
            Assert.Equal(id, data.Id);
        });
    }

    [Fact]
    public async Task AddMembership()
    {
        //Arrange
        var membershipRepository = IMembershipRepositoryMock.GetMock();
        Membership membership = new Membership() { Id = 4, FirstName = "Sam", LastName = "Doe", FullName = "John Doe", Shortname = "JD", NickName = "Johnny", Wheelchair = false };

        //Act
        Membership data = await membershipRepository.Create(membership);
       

        //Assert
        Assert.Multiple(() =>
        {
            Assert.NotNull(data);
            Assert.Equal(4, data.Id);
        });
    }

    [Fact]
    public async Task UpdateMembership()
    {
        //Arrange
        var membershipRepository = IMembershipRepositoryMock.GetMock();
        int id = 2;
        Membership actualData = await membershipRepository.GetOne(id);
        actualData.FirstName = "Fred";

        //Act
        Membership expectedData = await  membershipRepository.Edit(actualData);
        
        //Assert
        Assert.Multiple(() =>
        {
              Assert.NotNull(expectedData);
              Assert.Equal(expectedData, actualData);
        });
    }

    [Fact]
    public async Task DeleteMembership()
    {
        //Arrange
        var membershipRepository = IMembershipRepositoryMock.GetMock();
        int id = 2;


        //Act
        await membershipRepository.Delete(id);
        

        //Assert
        await Assert.ThrowsAsync<Exception>(async () => await membershipRepository.GetOne(id));
    }
}

