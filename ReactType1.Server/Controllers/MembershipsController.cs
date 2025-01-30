using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Models;

// https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934
namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembershipsController : ControllerBase
    {
        private readonly DbLeagueApp _context;

        public MembershipsController(DbLeagueApp context)
        {
            _context = context;
        }

        // GET: Memberships
        [HttpGet]
        public async Task<IEnumerable<Membership>> Get()
        {
            var list = await _context.Memberships.ToListAsync();
            list.Sort((a, b) => a.LastName.CompareTo(b.LastName));
            return list;
        }

        // GET: Memberships/Details/5
        [HttpGet("{id}")]
        public async Task<Membership?> Get(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var membership = await _context.Memberships.FindAsync(id.Value);
            if (membership == null)
            {
                return null;
            }

            return membership;
        }




        
        [HttpPost]
        public async Task Create(Membership item)
        {
            _context.Memberships.Add(item);
            await _context.SaveChangesAsync();

           
        }



        // POST: Memberships/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[ValidateAntiForgeryToken]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, Membership item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembershipExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return NoContent();
        }


        // GET: Memberships/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Memberships.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Memberships.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException)
            {
                return StatusCode(409, "Member cannot be deleted, the member is already assign to a league.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        private bool MembershipExists(int id)
        {
            return _context.Memberships.Any(e => e.Id == id);
        }
    }
}
