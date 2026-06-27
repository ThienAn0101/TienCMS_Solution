/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-18
 * Ngay cap nhat: 2026-06-27
 * Version: 3.0 (Đồng bộ luồng Mua Ngay vào LocalStorage kết hợp Router State chuyển hướng Checkout chuẩn số lượng 1)
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
    const navigate = useNavigate();

    if (!product) {
        return <div className="card h-100 p-3 text-center small text-muted">Lỗi dữ liệu sản phẩm</div>;
    }

    const id = product.id || product.Id;
    const title = product.name || product.Name || "Sản phẩm thời trang";
    const price = product.price || product.Price || 0;
    const stock = product.stock !== undefined ? product.stock : (product.Stock !== undefined ? product.Stock : 1);

    const rawImgUrl = product.imageUrl || product.ImageUrl || product.image || product.Image;
    const IMAGE_BASE_URL = "https://localhost:7127";
    const finalImageUrl = rawImgUrl
        ? (rawImgUrl.startsWith('http') ? rawImgUrl : `${IMAGE_BASE_URL}${rawImgUrl}`)
        : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400';

    return (
        <div className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden position-relative product-card-hover" style={{ transition: '0.3s' }}>

            {/* 1. Phần hình ảnh sản phẩm */}
            <div className="product-image-wrapper position-relative" style={{ height: '260px', overflow: 'hidden' }}>
                <img src={finalImageUrl} className="w-100 h-100" alt={title} style={{ objectFit: 'cover', transition: '0.5s' }} />
                <span className="badge badge-danger position-absolute" style={{ top: '10px', left: '10px', fontSize: '11px', padding: '5px 8px', backgroundColor: '#dc3545' }}>
                    Bán chạy / {stock > 0 ? `Còn ${stock} chiếc` : 'Hết hàng'}
                </span>
            </div>

            {/* 2. Phần nội dung chữ */}
            <div className="card-body p-3 d-flex flex-column justify-content-between bg-white">
                <h6 className="card-title text-dark font-weight-normal mb-2" title={title} style={{ fontSize: '14px', lineHeight: '1.4', height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {title}
                </h6>
                <p className="card-text text-danger font-weight-bold mb-0" style={{ fontSize: '15px' }}>
                    {price.toLocaleString('vi-VN')} <span style={{ textDecoration: 'underline', fontSize: '13px' }}>đ</span>
                </p>
            </div>

            {/* 3. Phần chân Card */}
            <div className="card-footer p-2 bg-white border-top-0 d-flex justify-content-between align-items-center" style={{ gap: '4px' }}>
                <button className="btn btn-outline-primary btn-sm font-weight-bold d-flex align-items-center justify-content-center" style={{ width: '48%', borderRadius: '8px', fontSize: '12px', padding: '6px 0' }} onClick={() => navigate(`/product/${id}`)}>
                    <i className="far fa-eye mr-1"></i> Chi tiết
                </button>

                {/* Nút Mua ngay - Màu xanh ngọc */}
                <button
                    className="btn btn-sm font-weight-bold text-white d-flex align-items-center justify-content-center"
                    style={{ width: '48%', borderRadius: '8px', fontSize: '12px', padding: '6px 0', backgroundColor: '#11CAA0', border: 'none' }}
                    onClick={() => {
                        // 🌟 BƯỚC 1: Đóng gói thông tin sản phẩm mua ngay chuẩn cấu trúc
                        const buyNowItem = {
                            id: id,
                            name: title,
                            price: price,
                            quantity: 1, // Luôn luôn cố định bằng 1 theo ý Tiên muốn nha!
                            image: finalImageUrl
                        };

                        // 🌟 BƯỚC 2: Lưu thẳng đối tượng này vào LocalStorage để làm biến cờ hiệu cho trang Checkout
                        localStorage.setItem('buy_now_item', JSON.stringify(buyNowItem));

                        // 🌟 BƯỚC 3: Kích hoạt chuyển hướng mượt mà sang trang Thanh toán kèm State dự phòng
                        navigate("/checkout", {
                            state: {
                                buyNow: true,
                                products: [buyNowItem]
                            }
                        });
                    }}
                >
                    <i className="fas fa-shopping-cart mr-1"></i> Mua ngay
                </button>
            </div>
        </div>
    );
}

export default ProductCard;