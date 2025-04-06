using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactType1.Server.Models;


namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RinkOrdersController(DbLeagueApp context) : ControllerBase
    {
        private readonly DbLeagueApp _context = context;

        // GET: RinkOrder
        [HttpGet]
        public async Task<IEnumerable<RinkOrder>?> Get()
        {
            try
            {
                var list = await _context.RinkOrders.ToArrayAsync();
                return list;
            }
            catch(Exception)
            {
                return null;
            }
        }



        // GET: RinkOrders/Details/5
        [HttpGet("{id}")]
        public async Task<RinkOrder?> Details(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var RinkOrder = await _context.RinkOrders.FindAsync(id.Value);
            if (RinkOrder == null)
            {
                return null;
            }
            return RinkOrder;

        }

        // GET: RinkOrders/Create
        [HttpPost]
        public async Task Create(RinkOrder item)
        {
            try
            {
                _context.RinkOrders.Add(item);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
               var message = ex.ToString();
            }


        }

        // GET: RinkOrders/Edit/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, RinkOrder item)
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
                if (!RinkOrderExists(id))
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

        // GET: RinkOrders/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.RinkOrders.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.RinkOrders.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        private bool RinkOrderExists(int id)
        {
            return _context.RinkOrders.Any(e => e.Id == id);
        }
    }
}
