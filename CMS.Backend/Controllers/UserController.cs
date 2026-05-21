/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-14
 * Version: 1.0
 */

using CMS.Data;
using CMS.Data.Entities; // Phải có dòng này để dùng lớp User
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối Database vào Controller tương tự như CategoryController
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Action lấy danh sách thành viên
        public IActionResult Index()
        {

            var data = _context.Users.ToList(); // Lấy tất cả thành viên từ bảng Users trong SQL

            return View(data);
        }
    }
}
