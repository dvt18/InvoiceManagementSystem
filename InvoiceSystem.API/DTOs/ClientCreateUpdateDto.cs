using System.ComponentModel.DataAnnotations;
using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs;

public class ClientCreateUpdateDto
{
    
    public required string Name { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email format")]
    public required string Email { get; set; }
    
    public required string Phone { get; set; }
    
    public string Address { get; set; } = string.Empty;
    
    public ClientType Type { get; set; } = ClientType.Client;
}