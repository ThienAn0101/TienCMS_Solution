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
    // 1. Địa chỉ truy cập dữ liệu sẽ là: https://localhost:xxxx/api/categoryproducts
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 2. Hàm khởi tạo: Kết nối với Database
        public CategoryProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/categoryproducts
        // Lấy danh sách toàn bộ danh mục sản phẩm
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.CategoriesProducts
                .OrderBy(c => c.Name) // Sắp xếp theo tên danh mục cho dễ nhìn
                .ToListAsync();

            return Ok(categories);
        }

        // GET: api/categoryproducts/{id}
        // Lấy thông tin chi tiết của một danh mục theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var category = await _context.CategoriesProducts
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound(new { message = "Không tìm thấy danh mục này" });
            }

            return Ok(category);
        }

        // 💡 BỔ SUNG THÊM: Lấy danh sách sản phẩm thuộc danh mục này
        // GET: api/categoryproducts/{id}/products
        [HttpGet("{id}/products")]
        public async Task<IActionResult> GetProductsByCategory(int id)
        {
            var exists = await _context.CategoriesProducts.AnyAsync(c => c.Id == id);
            if (!exists)
            {
                return NotFound(new { message = "Danh mục không tồn tại" });
            }

            var products = await _context.Products
                .Where(p => p.CategoryProductId == id)
                .ToListAsync();

            return Ok(products);
        }
    }
}
