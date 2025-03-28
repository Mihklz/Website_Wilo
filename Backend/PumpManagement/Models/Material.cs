namespace PumpManagement.Models;

public class Material
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public ICollection<Pump>? HousingPumps { get; set; }
    public ICollection<Pump>? ImpellerPumps { get; set; }
}
