import React from 'react';
import ProductCard from '../../components/ProductCard'; // Sử dụng lại thẻ card sản phẩm dùng chung

function ProductList({ products, loading }) {
    if (loading) {
        return (
            <div className="text-center my-5 py-5">
                <div className="spinner-border text-info" role="status"></div>
                <p className="text-muted mt-2 small">Đang tìm mẫu thời trang phù hợp...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center my-5 py-5 border rounded bg-white shadow-sm">
                <i className="fas fa-box-open text-muted mb-3" style={{ fontSize: '40px' }}></i>
                <p className="text-secondary font-weight-bold mb-0">Không tìm thấy sản phẩm nào phù hợp.</p>
                <small className="text-muted">Vui lòng chọn danh mục hoặc khoảng giá khác.</small>
            </div>
        );
    }

    return (
        <div className="row">
            {products.map((prod) => {
                // BẪY LỖI: Nếu phần tử này vì lý do nào đó bị undefined/null, bỏ qua không render để không sập trang
                if (!prod) return null;

                return (
                    <div className="col-md-4 mb-4" key={prod.id || prod.Id}>
                        {/* Đổ từng sản phẩm vào thẻ card dùng chung */}
                        <ProductCard product={prod} />
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList;