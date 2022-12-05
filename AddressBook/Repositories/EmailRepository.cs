using AddressBook.Contracts;
using AddressBook.Data;
using AddressBook.Entities;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Repositories
{
    public class EmailRepository : GenericRepository<Email>, IEmailRepository
    {
        private readonly AppDbContext _context;

        public EmailRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Email>> GetEmailsByPersonId(int id)
        {
            return await _context.Emails.Where(e => e.PersonId == id).ToListAsync();
        }
    }
}
