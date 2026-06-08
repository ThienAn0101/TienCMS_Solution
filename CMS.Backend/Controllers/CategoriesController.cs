/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-08
 * Version: 1.0
 */

using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    // 1. Đường dẫn gọi API trên trình duyệt: api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 2. Hàm khởi tạo: Nạp dữ liệu cơ sở dữ liệu (DbContext)
        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 3. API lấy toàn bộ danh mục bài viết (Sắp xếp theo Id tăng dần)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Kết nối thẳng tới bảng _context.Categories mà bạn vừa chụp hình
            var categories = await _context.Categories
                .OrderBy(c => c.Id)
                .ToListAsync();

            // Trả về danh sách kèm mã HTTP 200 OK
            return Ok(categories);
        }

        // 4. API lấy chi tiết 1 danh mục cụ thể bằng Id: api/categories/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == id);

            // Phòng hờ kịch bản người dùng tìm Id không tồn tại
            if (category == null)
            {
                return NotFound(new { message = "Không tìm thấy danh mục bài viết này trong hệ thống!" });
            }

            return Ok(category);
        }
    }
}