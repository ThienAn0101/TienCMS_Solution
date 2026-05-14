/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-14
 * Version: 1.0
 */

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data.Entities
{
    // Thuc the san pham
    public class Product
    {
        [Key]
        public int Id { get; set; } // ma san pham, khoa chinh

        [Required(ErrorMessage = "Tên sản phẩm không được để trống")]
        public string Name { get; set; } // ten san pham

        public string? Description { get; set; } // mo ta san pham

        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } // gia san pham

        public int StockQuantity { get; set; } // so luong san pham 

        public string? ImageUrl { get; set; } // anh san pham

        // Khóa ngoại nối tới CategoryProduct
        public int CategoryProductId { get; set; } // ma danh muc san pham

        [ForeignKey("CategoryProductId")]
        public virtual CategoryProduct? CategoryProduct { get; set; }

    }
}
