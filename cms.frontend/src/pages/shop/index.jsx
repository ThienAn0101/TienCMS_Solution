/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-18
 * Version: 1.2 (Sửa logic hiển thị Tất Cả Sản Phẩm)
 */
import React, { useState, useEffect } from 'react';
import ShopSidebar from './ShopSidebar';
import ShopHeader from './ShopHeader';
import ProductList from './ProductList';
import productService from '../../services/productService';

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Mặc định null là Tất cả sản phẩm

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                setLoading(true);
                let data;

                // CHỈNH SỬA LOGIC PHÂN NHÁNH TẠI ĐÂY:
                if (selectedCategoryId === null) {
                    // Nếu không chọn danh mục nào cụ thể -> Gọi hàm lấy TOÀN BỘ sản phẩm
                    data = await productService.getAllProducts();
                } else {
                    // Nếu có ID danh mục (Áo, Quần...) -> Gọi hàm lọc sản phẩm theo danh mục đó
                    data = await productService.getProductsByCategory(selectedCategoryId);
                }

                // Bóc tách dữ liệu mảng an toàn từ Axios
                const listResult = Array.isArray(data) ? data : (data.data || []);
                setProducts(listResult);
            } catch (error) {
                console.error("Lỗi nạp sản phẩm cửa hàng:", error);
                setProducts([]); // Nếu lỗi thì gán mảng rỗng để giao diện không bị crash
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredProducts();
    }, [selectedCategoryId]); // Chạy lại mỗi khi khách hàng bấm chuyển đổi danh mục

    return (
        <div className="container my-5">
            <div className="row">
                {/* CỘT TRÁI (col-md-3): Chứa danh mục dọc */}
                <div className="col-md-3">
                    <ShopSidebar
                        activeId={selectedCategoryId}
                        onSelectCategory={setSelectedCategoryId}
                    />
                </div>

                {/* CỘT PHẢI (col-md-9): Khu vực hiển thị lưới sản phẩm */}
                <div className="col-md-9">
                    {/* Hiển thị thanh tiêu đề số lượng sản phẩm */}
                    <ShopHeader total={products.length} />

                    {/* Danh sách lưới sản phẩm */}
                    <ProductList products={products} loading={loading} />
                </div>
            </div>
        </div>
    );
}

export default Shop;