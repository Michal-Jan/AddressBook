using AddressBook.Entities;

namespace AddressBook.Contracts
{
    public interface IEmailRepository : IGenericRepository<Email>
    {
        Task<List<Email>> GetEmailsByPersonId(int id);
    }
}
