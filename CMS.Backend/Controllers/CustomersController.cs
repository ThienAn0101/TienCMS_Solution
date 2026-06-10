/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    // 🌟 1. Bắt buộc phải có 2 dòng cấu hình này thì Postman mới tìm thấy API nha Tiên
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 🌟 2. API Lấy toàn bộ danh sách khách hàng (Để Tiên test GET trên Postman)
        // Đường dẫn chạy sẽ là: https://localhost:7001/api/customers
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _context.Customers.ToListAsync();
            return Ok(customers);
        }
    }
}