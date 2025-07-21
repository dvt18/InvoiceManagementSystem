using InvoiceSystem.API.Enums;

namespace InvoiceSystem.API.DTOs;

public class UserCreateUpdateDto
{
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required UserRole Role { get; set; }
}
