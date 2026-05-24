/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-14
 * Version: 1.0
 */

using CMS.Data;
using CMS.Data.Entities; // Phải có dòng này để dùng lớp User
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        //------------------------   CREATE  ------------------------------
        //(GET): Để hiển thị giao diện Thêm thành viên
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        //(POST): Để đón dữ liệu từ Form và lưu vào SQL Server
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(User user)
        {
            if (ModelState.IsValid)
            {
                _context.Users.Add(user); // Thêm đối tượng user vào bộ cảnh ngữ DbContext
                _context.SaveChanges();   // Thực thi lưu xuống Database trong SSMS
                return RedirectToAction(nameof(Index)); // Lưu xong tự động chuyển hướng về trang danh sách
            }
            // Nếu dữ liệu nhập vào có lỗi, giữ nguyên trang để hiển thị thông báo lỗi
            return View(user);
        }

        //------------------------   EDIT  ------------------------------
        // GET: Hiển thị form kèm dữ liệu cũ của User
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            return View(user);
        }

        // POST: Thực hiện lưu thay đổi
        [HttpPost]
        public IActionResult Edit(User model, string NewPassword)
        {
            // 1. Tìm User gốc trong Database để lấy lại mật khẩu cũ nếu cần
            var existingUser = _context.Users.AsNoTracking().FirstOrDefault(u => u.Id == model.Id);

            if (existingUser == null) return NotFound();

            // 2. Xử lý mật khẩu: Nếu nhập mới thì lấy cái mới, nếu trống thì lấy cái cũ
            if (!string.IsNullOrEmpty(NewPassword))
            {
                model.PasswordHash = NewPassword; // Sau này sẽ mã hóa tại đây
            }
            else
            {
                model.PasswordHash = existingUser.PasswordHash;
            }

            // 3. Cập nhật vào Database
            _context.Users.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        //------------------------   DELETE  ------------------------------
        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
