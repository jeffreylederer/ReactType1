using ReactType1.Server.Models;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Contracts;

namespace ReactType1.Server.Repository
{
    public class MembershipRepository : IMembershipRepository
    {
        private readonly DbLeagueApp _context;

        public MembershipRepository(DbLeagueApp context)
        {
            this._context = context;
        }

        public async Task<List<Membership>> Get()
        {
            return await _context.Set<Membership>().ToListAsync();
        }

        public async Task<Membership?> GetOne(int? id)
        {
            if (id == null)
            {
                return null;
            }
            return await this._context.Memberships.FindAsync(id);
        }

        public async Task<Membership>Create(Membership membership)
        {
            await this._context.Memberships.AddAsync(membership);
            await this._context.SaveChangesAsync();
            return membership;
        }

        public async Task Delete(int id)
        {
            var membership = await GetOne(id);

            if (membership is null)
            {
                throw new Exception($"membershipID {id} is not found.");
            }
            this._context.Set<Membership>().Remove(membership);
            await _context.SaveChangesAsync();
        }

        public async Task<Membership> Edit(Membership membership)
        {
            _context.Update(membership);
            await _context.SaveChangesAsync();
            return membership;
        }

    }
}
