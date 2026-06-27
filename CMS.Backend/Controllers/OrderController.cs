/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-21
 * Ngay cap nhat: 2026-06-27
 * Version: 2.0 (Tự động gửi email thông báo kèm link tra cứu hành trình khi Admin bấm duyệt giao hàng)
 */
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

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
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails!)
                .ThenInclude(d => d.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return NotFound();

            return View(order);
        }

        // =========================================================================
        // 🌟 3. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG & TỰ ĐỘNG GỬI EMAIL TRA CỨU
        // =========================================================================
        [HttpPost]
        public async Task<IActionResult> UpdateStatus(int id, int status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                order.Status = status; // Cập nhật trạng thái mới (0, 1, 2...)
                _context.Orders.Update(order);
                await _context.SaveChangesAsync();

                // 🔥 ĐOẠN ĐỒ ÁN XỊN: Nếu trạng thái chuyển sang số 1 (Đang giao hàng)
                if (status == 1)
                {
                    try
                    {
                        // Sinh mã vận đơn ngẫu nhiên để khách tra cứu cho chuyên nghiệp
                        string randomTrackingCode = "TIENCMS" + id + "VN";

                        // Đường dẫn link dẫn về trang ReactJS tra cứu của Tiên
                        string trackingLink = $"http://localhost:3000/track-order?code={randomTrackingCode}";

                        // ⚠️ LƯU Ý: Thay email nhận bằng email thật để test (hoặc nếu bảng Orders của Tiên có trường Email/Customer thì truyền vào nhé)
                        string testCustomerEmail = "lethicamtien.2123@gmail.com";
                        string customerName = "Khách Hàng Của TienCMS";

                        // Kích hoạt hàm gửi Mail chạy ngầm
                        await SendShippingEmailAsync(testCustomerEmail, customerName, randomTrackingCode, trackingLink);
                    }
                    catch (Exception ex)
                    {
                        // Nếu lỡ cấu hình mail sai thì hệ thống vẫn đổi trạng thái, không bị đứng trang
                        TempData["MailError"] = "Lỗi gửi mail: " + ex.Message;
                    }
                }
            }
            return RedirectToAction("Index"); // Cập nhật xong quay lại danh sách luôn
        }

        // =========================================================================
        // 📧 HÀM PHỤ GỬI EMAIL SMTP GOOGLE TRỰC TIẾP TỪ BACKEND
        // =========================================================================
        private async Task SendShippingEmailAsync(string toEmail, string customerName, string trackingCode, string trackingUrl)
        {
            // 🌟 CẤU HÌNH THÔNG TIN NGƯỜI GỬI (SHOP CỦA TIÊN)
            var fromAddress = new MailAddress("support@tiencms.retail", "TienCMS Fashion");
            var toAddress = new MailAddress(toEmail, customerName);

            // ⚠️ MẸO: Chỗ này Tiên điền email gmail thật và "Mật khẩu ứng dụng" (App Password) của Tiên vào nhé
            string fromGmail = "Dien_Email_Cua_Tien_Vao_Day@gmail.com";
            string appPassword = "xxxx xxxx xxxx xxxx"; // 16 ký tự mật khẩu ứng dụng tạo từ bảo mật Google

            string subject = $"📦 ĐƠN HÀNG CỦA BẠN ĐANG TRÊN ĐƯỜNG GIAO - {trackingCode}";

            // Giao diện mail dạng HTML bắt mắt
            string body = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>
                    <h2 style='color: #005088; text-align: center;'>TienCMS.Fashion Thông Báo</h2>
                    <p>Chào <b>{customerName}</b>,</p>
                    <p>Đơn hàng cosplay thời trang thời thượng của bạn đã được đóng gói hoàn tất và đang trên đường bàn giao cho đơn vị vận chuyển siêu tốc!</p>
                    <div style='background-color: #f9f9f9; padding: 15px; border-left: 4px solid #005088; margin: 20px 0;'>
                        <p style='margin: 0;'><b>Mã tra cứu vận đơn:</b> <span style='color: #d9534f; font-weight: bold;'>{trackingCode}</span></p>
                        <p style='margin: 5px 0 0 0;'><b>Trạng thái:</b> Đang lấy hàng và đi giao</p>
                    </div>
                    <p>Tiên và hệ thống đã chuẩn bị sẵn một trang theo dõi hành trình thời gian thực dành riêng cho bạn. Hãy bấm vào nút bên dưới để theo dõi nhé:</p>
                    <div style='text-align: center; margin: 30px 0;'>
                        <a href='{trackingUrl}' style='background-color: #005088; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;'>🚚 THEO DÕI ĐƠN HÀNG NGAY</a>
                    </div>
                    <hr style='border: 0; border-top: 1px solid #eee;'/>
                    <p style='font-size: 12px; color: #888; text-align: center;'>Cảm ơn bạn đã tin tưởng lựa chọn TienCMS.Fashion! Chúc bạn một ngày tràn đầy năng lượng.</p>
                </div>";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromGmail, appPassword)
            };

            using (var message = new MailMessage(fromAddress, toAddress) { Subject = subject, Body = body, IsBodyHtml = true })
            {
                // Nếu đang dùng gmail thật cấu hình ở trên, đổi fromAddress thành new MailAddress(fromGmail, "TienCMS Fashion") luôn nhé
                message.From = new MailAddress(fromGmail, "TienCMS Fashion");
                await smtp.SendMailAsync(message);
            }
        }
    }
}