/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-14
 * Version: 1.0
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data.Entities
{
    // Thuc the nguoi dung
    public class User
    {
        public int Id { get; set; } // ma nguoi dung, khoa chinh
        public string Username { get; set; } // ten nguoi dung
        public string PasswordHash { get; set; } // mat khau nguoi dung
        public string FullName { get; set; } // ten ddaay du cua nguoi dung
        public string Role { get; set; } // Quản trị viên hoặc Biên tập viên

    }
}
