/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-18
 * Ngay cap nhat: 2026-06-27
 * Version: 2.6 (Nhận mảng sản phẩm cắt sẵn và làm cầu nối truyền tiếp onAddToCart)
 */
import React from 'react';
import ProductCard from './ProductCard'; // Đảm bảo đúng đường dẫn tới file ProductCard của bạn

// 🌟 NHẬN PROPS: Lấy dữ liệu sản phẩm đã lọc và hàm thêm vào giỏ từ Shop/index truyền xuống
const ProductList = ({ products, loading, onAddToCart }) => {

    if (loading) {
        return (
            <div className="text-center my-5 py-5">
                <div className="spinner-border text-primary mb-2" role="status"></div>
                <div className="text-muted">Đang tải danh sách sản phẩm...</div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="alert alert-secondary text-center my-5 py-4" role="alert">
                <i className="fas fa-box-open fs-3 mb-2 d-block text-muted"></i>
                <h5>Không tìm thấy sản phẩm nào!</h5>
                <p className="text-muted mb-0 small">Thử nới rộng khoảng giá hoặc chọn danh mục khác xem sao Tiên nhé.</p>
            </div>
        );
    }

    return (
        <div className="row">
            {products.map((item) => (
                <div className="col-md-4 mb-4" key={item.id || item.Id}>
                    {/* 🌟 MẮT XÍCH QUAN TRỌNG: Truyền tiếp hàm onAddToCart xuống cho từng thẻ ProductCard */}
                    <ProductCard
                        product={item}
                        onAddToCart={onAddToCart}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductList;