/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay cap nhat: 2026-06-27
 * Version: 2.2 (Lọc linh động tự động lấy 4 sản phẩm mới nhất và giá trị nhất cho trang chủ)
 */
import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import ProductCard from '../../components/ProductCard';

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                const allProducts = Array.isArray(data) ? data : [];

                // 🌟 THUẬT TOÁN LỌC LINH ĐỘNG TỰ ĐỘNG:
                // Sắp xếp sản phẩm theo ID giảm dần (để lấy đồ mới lên trước)
                // Nếu ID bằng nhau hoặc ngẫu nhiên, sẽ ưu tiên sản phẩm có Giá (Price) cao nhất lên đầu.
                const dynamicSorted = allProducts.sort((a, b) => {
                    const idA = a.id || a.Id || 0;
                    const idB = b.id || b.Id || 0;

                    const priceA = a.price || a.Price || 0;
                    const priceB = b.price || b.Price || 0;

                    // Công thức tính điểm ưu tiên linh động: Đồ mới + Đồ giá trị
                    return (idB + priceB) - (idA + priceA);
                });

                // 🌟 Tự động cắt lấy 4 sản phẩm đứng đầu sau khi sắp xếp linh động
                const top4Products = dynamicSorted.slice(0, 4);

                setProducts(top4Products);
            } catch (error) {
                console.error("Lỗi hệ thống khi tải danh sách sản phẩm:", error);
                setProducts([]);
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
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 mb-4 px-2" key={product.id || product.Id}>
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