using InvoiceSystem.API.Data;
using InvoiceSystem.API.DTOs;
using InvoiceSystem.API.Models;
using InvoiceSystem.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace InvoiceSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly InvoiceDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(InvoiceDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto dto)
        {
            var existing = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (existing != null)
                return BadRequest("User already exists with this UserName.");

            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password,
                Role = dto.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully." });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            if (string.IsNullOrEmpty(dto.Username) || string.IsNullOrEmpty(dto.Password))
                return BadRequest("Username and password are required.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username && u.Password == dto.Password);

            if (user == null)
                return Unauthorized("Invalid UserName or password.");

            var token = _jwtService.GenerateToken(user.UserId.ToString(), user.Username, user.Role.ToString());
            return Ok(new { Token = token, Role = user.Role.ToString(), user.Username });
        }

    }
}