using Microsoft.AspNetCore.Mvc;
using InvoiceSystem.API.Data;
using InvoiceSystem.API.Models;
using InvoiceSystem.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace InvoiceSystem.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly InvoiceDbContext _context;

    public ClientsController(InvoiceDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetClients()
    {
        var clients = _context.Clients
            .Include(c => c.Projects)
                .ThenInclude(p => p.Invoices)
            .Select(c => new ClientDto
            {
                ClientId = c.ClientId,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone,
                Address = c.Address,
                Type = c.Type,
                totalInvoices = c.Projects.SelectMany(p => p.Invoices).Count(),
                totalAmount = c.Projects.SelectMany(p => p.Invoices).Sum(i => i.Amount)
            })
            .ToList();

        return Ok(clients);
    }

    [HttpGet("{id}")]
    public IActionResult GetClientById(int id)
    {
        var client = _context.Clients.FirstOrDefault(c => c.ClientId == id);
        if (client == null)
            return NotFound();


        var dto = new ClientDto
        {
            ClientId = client.ClientId,
            Name = client.Name,
            Email = client.Email,
            Phone = client.Phone,
            Address = client.Address,
            Type = client.Type,
            totalInvoices = client.Projects.SelectMany(p => p.Invoices).Count(),
            totalAmount = client.Projects.SelectMany(p => p.Invoices).Sum(i => i.Amount)
        };

        return Ok(dto);
    }


    [HttpPut("{id}")]
    public IActionResult UpdateClient(int id, [FromBody] ClientCreateUpdateDto dto)
    {
        var client = _context.Clients.FirstOrDefault(c => c.ClientId == id);
        if (client == null)
            return NotFound();

        client.Name = dto.Name;
        client.Email = dto.Email;
        client.Phone = dto.Phone;
        client.Address = dto.Address;
        client.Type = dto.Type;

        _context.SaveChanges();

        return Ok(new { message = "Client updated successfully" });
    }

    [HttpPost]
    public async Task<IActionResult> CreateClient([FromBody] ClientCreateUpdateDto dto)
    {

        var client = new Client
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Address = dto.Address,
            Type = dto.Type
        };

        _context.Clients.Add(client);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Client created successfully", clientId = client.ClientId });
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteClient(int id)
    {
        var client = _context.Clients.FirstOrDefault(c => c.ClientId == id);
        if (client == null)
            return NotFound();

        _context.Clients.Remove(client);
        _context.SaveChanges();

        return Ok(new { message = "Client deleted successfully" });
    }

}
