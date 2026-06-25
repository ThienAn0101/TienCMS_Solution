/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-18
 * Version: 1.0 (Xử lý chi tiết sản phẩm & Chặn bán vượt kho)
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../../services/productService';

function ProductDetail() {
    const { id } = useParams(); // Lấy ID sản phẩm từ thanh URL của trình duyệt
    const navigate = useNavigate();

    // 1. Khai báo các State quản lý dữ liệu
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // State lưu số lượng khách chọn mua (mặc định bằng 1)

    // 2. Gọi API lấy thông tin chi tiết sản phẩm ngay khi nạp trang
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetail();
    }, [id]);

    // 3. LOGIC CỐT LÕI: Hàm xử lý thêm vào giỏ hàng và kiểm tra StockQuantity
    const handleAddToCart = () => {
        // Đồng bộ thuộc tính số lượng kho từ Backend (chữ Hoa hoặc chữ Thường)
        const stockAvailable = product.stockQuantity ?? product.StockQuantity ?? 0;

        // KIỂM TRA CHẶN LỖI BÁN VƯỢT KHO Theo yêu cầu đồ án
        if (quantity > stockAvailable) {
            alert(`⚠️ Số lượng trong kho không đủ! Hiện tại kho chỉ còn ${stockAvailable} sản phẩm.`);
            return; // Kích hoạt lệnh chặn lại, không cho chạy tiếp xuống dưới
        }

        // Nếu hợp lệ, xử lý đưa vào giỏ hàng (Localstorage hoặc Redux...)
        alert(`🎉 Chúc mừng Le Thi Cam Tien thêm thành công ${quantity} sản phẩm vào giỏ hàng!`);
    };

    // Tăng giảm số lượng bấm nút ô Input
    const changeQuantity = (num) => {
        if (quantity + num < 1) return;
        setQuantity(quantity + num);
    };

    if (loading) {
        return (
            <div className="container my-5 text-center py-5">
                <div className="spinner-border text-info" role="status"></div>
                <p className="text-muted mt-2">Đang tải thông tin chi tiết sản phẩm...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container my-5 text-center py-5 border rounded bg-white">
                <h5 className="text-danger">Không tìm thấy sản phẩm hoặc sản phẩm không tồn tại!</h5>
                <button className="btn btn-primary btn-sm mt-3" onClick={() => navigate('/shop')}>Quay lại Cửa hàng</button>
            </div>
        );
    }

    // Đọc các trường dữ liệu an toàn từ đối tượng product
    const title = product.name || product.Name || "Sản phẩm không có tên";
    const price = product.price || product.Price || 0;
    const description = product.description || product.Description || "Mô tả sản phẩm đang được cập nhật.";
    const stock = product.stockQuantity ?? product.StockQuantity ?? 0;

    // Xử lý ảnh đại diện lớn cố định
    const rawImgUrl = product.imageUrl || product.ImageUrl || product.image || product.Image;
    const finalImageUrl = rawImgUrl
        ? (rawImgUrl.startsWith('http') ? rawImgUrl : `https://localhost:7127${rawImgUrl}`)
        : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600';

    return (
        <div className="container my-5">
            {/* Nút quay lại tiện ích */}
            <button className="btn btn-light btn-sm mb-4 border" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left mr-2"></i> Quay lại trang trước
            </button>

            <div className="row bg-white p-4 rounded shadow-sm border">

                {/* CỘT TRÁI: 1 Ảnh đại diện lớn cố định (Không làm slide ảnh) */}
                <div className="col-md-6 mb-4 mb-md-0">
                    <div className="product-detail-image border rounded overflow-hidden" style={{ height: '480px' }}>
                        <img
                            src={finalImageUrl}
                            className="w-100 h-100"
                            alt={title}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* CỘT PHẢI: Toàn bộ thông tin chữ và cụm nút hành động */}
                <div className="col-md-6 d-flex flex-column justify-content-between pl-md-4">
                    <div>
                        {/* Tên sản phẩm */}
                        <h2 className="font-weight-bold text-dark mb-3" style={{ fontSize: '28px' }}>{title}</h2>

                        {/* Giá bán */}
                        <h3 className="text-danger font-weight-bold mb-4" style={{ fontSize: '24px' }}>
                            {price.toLocaleString('vi-VN')} đ
                        </h3>

                        <hr />

                        {/* Trường số lượng hàng hiện có trong kho */}
                        <p className="text-secondary mb-3" style={{ fontSize: '15px' }}>
                            <i className="fas fa-warehouse mr-2 text-info"></i>
                            Trạng thái kho: <span className={`font-weight-bold ${stock > 0 ? 'text-success' : 'text-danger'}`}>
                                {stock > 0 ? `Còn ${stock} sản phẩm` : 'Hết hàng'}
                            </span>
                        </p>

                        {/* Mô tả sản phẩm */}
                        <div className="product-desc mb-4">
                            <h6 className="font-weight-bold text-dark mb-2">Mô tả sản phẩm:</h6>
                            <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '14px' }}>{description}</p>
                        </div>
                    </div>

                    {/* Cụm chọn số lượng & nút Bấm hành động */}
                    <div className="action-area border-top pt-4">
                        <div className="d-flex align-items-center mb-4">
                            <span className="font-weight-bold mr-3 text-secondary" style={{ fontSize: '14px' }}>Số lượng mua:</span>

                            {/* Ô nhập/tăng giảm số lượng */}
                            <div className="input-group" style={{ width: '130px' }}>
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary px-3" type="button" onClick={() => changeQuantity(-1)}>-</button>
                                </div>
                                <input
                                    type="text"
                                    className="form-control text-center font-weight-bold bg-white"
                                    value={quantity}
                                    readOnly
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary px-3" type="button" onClick={() => changeQuantity(1)}>+</button>
                                </div>
                            </div>
                        </div>

                        {/* Nút bấm Thêm vào giỏ hàng */}
                        <button
                            className="btn btn-block text-white font-weight-bold py-3 text-uppercase"
                            style={{
                                backgroundColor: '#11CAA0', // Màu thương hiệu đồng bộ menu của Tiên
                                borderRadius: '10px',
                                fontSize: '15px',
                                border: 'none',
                                transition: '0.3s'
                            }}
                            disabled={stock === 0} // Vô hiệu hóa nút nếu kho bằng 0
                            onClick={handleAddToCart}
                        >
                            <i className="fas fa-cart-plus mr-2"></i> Thêm vào giỏ hàng
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProductDetail;