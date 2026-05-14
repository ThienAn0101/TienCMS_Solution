/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-14
 * Version: 1.0
 */

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data.Entities
{
    // Thuc the khach hang
    public class Customer
    {
        [Key]
        public int Id { get; set; } // ma khach hang, khoa chinh

        [Required]
        public string FullName { get; set; } // ten khach hang

        [Required]
        [EmailAddress]
        public string Email { get; set; } // email khach hang

        public string? Phone { get; set; } // so dien thoai khach hang

        public string? Address { get; set; } // dia chi khach hang

        [Required]
        public string Password { get; set; } // Lưu mật khẩu thô theo yêu cầu tối giản

        public virtual ICollection<Order>? Orders { get; set; }

    }
}
