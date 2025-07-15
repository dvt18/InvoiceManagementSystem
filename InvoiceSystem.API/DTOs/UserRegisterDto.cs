using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs;
public class UserRegisterDto
{
    public required string Username { get; set; }
    public required string Password { get; set; }
    public UserRole Role { get; set; }
}