/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-21
 * Version: 1.0
 */

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var orders = _context.Orders.ToList();

            return View(orders);
        }

        // 2. TRANG XEM CHI TIẾT ĐƠN HÀNG
        // Gộp dữ liệu từ bảng Orders và nạp kèm danh sách các sản phẩm trong OrderDetails
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails!)          // Nạp danh sách sản phẩm khách mua
                .ThenInclude(d => d.Product)           // Nạp tên sách, ảnh sách để hiển thị
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return NotFound();

            return View(order);
        }

        // 3. XỬ LÝ CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (Không cần làm trang riêng, bấm nút là đổi luôn)
        [HttpPost]
        public async Task<IActionResult> UpdateStatus(int id, int status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                order.Status = status; // Cập nhật trạng thái mới (0, 1, 2...)
                _context.Orders.Update(order);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("Index"); // Cập nhật xong quay lại danh sách luôn
        }
    }
}