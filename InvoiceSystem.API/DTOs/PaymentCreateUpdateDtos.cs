using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs
{
    public class PaymentCreateUpdateDto
    {
        public decimal AmountPaid { get; set; }
        public DateTime PaymentDate { get; set; }
        public PaymentMethod Method { get; set; }
        
        // Foreign key to the Invoice
        public int InvoiceId { get; set; }
    }
}