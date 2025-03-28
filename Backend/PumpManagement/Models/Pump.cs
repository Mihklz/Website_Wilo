namespace PumpManagement.Models;

public class Pump
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public double MaxPressureBar { get; set; }
    public double LiquidTemperatureC { get; set; }
    public double WeightKg { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public decimal PriceRub { get; set; }

    public int? MotorId { get; set; }
    public Motor? Motor { get; set; }

    public int? HousingMaterialId { get; set; }
    public Material? HousingMaterial { get; set; }

    public int? ImpellerMaterialId { get; set; }
    public Material? ImpellerMaterial { get; set; }
}
