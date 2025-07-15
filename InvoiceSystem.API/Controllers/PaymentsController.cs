using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceSystem.API.Data;
using InvoiceSystem.API.Models;
using InvoiceSystem.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly InvoiceDbContext _context;

    public PaymentsController(InvoiceDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetPayments()
    {
        var payments = _context.Payments
            .Include(p => p.Invoice)
                .ThenInclude(i => i.Project)
                    .ThenInclude(proj => proj.Client)
            .Select(p => new PaymentDto
            {
                PaymentId = p.PaymentId,
                AmountPaid = p.AmountPaid,
                PaymentDate = p.PaymentDate,
                Method = p.Method,
                InvoiceId = p.InvoiceId,
                ProjectName = p.Invoice.Project != null ? p.Invoice.Project.Name : "N/A",
                ClientName = p.Invoice.Project != null && p.Invoice.Project.Client != null ? p.Invoice.Project.Client.Name : "N/A"
            })
            .ToList();

        return Ok(payments);
    }


    [HttpGet("{id}")]
    public IActionResult GetPaymentById(int id)
    {
        var payment = _context.Payments
            .Include(p => p.Invoice)
                .ThenInclude(i => i.Project)
                    .ThenInclude(proj => proj.Client)
            .FirstOrDefault(p => p.PaymentId == id);

        if (payment == null)
            return NotFound();

        var dto = new PaymentDto
        {
            PaymentId = payment.PaymentId,
            AmountPaid = payment.AmountPaid,
            PaymentDate = payment.PaymentDate,
            Method = payment.Method,
            InvoiceId = payment.InvoiceId,
            ProjectName = payment.Invoice?.Project?.Name ?? "N/A",
            ClientName = payment.Invoice?.Project?.Client?.Name ?? "N/A"
        };

        return Ok(dto);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePayment(int id, [FromBody] PaymentCreateUpdateDto dto)
    {
        var payment = _context.Payments.FirstOrDefault(p => p.PaymentId == id);
        if (payment == null)
            return NotFound();

        // Verify invoice exists before updating
        var invoiceExists = _context.Invoices.Any(i => i.InvoiceId == dto.InvoiceId);
        if (!invoiceExists)
            return BadRequest("Invalid InvoiceId");

        payment.AmountPaid = dto.AmountPaid;
        payment.PaymentDate = dto.PaymentDate;
        payment.Method = dto.Method;
        payment.InvoiceId = dto.InvoiceId;

        _context.SaveChanges();

        await UpdateInvoiceStatusAsync(dto.InvoiceId);

        return Ok(new { message = "payment updated successfully" });
    }


    [HttpPost]
    public async Task<IActionResult> CreatePayment([FromBody] PaymentCreateUpdateDto dto)
    {
        var invoice = await _context.Invoices
                            .Include(i => i.Project)
                            .ThenInclude(p => p.Client)
                            .FirstOrDefaultAsync(i => i.InvoiceId == dto.InvoiceId);
        if (invoice == null)
        {
            return BadRequest("Invalid InvoiceId");
        }

        var payment = new Payment
        {
            AmountPaid = dto.AmountPaid,
            PaymentDate = dto.PaymentDate,
            Method = dto.Method,
            InvoiceId = dto.InvoiceId
        };

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        await UpdateInvoiceStatusAsync(payment.InvoiceId);


        return Ok(new { message = "payment added successfully", payment.PaymentId });
    }


    [HttpDelete("{id}")]
    public IActionResult DeletePayment(int id)
    {
        var payment = _context.Payments.FirstOrDefault(p => p.PaymentId == id);
        if (payment == null)
            return NotFound();

        _context.Payments.Remove(payment);
        _context.SaveChanges();

        return Ok(new { message = "payment deleted successfully" });
    }
    

    private async Task UpdateInvoiceStatusAsync(int invoiceId)
    {
        var invoice = await _context.Invoices
            .Include(i => i.Payments)
            .FirstOrDefaultAsync(i => i.InvoiceId == invoiceId);

        if (invoice != null)
        {
            decimal totalPaid = invoice.Payments.Sum(p => p.AmountPaid);

            if (totalPaid >= invoice.Amount)
            {
                invoice.Status = InvoiceStatus.Paid;
            }
            else if (invoice.DueDate < DateTime.Now && totalPaid < invoice.Amount)
            {
                invoice.Status = InvoiceStatus.Overdue;
            }
            else
            {
                invoice.Status = InvoiceStatus.Pending;
            }

            await _context.SaveChangesAsync();
        }
    }

}