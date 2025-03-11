using ReactType1.Server.Contracts;
using ReactType1.Server.Models;
using ReactType1.Server.Repository;

// https://medium.com/@kaashok1993/net-6-web-api-mocking-dbcontext-dbset-using-moq-48d9e4929089
public class MembershipRepositoryTest : IDisposable
{
    private IMembershipRepository membershipRepository;
    private SetupMembershipRepository service;

    public MembershipRepositoryTest()
    {
        service = new SetupMembershipRepository();
        membershipRepository = service.GetRepository();
    }

    public void Dispose()
    {
        service.Dispose();
    }   

    [Fact]
    public async Task GetMemberships()
    {
        //Arrange
        

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
        int id = 2;


        //Act
        await membershipRepository.Delete(id);


        //Assert
        var item = await membershipRepository.GetOne(id);

        Assert.Null(item);
    }
}

