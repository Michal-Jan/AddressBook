namespace AddressBook.Entities;

public class Person
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Description { get; set; }
    public List<Email> Emails { get; set; } = new List<Email>();
}
