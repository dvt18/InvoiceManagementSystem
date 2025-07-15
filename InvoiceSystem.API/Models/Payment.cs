using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.Models;

public class Payment
{
    public int PaymentId { get; set; }
    public decimal AmountPaid { get; set; }
    public DateTime PaymentDate { get; set; }
    public PaymentMethod Method { get; set; }

    public int InvoiceId { get; set; }
    public Invoice? Invoice { get; set; }
}