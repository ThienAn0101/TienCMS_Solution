/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-05-21
 * Version: 1.0
 */


using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var products = _context.Products.ToList();

            return View(products);
        }

        //----------------------------------- DETAILS --------------------------------
        public IActionResult Details(int id)
        {
            var product = _context.Products
                .Include(p => p.CategoryProduct)
                .FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        // -------------------------------- CREATE --------------------------------
        // Hàm hiển thị giao diện Form điền thông tin sản phẩm mới (Mặc định là HttpGet)
        [HttpGet]
        public IActionResult Create()
        {
            // Nạp danh sách nhóm sản phẩm từ Database đổ vào Dropdown để chọn
            ViewBag.CategoryProductList = new SelectList(_context.CategoriesProducts, "Id", "Name");

            // Trả về file giao diện Views/Product/Create.cshtml
            return View();
        }
        // Hàm xử lý hứng dữ liệu từ Form gửi lên để thêm mới Sản phẩm vào Database
        [HttpPost]
        public async Task<IActionResult> Create(Product model, IFormFile uploadImage)
        {
            // 1. Kiểm tra xem người dùng có chọn file ảnh sản phẩm để tải lên không
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Định nghĩa đường dẫn lưu file vật lý: wwwroot/uploads/products
                // Tách riêng thư mục "products" để ảnh sách không bị lẫn lộn với ảnh bài viết nhé Tiên
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products");

                // Tự động tạo thư mục lưu trữ trên máy chủ nếu nó chưa tồn tại
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                // 2. Tạo tên file duy nhất bằng mã GUID để tránh việc khách hàng upload trùng tên file làm đè ảnh cũ
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                // 3. Tiến hành chép luồng dữ liệu file ảnh vào thư mục vừa định nghĩa
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                // 4. Lưu đường dẫn ảo vào thuộc tính ImageUrl của thực thể Product để hiển thị lên giao diện
                model.ImageUrl = "/uploads/products/" + fileName;
            }

            // 5. Thêm thực thể sản phẩm (Sách) mới vào bộ ngữ cảnh bảng Products
            _context.Products.Add(model);

            // 6. Chốt lệnh lưu toàn bộ thay đổi xuống SQL Server bằng lệnh bất đồng bộ
            await _context.SaveChangesAsync();

            // 7. Lưu thành công, điều hướng người dùng quay trở về trang Danh sách sản phẩm (Index)
            return RedirectToAction("Index");
        }

        //-------------------------------- DELETE --------------------------------
        public IActionResult Delete(int id)
        {
            // 1. Tìm bài viết theo Id
            var product = _context.Products.Find(id);

            if (product != null)
            {
                // 2. Xóa khỏi bộ nhớ tạm
                _context.Products.Remove(product);

                // 3. Cập nhật xuống SQL Server
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        //-------------------------------- EDIT (GET) --------------------------------
        // Hàm lấy thông tin sản phẩm cũ từ database và điền sẵn vào Form chỉnh sửa
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            // 1. Tìm sản phẩm theo mã ID truyền vào
            var product = await _context.Products.FindAsync(id);

            // Nếu không tìm thấy sản phẩm, trả về trang lỗi 404
            if (product == null) return NotFound();

            // 2. Chuẩn bị lại danh sách danh mục sản phẩm (bảng CategoriesProducts trong SSMS)
            // Chọn sẵn danh mục hiện tại của sản phẩm (product.CategoryProductId)
            ViewBag.CategoryProductList = new SelectList(_context.CategoriesProducts, "Id", "Name", product.CategoryProductId);

            // 3. Trả về file giao diện Views/Product/Edit.cshtml kèm dữ liệu cũ của sản phẩm
            return View(product);
        }

        //-------------------------------- EDIT (POST) --------------------------------
        // Hàm thực hiện nhận dữ liệu đã chỉnh sửa từ Form và cập nhật xuống SQL Server
        [HttpPost]
        public async Task<IActionResult> Edit(Product model, IFormFile uploadImage)
        {
            // Bước 1: Kiểm tra xem người dùng có bấm chọn file ảnh mới cho sản phẩm hay không
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Định nghĩa thư mục lưu ảnh sản phẩm: wwwroot/uploads/products
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "products");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                // Tạo tên file ảnh ngẫu nhiên bằng GUID để không bị trùng lặp file
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                // Sao chép dữ liệu file ảnh vào thư mục máy chủ
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                // Gán đường dẫn ảnh mới vào model sản phẩm
                model.ImageUrl = "/uploads/products/" + fileName;
            }
            else
            {
                // MẸO QUAN TRỌNG: Nếu người dùng không upload ảnh mới (chỉ sửa giá, tên, hoặc số lượng...)
                // Tiến hành tìm lại bản ghi cũ trong database dựa vào AsNoTracking để lấy lại ImageUrl gốc
                // Tránh tình trạng Entity Framework ghi đè chuỗi rỗng làm mất ảnh sản phẩm/bìa sách hiện tại
                var oldProduct = await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == model.Id);
                if (oldProduct != null && string.IsNullOrEmpty(model.ImageUrl))
                {
                    model.ImageUrl = oldProduct.ImageUrl;
                }
            }

            // Bước 2: Ra lệnh cập nhật toàn bộ thông tin mới của sản phẩm (Name, Price, StockQuantity, Description...)
            _context.Products.Update(model);

            // Bước 3: Chốt lệnh lưu các thay đổi xuống database SQL Server
            await _context.SaveChangesAsync();

            // Cập nhật thành công, điều hướng quay lại trang Danh sách sản phẩm (Index)
            return RedirectToAction("Index");
        }
    }
}