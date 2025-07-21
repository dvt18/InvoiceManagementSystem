using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs
{
    public class InvoiceDto
    {
        public int InvoiceId { get; set; }
        public decimal Amount { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public InvoiceStatus Status { get; set; }
        public decimal TaxPercent { get; set; }

        public string? ProjectName { get; set; }
        public string? ClientName { get; set; }
        public string? ClientAddress { get; set; }
        public string? ClientEmail { get; set; }

        public decimal TotalPaid { get; set; }
        public decimal BalanceDue { get; set; }
    }
}