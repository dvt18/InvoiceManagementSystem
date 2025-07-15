using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs;

public class UserDto
{
    public int UserId { get; set; }
    public required string Username { get; set; }
    public UserRole Role { get; set; }
}