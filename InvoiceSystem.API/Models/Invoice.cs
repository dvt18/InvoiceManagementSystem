using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.Models;

public class Invoice
{
    public int InvoiceId { get; set; }
    public required decimal Amount { get; set; }
    public required DateTime InvoiceDate { get; set; }
    public DateTime DueDate { get; set; }
    public InvoiceStatus Status { get; set; }
    public decimal TaxPercent { get; set; } = 18;

    public int ProjectId { get; set; }
    public Project? Project { get; set; }


    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    

}