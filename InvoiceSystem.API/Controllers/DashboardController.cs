
using InvoiceSystem.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceSystem.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize (Roles = "Admin,User")]
public class DashboardController : ControllerBase
{
    private readonly InvoiceDbContext _context;

    public DashboardController(InvoiceDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public IActionResult GetSummary()
    {
        var data = new
        {
            clients = _context.Clients.Count(),
            projects = _context.Projects.Count(),
            invoices = _context.Invoices.Count(),
            payments = _context.Payments.Sum(p => p.AmountPaid),
            pendingPayments = _context.Invoices
                .Where(i => i.Status == Enums.InvoiceStatus.Pending && i.DueDate >= DateTime.Now)
                .Sum(i => i.Amount - i.Payments.Sum(p => p.AmountPaid)),
            overduePayments = _context.Invoices
                .Where(i => (i.Status == Enums.InvoiceStatus.Pending && i.DueDate < DateTime.Now) || i.Status == Enums.InvoiceStatus.Overdue)
                .Sum(i => i.Amount - i.Payments.Sum(p => p.AmountPaid))
        };

        return Ok(data);
    }
}
