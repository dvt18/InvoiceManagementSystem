namespace InvoiceSystem.API.Models;

public class Project
    {
        public int ProjectId { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int ClientId { get; set; }
        public Client? Client { get; set; }

        public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
    }