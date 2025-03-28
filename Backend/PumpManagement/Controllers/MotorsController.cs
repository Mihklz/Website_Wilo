using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PumpManagement.Data;
using PumpManagement.Models;

namespace PumpManagement.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MotorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MotorsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/motors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Motor>>> GetMotors()
    {
        return await _context.Motors
            .Include(m => m.Pumps)
            .ToListAsync();
    }


    // GET: api/motors/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Motor>> GetMotor(int id)
    {
        var motor = await _context.Motors
            .Include(m => m.Pumps)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (motor == null)
        {
            return NotFound();
        }

        return motor;
    }


    // POST: api/motors
    [HttpPost]
    public async Task<ActionResult<Motor>> PostMotor(Motor motor)
    {
        _context.Motors.Add(motor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMotor), new { id = motor.Id }, motor);
    }

    // PUT: api/motors/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMotor(int id, Motor motor)
    {
        if (id != motor.Id)
        {
            return BadRequest();
        }

        _context.Entry(motor).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MotorExists(id))
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

    // DELETE: api/motors/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMotor(int id)
    {
        var motor = await _context.Motors.FindAsync(id);
        if (motor == null)
        {
            return NotFound();
        }

        _context.Motors.Remove(motor);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MotorExists(int id)
    {
        return _context.Motors.Any(e => e.Id == id);
    }
}
