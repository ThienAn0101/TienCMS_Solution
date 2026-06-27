/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-04
 * Version: 2.0 (Bổ sung API lấy danh sách đơn hàng theo khách hàng đang đăng nhập)
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // 🌟 Thêm thư viện này để dùng được ToListAsync()
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // =========================================================================
        // 📥 1. API: TIẾP NHẬN ĐƠN ĐẶT HÀNG TỪ GIỎ HÀNG
        // =========================================================================
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            if (input == null)
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ" });
            }

            try
            {
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = input.CustomerId, // Nhận ID từ Front-end truyền lên
                    Status = 0,               // 0: Chờ xử lý, 1: Đang giao hàng, 2: Hoàn thành
                    Notes = input.Notes
                };

                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync();

                return StatusCode(201, new
                {
                    message = "Đặt hàng thành công!",
                    orderId = newOrder.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng ngầm", detail = ex.Message });
            }
        }

        // =========================================================================
        // 📤 2. API: LẤY DANH SÁCH ĐƠN HÀNG CỦA KHÁCH HÀNG ĐANG ĐĂNG NHẬP
        // Đường dẫn gọi: GET https://localhost:xxxx/api/Orders/my-orders?customerId=...
        // =========================================================================
        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders([FromQuery] int customerId)
        {
            try
            {
                // Bước A: Tìm toàn bộ đơn hàng trong DB có CustomerId trùng với ID truyền lên
                var orders = await _context.Orders
                    .Where(o => o.CustomerId == customerId)
                    .OrderByDescending(o => o.Id) // Đơn hàng mới nhất xếp lên đầu
                    .ToListAsync();

                // Bước B: Biến đổi dữ liệu trạng thái số sang chữ Tiếng Việt trước khi trả về cho ReactJS
                var result = orders.Select(o => new
                {
                    id = o.Id,
                    orderDate = o.OrderDate.ToString("dd/MM/yyyy HH:mm"),
                    notes = o.Notes,
                    statusCode = o.Status,
                    // Đồng bộ trạng thái khớp hoàn toàn với giao diện Admin của Tiên
                    statusText = o.Status == 0 ? "Chờ xử lý" :
                                 o.Status == 1 ? "Đang giao hàng" : "Hoàn thành"
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi lấy dữ liệu lịch sử đơn hàng", detail = ex.Message });
            }
        }
    }

    // LỚP DTO TRUNG GIAN ĐỂ HỨNG DỮ LIỆU TỪ FRONTEND TRUYỀN LÊN
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string Notes { get; set; }
        public string? TrackingNumber { get; set; }
        public string? ShippingProvider { get; set; }
    }
}