using System;

namespace InvoiceSystem.API.DTOs;

public class ProjectCreateUpdateDto
{
    public required string Name { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public int ClientId { get; set; }
}