namespace PumpManagement.Models;

public class Motor
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public double PowerKw { get; set; }
    public double CurrentA { get; set; }
    public int SpeedRpm { get; set; }
    public string? Description { get; set; }
    public decimal PriceRub { get; set; }

    public ICollection<Pump>? Pumps { get; set; }
}
