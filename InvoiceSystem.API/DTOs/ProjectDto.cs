namespace InvoiceSystem.API.DTOs;

public class ProjectDto
{
    public int ProjectId { get; set; }
    public required string Name { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public string ClientName { get; set; } = string.Empty;
}