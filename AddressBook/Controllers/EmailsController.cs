using AddressBook.Contracts;
using AddressBook.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailsController : ControllerBase
    {
        private readonly IEmailRepository _emailRepository;

        public EmailsController(IEmailRepository emailRepository)
        {
            _emailRepository = emailRepository;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Email>>> GetEmails()
        {
            return await _emailRepository.GetAllAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Email>> GetEmail(int id)
        {
            var email = await _emailRepository.GetAsync(id);

            if (email == null)
            {
                return NotFound();
            }

            return email;
        }

        [HttpGet("person/{id}")]
        public async Task<ActionResult<List<Email>>> GetEmailByPersonId(int id)
        {
            return await _emailRepository.GetEmailsByPersonId(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmail(int id, Email email)
        {
            if (id != email.Id)
            {
                return BadRequest();
            }

            try
            {
                await _emailRepository.UpdateAsync(email);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await EmailExists(id)))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Email>> PostEmail(Email email)
        {
            await _emailRepository.AddAsync(email);

            return CreatedAtAction("GetEmail", new { id = email.Id }, email);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmail(int id)
        {
            if (!(await EmailExists(id)))
            {
                return NotFound();
            }

            await _emailRepository.DeleteAsync(id);

            return NoContent();
        }

        private async Task<bool> EmailExists(int id)
        {
            return await _emailRepository.Exists(id);
        }
    }
}
