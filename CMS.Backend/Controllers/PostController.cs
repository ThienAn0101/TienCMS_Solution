/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-14
 * Version: 1.0
 */

using CMS.Data;
using CMS.Data.Entities; // Quan trọng: Phải có dòng này để dùng lớp Post
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Constructor Injection
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hiển thị danh sách bài viết từ Database
        public IActionResult Index(int? id)
        {
            // Tạo query và Include Category
            var query = _context.Posts
                                .Include(p => p.Category)
                                .OrderByDescending(p => p.CreatedDate)
                                .AsQueryable();

            // Nếu có id thì lọc theo CategoryId
            if (id.HasValue)
            {
                query = query.Where(p => p.CategoryId == id.Value);
            }

            // Nếu không có id => lấy toàn bộ bài viết
            var posts = query.ToList();

            // Truyền dữ liệu ra View
            return View(posts);
        }

        // Chi tiết bài viết
        public IActionResult Details(int id)
        {
            // 1. Truy vấn bài viết theo ID
            // Sử dụng .Include(p => p.Category) để lấy kèm thông tin Danh mục (Join bảng)
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            // 2. Kiểm tra nếu không tìm thấy bài viết (tránh lỗi màn hình trắng)
            if (post == null)
            {
                return NotFound(); // Trả về trang lỗi 404
            }

            // 3. Truyền dữ liệu sang View
            return View(post);
        }
    }
}
