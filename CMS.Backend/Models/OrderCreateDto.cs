/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-04
 * Ngay cap nhat: 2026-06-27
 * Version: 2.0 (Nâng cấp cấu trúc Dto hỗ trợ đặt đơn hàng chứa nhiều sản phẩm từ giỏ hàng)
 */


using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace CMS.Backend.Models
{
    public class OrderCreateDto
    {
        // 🌟 BỔ SUNG TRƯỜNG NÀY: Để nhận ID của khách hàng đang đăng nhập
        [Required(ErrorMessage = "Thiếu mã khách hàng")]
        public int CustomerId { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập họ tên")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập địa chỉ giao hàng")]
        public string Address { get; set; }

        public string Notes { get; set; }
        public string PaymentMethod { get; set; }
        public decimal TotalAmount { get; set; }

        [Required(ErrorMessage = "Đơn hàng phải có ít nhất một sản phẩm")]
        public List<OrderDetailCreateDto> OrderDetails { get; set; }
    }

    public class OrderDetailCreateDto
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}