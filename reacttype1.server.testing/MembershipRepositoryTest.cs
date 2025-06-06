﻿using ReactType1.Server.Contracts;
using ReactType1.Server.Models;
using ReactType1.Server.Repository;

// https://medium.com/@kaashok1993/net-6-web-api-mocking-dbcontext-dbset-using-moq-48d9e4929089
public class MembershipRepositoryTest : IDisposable
{
    private readonly IMembershipRepository membershipRepository;
    private readonly SetupMembershipRepository service;

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
        var lstData = await membershipRepository.Get();


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
        Membership? data = await membershipRepository.GetOne(id);

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

        await Assert.ThrowsAsync<System.ArgumentException>(() => membershipRepository.Create(membership));
    }

    [Fact]
    public async Task UpdateMembership()
    {
        //Arrange
        int id = 2;
        Membership? actualData = await membershipRepository.GetOne(id);
        if (actualData != null)
        {
            actualData.FirstName = "Fred";

            //Act
            Membership expectedData = await membershipRepository.Edit(actualData);

            //Assert
            Assert.Multiple(() =>
            {
                Assert.NotNull(expectedData);
                Assert.Equal(expectedData, actualData);
            });

            actualData.Id = 10;
            await Assert.ThrowsAsync<System.InvalidOperationException>(() => membershipRepository.Edit(actualData));
        }
        Assert.NotNull(actualData);
    }

    [Fact]
    public async Task DeleteMembership()
    {
        //Arrange
        int id = 2;


        //Act
        await membershipRepository.Delete(id);


        //Assert
        Membership? item= await membershipRepository.GetOne(id);

        Assert.Null(item);

        await Assert.ThrowsAsync<Exception>(() => membershipRepository.Delete(2));
    }
}

