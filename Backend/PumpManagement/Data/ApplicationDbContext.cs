using Microsoft.EntityFrameworkCore;
using PumpManagement.Models;

namespace PumpManagement.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Material> Materials => Set<Material>();
    public DbSet<Motor> Motors => Set<Motor>();
    public DbSet<Pump> Pumps => Set<Pump>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Material>()
            .HasMany(m => m.HousingPumps)
            .WithOne(p => p.HousingMaterial)
            .HasForeignKey(p => p.HousingMaterialId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Material>()
            .HasMany(m => m.ImpellerPumps)
            .WithOne(p => p.ImpellerMaterial)
            .HasForeignKey(p => p.ImpellerMaterialId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Motor>()
            .HasMany(m => m.Pumps)
            .WithOne(p => p.Motor)
            .HasForeignKey(p => p.MotorId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
