/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.1 (Tối ưu hóa bẫy lỗi API & Responsive layout)
 */
import React, { useState, useEffect } from 'react';
// Import dịch vụ gọi API danh mục sản phẩm đã thiết lập ở Buổi 7
import categoryProductService from '../../services/categoryProductService';

function CategoryMenu() {
    // 1. Khai báo State để lưu mảng danh mục sản phẩm từ SQL Server đổ về
    const [categories, setCategories] = useState([]);

    // 2. Khai báo State để theo dõi danh mục nào đang được người dùng bấm chọn (Mặc định là chọn tất cả - null)
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    // 3. Khai báo State quản lý trạng thái Loading dữ liệu mạng
    const [loading, setLoading] = useState(true);

    // 4. Gọi API ngay khi file thành phần component Tầng 3 được nạp lên trang chủ
    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                setLoading(true);
                // Gọi API thực tế thông qua Service đồng bộ async/await
                const data = await categoryProductService.getAllCategoryProducts();

                // BẪY LỖI: Phòng hờ dữ liệu Axios trả về chưa bóc tách hết hoặc bị bọc trong Object
                const listResult = Array.isArray(data) ? data : (data.data || []);
                setCategories(listResult);
            } catch (error) {
                console.error("Lỗi khi kéo danh mục sản phẩm từ Backend:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuCategories();
    }, []);

    // 5. Hàm xử lý khi khách hàng click chọn một danh mục thời trang cụ thể
    const handleCategoryClick = (id) => {
        setActiveCategoryId(id);
        // Điểm mở rộng đồ án: Nơi truyền Id này xuống ProductGrid để lọc sản phẩm
        console.log(`Sinh viên Le Thi Cam Tien xử lý lọc sản phẩm cho danh mục có ID: ${id}`);
    };

    // Giao diện tạm thời trong lúc hệ thống đang tải dữ liệu mạng
    if (loading) {
        return (
            <div className="container my-3 text-center">
                <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>Đang nạp menu phân loại...</span>
            </div>
        );
    }

    return (
        <section id="category-menu-section" className="category-menu-wrapper my-4">
            <div className="container">
                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div className="card-body p-2 bg-white">

                        {/* Thay đổi class sang flex-wrap và justify-content-center giúp menu tự động xuống dòng khi nhiều danh mục */}
                        <ul className="nav nav-pills flex-wrap justify-content-center flex-column flex-sm-row">

                            {/* Nút mặc định: Xem tất cả sản phẩm */}
                            <li className="nav-item m-1">
                                <button
                                    className={`nav-link w-100 font-weight-bold border-0 text-uppercase py-3 ${activeCategoryId === null ? 'active' : 'text-secondary bg-transparent'}`}
                                    style={{
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        backgroundColor: activeCategoryId === null ? '#005088' : 'transparent',
                                        color: activeCategoryId === null ? '#fff' : '#6c757d',
                                        transition: '0.3s'
                                    }}
                                    onClick={() => handleCategoryClick(null)}
                                >
                                    <i className="fas fa-th-large mr-2"></i> Tất cả sản phẩm
                                </button>
                            </li>

                            {/* VÒNG LẶP ĐỘNG: Kiểm tra mảng và duyệt mảng an toàn */}
                            {categories && categories.length > 0 && categories.map((cat) => {
                                // Bẫy lỗi chữ Hoa/Thường từ cơ sở dữ liệu SQL Server lên API C#
                                const catId = cat.id || cat.Id;
                                const catName = cat.name || cat.Name;

                                return (
                                    <li className="nav-item m-1" key={catId}>
                                        <button
                                            className={`nav-link w-100 font-weight-bold border-0 text-uppercase py-3 ${activeCategoryId === catId ? 'active' : 'text-secondary bg-transparent'}`}
                                            style={{
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                backgroundColor: activeCategoryId === catId ? '#11CAA0' : 'transparent',
                                                color: activeCategoryId === catId ? '#fff' : '#6c757d',
                                                transition: '0.3s'
                                            }}
                                            onClick={() => handleCategoryClick(catId)}
                                        >
                                            {/* Hiển thị tên danh mục thật */}
                                            {catName}
                                        </button>
                                    </li>
                                );
                            })}

                        </ul>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryMenu;