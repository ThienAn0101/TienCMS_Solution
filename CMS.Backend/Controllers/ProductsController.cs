/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-04
 * Ngay cap nhat: 2026-06-26
 * Version: 2.0 (Tích hợp bộ lọc tìm kiếm giá Max-Min hiển thị trực tiếp lên Swagger)
 */
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    // 1. Định nghĩa đường dẫn để gọi API. [controller] tự động nhận diện là "Products"
    // Khi chạy, địa chỉ truy cập dữ liệu sẽ là: https://localhost:xxxx/api/products
    [Route("api/[controller]")]

    // 2. Đánh dấu đây là một API Controller để hệ thống hỗ trợ các tính năng tự động kiểm tra dữ liệu đầu vào
    [ApiController]

    // 3. API Controller phải kế thừa từ ControllerBase (thay vì kế thừa từ Controller như phân hệ MVC)
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 4. Hàm khởi tạo (Constructor): "Tiêm" ngữ cảnh dữ liệu SQL Server vào để sử dụng
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 🌟 1. CẬP NHẬT PHƯƠNG THỨC GET: Hỗ trợ truyền tham số minPrice và maxPrice từ Query String
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
        {
            // Khởi tạo câu lệnh truy vấn LINQ hướng tới bảng Products dữ liệu gốc
            var query = _context.Products.AsQueryable();

            // Lọc theo giá tối thiểu nếu Tiên nhập trên giao diện Swagger
            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            // Lọc theo giá tối đa nếu Tiên nhập trên giao diện Swagger
            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            // Thực thi truy vấn, sắp xếp sản phẩm mới nhất lên đầu và chuyển thành List dạng Async
            var products = await query
                .OrderByDescending(p => p.Id)
                .ToListAsync();

            // Trả về kết quả cho Frontend kèm mã trạng thái HTTP 200 OK (Thành công)
            return Ok(products);
        }

        // 2. Định nghĩa đường dẫn chứa tham số động: api/products/categoryproduct/{categoryproductId}
        [HttpGet("categoryproduct/{categoryProductId}")]
        public async Task<IActionResult> GetByCategoryProduct(int categoryProductId)
        {
            // Lọc các bài viết có CategoryId trùng với ID truyền vào từ thanh URL
            var products = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .OrderByDescending(p => p.Id) // Đồng bộ sắp xếp mới nhất
                .ToListAsync();

            return Ok(products);
        }

        // 3. Định nghĩa đường dẫn nhận ID trực tiếp: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            // 3.1. Quét bảng Products để tìm sản phẩm đầu tiên có Id khớp với tham số
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id);

            // 3.2 Xử lý kịch bản lỗi bảo vệ hệ thống: ID không tồn tại trong Database
            if (product == null)
            {
                // Trả về mã lỗi 404 kèm một "gói tin" JSON thông báo nhỏ gọn để Frontend tự xử lý UI
                return NotFound(new { message = "Không tìm thấy sản phẩm này trong hệ thống" });
            }

            // 3.3. Trả về toàn bộ đối tượng sản phẩm (bao gồm cả trường Content chứa mã HTML) kèm mã 200 OK
            return Ok(product);
        }
    }
}