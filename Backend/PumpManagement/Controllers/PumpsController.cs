using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PumpManagement.Data;
using PumpManagement.Models;

namespace PumpManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PumpsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PumpsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/pumps
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pump>>> GetPumps()
    {
        return await _context.Pumps
            .Include(p => p.Motor)
            .Include(p => p.HousingMaterial)
            .Include(p => p.ImpellerMaterial)
            .ToListAsync();
    }

    // GET: api/pumps/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Pump>> GetPump(int id)
    {
        var pump = await _context.Pumps
            .Include(p => p.Motor)
            .Include(p => p.HousingMaterial)
            .Include(p => p.ImpellerMaterial)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pump == null)
        {
            return NotFound();
        }

        return pump;
    }

    // POST: api/pumps
    [HttpPost]
    public async Task<ActionResult<Pump>> PostPump(Pump pump)
    {
        _context.Pumps.Add(pump);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPump), new { id = pump.Id }, pump);
    }

    // PUT: api/pumps/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPump(int id, Pump pump)
    {
        if (id != pump.Id)
        {
            return BadRequest();
        }

        _context.Entry(pump).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PumpExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/pumps/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePump(int id)
    {
        var pump = await _context.Pumps.FindAsync(id);
        if (pump == null)
        {
            return NotFound();
        }

        _context.Pumps.Remove(pump);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PumpExists(int id)
    {
        return _context.Pumps.Any(e => e.Id == id);
    }
}
