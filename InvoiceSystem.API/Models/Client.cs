
using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.Models;

public class Client
{
    public int ClientId { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public required string Phone { get; set; }

    public string? Address { get; set; }

    public ClientType Type { get; set; } = ClientType.Client;


    public ICollection<Project> Projects { get; set; } = new List<Project>();
}
