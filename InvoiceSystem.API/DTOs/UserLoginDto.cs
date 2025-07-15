using System.Text.Json.Serialization;

namespace InvoiceSystem.API.DTOs;
public class UserLoginDto
{
    [JsonPropertyName("username")]
    public required string Username { get; set; }

    [JsonPropertyName("password")]
    public required string Password { get; set; }
}