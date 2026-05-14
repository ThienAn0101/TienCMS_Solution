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
    // Thuc the bai viet
    public class Post
    {
        public int Id { get; set; } // Ma bai viet, khoa chinh
        public string Title { get; set; } // Tiêu đề bài viết
        public string Content { get; set; } // Nội dung chi tiết
        public string ImageUrl { get; set; } // Hình ảnh đại diện
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        // Khóa ngoại liên kết tới Category
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

    }
}
