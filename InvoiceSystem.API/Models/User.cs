using System.ComponentModel.DataAnnotations.Schema;
using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.Models;

public class User
{
    public int UserId { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    
    public UserRole Role { get; set; }

}