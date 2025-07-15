using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs;

public class PaymentDto
{
    public int PaymentId { get; set; }
    public decimal AmountPaid { get; set; }
    public DateTime PaymentDate { get; set; }
    public PaymentMethod Method { get; set; }
    

    public int? InvoiceId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;

}