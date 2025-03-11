using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Contracts;
using ReactType1.Server.Models;
using ReactType1.Server.Repository;

public class SetupMembershipRepository : IDisposable
{
    private DbLeagueApp context;
    public  IMembershipRepository GetRepository()
    {

        var builder = new DbContextOptionsBuilder<DbLeagueApp>();
        builder.UseInMemoryDatabase(databaseName: "LibraryDbInMemory");

        var dbContextOptions = builder.Options;
        context = new DbLeagueApp(dbContextOptions);

        // Insert seed data into the database using one instance of the context
        
            if (context.Memberships.Count() == 0)
            {
                context.Memberships.Add(new Membership { Id = 1, FirstName = "John", LastName = "Doe", FullName = "John Doe", Shortname = "JD", NickName = "Johnny", Wheelchair = false });
                context.Memberships.Add(new Membership { Id = 2, FirstName = "Jack", LastName = "Doe", FullName = "John Doe", Shortname = "JD", NickName = "Johnny", Wheelchair = false });
                context.Memberships.Add(new Membership { Id = 3, FirstName = "Mary", LastName = "Doe", FullName = "John Doe", Shortname = "JD", NickName = "Johnny", Wheelchair = false });
                context.SaveChanges();
            }




        // Use a clean instance of the context to run the test

        IMembershipRepository repository = new MembershipRepository(context);
        return repository;
    }

    public void Dispose()
    {
        context.Database.EnsureDeleted(); 
    }   

}