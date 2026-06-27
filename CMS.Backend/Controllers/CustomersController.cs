/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Ngay cap nhat: 2026-06-27
 * Version: 5.0 (Tích hợp thư viện BCrypt để mã hóa bảo mật mật khẩu trong Database)
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// 🌟 Nhúng thư viện mã hóa mật khẩu
using BCryptNet = BCrypt.Net.BCrypt;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // =========================================================================
        // 🌟 1. API ĐĂNG KÝ TÀI KHOẢN KHÁCH HÀNG MỚI (CÓ MÃ HÓA)
        // =========================================================================
        [HttpPost]
        public async Task<IActionResult> RegisterCustomer([FromBody] CustomerRegisterDto model)
        {
            if (model == null)
            {
                return BadRequest(new { message = "Dữ liệu đăng ký trống!" });
            }

            try
            {
                string email = model.Email?.Trim();
                string fullName = model.FullName?.Trim();
                string phone = (model.Phone ?? model.PhoneNumber)?.Trim();
                string address = model.Address?.Trim();
                string password = model.Password?.Trim();

                if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(password))
                {
                    return BadRequest(new { message = "Vui lòng nhập đầy đủ Họ tên, Email và Mật khẩu nha Tiên!" });
                }

                // Kiểm tra trùng email
                var emailExists = await _context.Customers.AnyAsync(c => c.Email == email);
                if (emailExists)
                {
                    return BadRequest(new { message = "Email này đã được đăng ký trên hệ thống rồi nha Tiên!" });
                }

                // 🌟 THẦN CHÚ MÃ HÓA: Biến mật khẩu "123" thành chuỗi dài bảo mật dạng "$2a$12$..."
                string securePasswordHash = BCryptNet.HashPassword(password);

                var newCustomer = new Customer
                {
                    FullName = fullName,
                    Email = email,
                    Phone = phone,
                    Address = address,
                    Password = securePasswordHash // Lưu mật khẩu đã băm vào cột Password trong DB
                };

                await _context.Customers.AddAsync(newCustomer);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Đăng ký tài khoản thành công và bảo mật mật khẩu rồi nha Tiên!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi Database: " + (ex.InnerException?.Message ?? ex.Message) });
            }
        }

        // =========================================================================
        // 🌟 2. API ĐĂNG NHẬP KHÁCH HÀNG (SO SÁNH MẬT KHẨU MÃ HÓA)
        // =========================================================================
        [HttpPost("Login")]
        public async Task<IActionResult> LoginCustomer([FromBody] CustomerLoginDto model)
        {
            if (model == null)
            {
                return BadRequest(new { message = "Dữ liệu đăng nhập trống!" });
            }

            try
            {
                string email = model.Email?.Trim();
                string password = model.Password?.Trim();

                if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                {
                    return BadRequest(new { message = "Vui lòng nhập đầy đủ Email và Mật khẩu nha Tiên!" });
                }

                // 🌟 BƯỚC 1: Tìm khách hàng dựa duy nhất vào Email trước
                var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);

                // 🌟 BƯỚC 2: Giải mã so sánh mật khẩu chữ thường vừa gõ với mã Hash trong Database
                if (customer == null || !BCryptNet.Verify(password, customer.Password))
                {
                    // Trả ra thông báo chung để hacker không mò được lỗi do email hay do pass
                    return BadRequest(new { message = "Tài khoản Email hoặc Mật khẩu không chính xác nha Tiên!" });
                }

                // Đăng nhập thành công, trả về thông tin user sạch ra ReactJS
                return Ok(new
                {
                    message = "Đăng nhập thành công!",
                    user = new
                    {
                        id = customer.Id,
                        fullName = customer.FullName,
                        email = customer.Email,
                        phone = customer.Phone,
                        address = customer.Address, 
                        password = customer.Password
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi hệ thống: " + ex.Message });
            }
        }
    }

    public class CustomerRegisterDto
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Password { get; set; }
    }

    public class CustomerLoginDto
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}