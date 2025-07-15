using InvoiceSystem.API.Enums;
using InvoiceSystem.API.Models;
using Microsoft.Net.Http.Headers;

namespace InvoiceSystem.API.DTOs;

public class ClientDto
{
    public int ClientId { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public string? Address { get; set; }
    public ClientType Type { get; set; }


    public int totalInvoices { get; set; }
    public decimal totalAmount { get; set; }

}