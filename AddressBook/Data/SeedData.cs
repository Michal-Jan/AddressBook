using AddressBook.Entities;
using Bogus;

namespace AddressBook.Data
{
    public class SeedData
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Persons.Any())
            {
                return;
            }

            var peopleGenerator = new Faker<Entities.Person>()
                .RuleFor(p => p.FirstName, f => f.Name.FirstName())
                .RuleFor(p => p.LastName, f => f.Name.LastName())
                .RuleFor(p => p.Description, f => f.Company.CompanyName());

            //Entities.Person person = peopleGenerator.Generate();

            var emailGenerator = new Faker<Entities.Email>()
                .RuleFor(e => e.EmailAddress, f => f.Person.Email)
                .RuleFor(e => e.Person, f => peopleGenerator.Generate());

            var emails = emailGenerator.Generate(10);

            context.AddRange(emails);
            context.SaveChanges();
        }
    }
}
