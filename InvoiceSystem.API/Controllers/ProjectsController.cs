using InvoiceSystem.API.Data;
using InvoiceSystem.API.DTOs;
using InvoiceSystem.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvoiceSystem.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly InvoiceDbContext _context;

    public ProjectsController(InvoiceDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetProjects()
    {
        var projects = _context.Projects
            .Include(p => p.Client)
            .Select(p => new ProjectDto
            {
                ProjectId = p.ProjectId,
                Name = p.Name,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                ClientName = p.Client != null ? p.Client.Name : string.Empty
            })
            .ToList();

        return Ok(projects);
    }


    [HttpGet("{id}")]
    public IActionResult GetProjectById(int id)
    {
        var project = _context.Projects
            .Include(p => p.Client)
            .FirstOrDefault(p => p.ProjectId == id);

        if (project == null)
            return NotFound();


        var dto = new ProjectDto
        {
            ProjectId = project.ProjectId,
            Name = project.Name,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            ClientName = project.Client != null ? project.Client.Name : string.Empty
        };

        return Ok(dto);
    }


    [HttpPut("{id}")]
    public IActionResult UpdateProject(int id, [FromBody] ProjectCreateUpdateDto dto)
    {
        var project = _context.Projects.FirstOrDefault(p => p.ProjectId == id);
        if (project == null)
            return NotFound();

        project.Name = dto.Name;
        project.StartDate = dto.StartDate;
        project.EndDate = dto.EndDate;
        project.ClientId = dto.ClientId;

        _context.SaveChanges();

        return Ok(new { message = "Project updated successfully" });
    }


    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] ProjectCreateUpdateDto dto)
    {
        var client = await _context.Clients.FirstOrDefaultAsync(c => c.ClientId == dto.ClientId);
        if (client == null)
            return BadRequest(new { message = "Invalid Client ID" });

        var project = new Project
        {
            Name = dto.Name,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            ClientId = dto.ClientId
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Project created successfully", projectId = project.ProjectId });
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteProject(int id)
    {
        var project = _context.Projects.FirstOrDefault(p => p.ProjectId == id);
        if (project == null)
            return NotFound();

        _context.Projects.Remove(project);
        _context.SaveChanges();

        return Ok(new { message = "Project deleted successfully" });
    }
}