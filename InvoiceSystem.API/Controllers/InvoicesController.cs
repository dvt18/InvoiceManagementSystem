using Microsoft.AspNetCore.Mvc;
using InvoiceSystem.API.Data;
using InvoiceSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using InvoiceSystem.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly InvoiceDbContext _context;

    public InvoicesController(InvoiceDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetInvoices()
    {
        var invoices = _context.Invoices
            .Include(i => i.Project)
                .ThenInclude(p => p.Client)
            .Include(i => i.Payments)
            .ToList()
            .Select(i => new InvoiceDto
            {
                InvoiceId = i.InvoiceId,
                Amount = i.Amount,
                InvoiceDate = i.InvoiceDate,
                DueDate = i.DueDate,
                Status = CalculateStatus(i),
                ProjectName = i.Project != null ? i.Project.Name : "N/A",
                ClientName = i.Project != null && i.Project.Client != null ? i.Project.Client.Name : "N/A",
                ClientAddress = i.Project?.Client?.Address,
                ClientEmail = i.Project?.Client?.Email,

                TotalPaid = i.Payments.Sum(p => p.AmountPaid),
                BalanceDue = i.Amount - i.Payments.Sum(p => p.AmountPaid),
                TaxPercent = i.TaxPercent,
            })
            .ToList();

        return Ok(invoices);
    }


    [HttpGet("{id}")]
    public IActionResult GetInvoiceById(int id)
    {
        var invoice = _context.Invoices
                .Include(i => i.Project)
                .ThenInclude(p => p.Client)
                .Include(i => i.Payments)
                .FirstOrDefault(i => i.InvoiceId == id);

        if (invoice == null)
            return NotFound();

        var dto = new InvoiceDto
        {
            InvoiceId = invoice.InvoiceId,
            Amount = invoice.Amount,
            InvoiceDate = invoice.InvoiceDate,
            DueDate = invoice.DueDate,
            Status = CalculateStatus(invoice),
            ProjectName = invoice.Project?.Name,
            ClientName = invoice.Project?.Client?.Name,
            TaxPercent = invoice.TaxPercent,
            ClientAddress = invoice.Project?.Client?.Address,
            ClientEmail = invoice.Project?.Client?.Email,

            TotalPaid = invoice.Payments?.Sum(p => p.AmountPaid) ?? 0,
            BalanceDue = invoice.Amount - (invoice.Payments?.Sum(p => p.AmountPaid) ?? 0)
        };

        return Ok(dto);
    }


    [HttpPut("{id}")]
    public IActionResult UpdateInvoice(int id, [FromBody] InvoiceCreateUpdateDto dto)
    {
        var invoice = _context.Invoices.FirstOrDefault(i => i.InvoiceId == id);

        if (invoice == null)
            return NotFound();

        invoice.Amount = dto.Amount;
        invoice.InvoiceDate = dto.InvoiceDate;
        invoice.DueDate = dto.DueDate;
        invoice.Status = InvoiceStatus.Pending;
        invoice.ProjectId = dto.ProjectId;
        invoice.TaxPercent = dto.TaxPercent;

        _context.SaveChanges();

        return Ok(new { message = "Invoice Updated successfully" });
    }


    [HttpPost]
    public async Task<IActionResult> CreateInvoice([FromBody] InvoiceCreateUpdateDto dto)
    {

        var project = await _context.Projects.FirstOrDefaultAsync(p => p.ProjectId == dto.ProjectId);
        if (project == null)
        {
            return BadRequest("Invalid ProjectId. Project not found.");
        }

        var Invoice = new Invoice
        {
            Amount = dto.Amount,
            InvoiceDate = dto.InvoiceDate,
            DueDate = dto.DueDate,
            Status = InvoiceStatus.Pending,
            ProjectId = dto.ProjectId,
            TaxPercent = dto.TaxPercent,
        };

        _context.Invoices.Add(Invoice);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Invoice Created successfully", InvoiceId = Invoice.InvoiceId });
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteInvoice(int id)
    {
        var invoice = _context.Invoices.FirstOrDefault(i => i.InvoiceId == id);

        if (invoice == null)
            return NotFound();

        _context.Invoices.Remove(invoice);
        _context.SaveChanges();

        return Ok(new { message = "Invoice Deleted successfully" });
    }
    

    private InvoiceStatus CalculateStatus(Invoice invoice)
    {
        var totalPaid = invoice.Payments?.Sum(p => p.AmountPaid) ?? 0;
        
        if (totalPaid >= invoice.Amount)
            return InvoiceStatus.Paid;
        else if (invoice.DueDate < DateTime.Now && totalPaid < invoice.Amount)
            return InvoiceStatus.Overdue;
        else
            return InvoiceStatus.Pending;
    }
}