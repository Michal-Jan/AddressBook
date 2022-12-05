using AddressBook.Entities;

namespace AddressBook.Contracts
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<List<Person>> GetAllPeopleIncludeEmails();
    }
}
