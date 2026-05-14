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
    public class OrderDetail
    {
        // Thuc the chi tiet don hang
        [Key]
        public int Id { get; set; } // ma chi tiet don hang, khoa chinh

        public int OrderId { get; set; } // ma don hang

        public int ProductId { get; set; } // ma san pham

        public int Quantity { get; set; } // so luong 

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; } // Giá tại thời điểm mua

        [ForeignKey("OrderId")]
        public virtual Order? Order { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product? Product { get; set; }

    }
}
