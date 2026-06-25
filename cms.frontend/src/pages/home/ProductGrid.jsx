/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-25
 * Version: 1.2 (Sửa lỗi lệch tên Props truyền vào ProductCard)
 */

import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
// IMPORT file thành phần component CON VÀO ĐỂ SỬ DỤNG
import ProductCard from '../../components/ProductCard';

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi hệ thống khi tải danh sách sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Đang tải danh sách trang phục mới nhất...</p>
            </div>
        );
    }

    return (
        <section className="product-grid-wrapper py-4">
            <div className="container">

                <div className="section-heading mb-4 d-flex justify-content-between align-items-center border-bottom pb-2">
                    <h4 className="font-weight-bold text-uppercase m-0" style={{ color: '#005088' }}>
                        <i className="fas fa-sparkles mr-2 text-warning"></i> Sản phẩm nổi bật
                    </h4>
                    <span className="text-muted" style={{ fontSize: '14px' }}>
                        Hiển thị ({products.length}) sản phẩm
                    </span>
                </div>

                {/* KHUNG LƯỚI GRID SYSTEM */}
                <div className="row">
                    {products.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">Chưa có sản phẩm nào trong hệ thống.</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            // Sử dụng cấu trúc đồng bộ id từ cả thuộc tính chữ hoa/thường của API
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 mb-4 px-2" key={product.id || product.Id}>
                                {/* SỬA LỖI: Đổi từ item={product} thành product={product} để khớp với component con */}
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
}

export default ProductGrid;