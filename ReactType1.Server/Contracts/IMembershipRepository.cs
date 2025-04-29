using ReactType1.Server.Models;

namespace ReactType1.Server.Contracts
{
    public interface IMembershipRepository
    {
        Task<Membership?> GetOne(int? MembershipId);

        Task<List<Membership>> Get();

        Task<Membership> Create(Membership Membership);

        Task Delete(int MembershipId);

        Task<Membership> Edit(Membership Membership);
    }
}
