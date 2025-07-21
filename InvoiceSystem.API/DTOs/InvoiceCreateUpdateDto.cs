using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs;

public class InvoiceCreateUpdateDto
{
    public decimal Amount { get; set; }
    public DateTime InvoiceDate { get; set; }
    public DateTime DueDate { get; set; }
    public InvoiceStatus Status { get; set; }
    public decimal TaxPercent { get; set; } = 18;
    
    // This is a foreign key that links to the Project table
    public int ProjectId { get; set; } 
}