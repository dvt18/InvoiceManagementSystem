using Microsoft.AspNetCore.Mvc;
using InvoiceSystem.API.Data;
using InvoiceSystem.API.Models;
using InvoiceSystem.API.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace InvoiceSystem.API.Controllers;

[Authorize (Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly InvoiceDbContext _context;

    public UsersController(InvoiceDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _context.Users
            .Select(u => new UserDto
            {
                UserId = u.UserId,
                Username = u.Username,
                Role = u.Role
            })
            .ToList();

        return Ok(users);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserId == id);
        if (user == null)
            return NotFound();

        var dto = new UserDto
        {
            UserId = user.UserId,
            Username = user.Username,
            Role = user.Role
        };
        return Ok(dto);
    }


    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, [FromBody] UserCreateUpdateDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserId == id);
        if (user == null)
            return NotFound();

        user.Username = dto.Username;
        user.Password = dto.Password;
        user.Role = dto.Role;

        _context.SaveChanges();

        return Ok(new { message = "User updated successfully" });
    }


    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserCreateUpdateDto dto)
    {

        var user = new User
        {
            Username = dto.Username,
            Password = dto.Password,
            Role = dto.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User Created successfully", UserId = user.UserId });
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserId == id);
        if (user == null)
            return NotFound();

        _context.Users.Remove(user);
        _context.SaveChanges();

        return Ok(new { message = "User deleted successfully" });
    }
}