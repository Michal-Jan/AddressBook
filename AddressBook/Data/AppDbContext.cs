using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Data;

public class AppDbContext : DbContext
{
    public DbSet<Person> Persons { get; set; }
    public DbSet<Email> Emails { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(eb =>
        {
            eb.Property(p => p.FirstName)
                .IsRequired()
                .HasMaxLength(50);
            eb.Property(p => p.LastName)
                .IsRequired()
                .HasMaxLength(50);

            eb.HasMany(p => p.Emails)
            .WithOne(e => e.Person)
            .HasForeignKey(e => e.PersonId);
        });

        modelBuilder.Entity<Email>()
            .Property(e => e.EmailAddress)
            .IsRequired()
            .HasMaxLength(50);
    }
}
