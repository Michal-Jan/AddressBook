using AddressBook.Contracts;
using AddressBook.Data;
using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Repositories
{
    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        private readonly AppDbContext _context;

        public PersonRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Person>> GetAllPeopleIncludeEmails()
        {
            return await _context.Persons.Include(p => p.Emails).ToListAsync();
        }
    }
}
