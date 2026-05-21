/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngày tạo: 2026-05-21
 * Version: 1.0
 */

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var orderDetails = _context.OrderDetails.ToList();

            return View(orderDetails);
        }
    }
}