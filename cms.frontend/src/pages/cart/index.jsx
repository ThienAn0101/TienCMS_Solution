/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-27
 * Ngay cap nhat: 2026-06-27
 * Version: 3.0 (Sửa triệt để lỗi đơ nút đặt hàng, sửa vòng lặp useEffect và ép điều hướng navigate)
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    // 🌟 Hàm đọc dữ liệu thực từ LocalStorage
    const loadCartData = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
                // Tự động tích chọn tất cả sản phẩm khi load dữ liệu lần đầu
                if (parsedCart.length > 0 && selectedItems.length === 0) {
                    setSelectedItems(parsedCart.map(item => item.id));
                }
            } catch (error) {
                console.error("Lỗi phân tích JSON giỏ hàng:", error);
                setCartItems([]);
            }
        } else {
            setCartItems([]);
        }
    };

    // 🌟 SỬA LỖI VÒNG LẶP VÔ TẬN: Chỉ chạy load dữ liệu 1 lần duy nhất khi component mount 
    // và khi có sự kiện hệ thống cập nhật giỏ hàng.
    useEffect(() => {
        loadCartData();

        const handleCartUpdateEvent = () => {
            loadCartData();
        };

        window.addEventListener('cartUpdated', handleCartUpdateEvent);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdateEvent);
        };
    }, []); // 👈 Để mảng rỗng để không bị re-render vô hạn làm đơ nút bấm

    // Hàm xử lý nút "TIẾN HÀNH ĐẶT HÀNG" chuẩn Single Page Application
    const handleGoToCheckout = (e) => {
        e.preventDefault(); // Chặn hành vi load lại trang mặc định

        if (cartItems.length === 0) {
            alert("⚠️ Giỏ hàng của bạn đang trống!");
            return;
        }

        // Kiểm tra xem người dùng có tích chọn sản phẩm nào để mua không
        const itemsToBuy = cartItems.filter(item => selectedItems.includes(item.id));
        if (itemsToBuy.length === 0) {
            alert("⚠️ Vui lòng chọn ít nhất một sản phẩm để tiến hành thanh toán!");
            return;
        }

        // 🌟 Điều hướng mượt mà sang trang thanh toán không cần F5
        navigate('/checkout');
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(cartItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (productId) => {
        setSelectedItems(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setSelectedItems(prev => prev.filter(itemId => itemId !== id));

        window.dispatchEvent(new Event('cartUpdated'));
    };

    const totalAmount = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container my-5">
            <h2 className="mb-4 fw-bold text-dark">GIỎ HÀNG CỦA BẠN</h2>
            {cartItems.length === 0 ? (
                <div className="alert alert-warning text-center py-4">
                    <h5>Giỏ hàng đang trống!</h5>
                    <Link to="/shop" className="btn btn-primary mt-3">Quay lại Cửa Hàng mua sắm liền</Link>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card shadow-sm p-3 mb-4">
                            {/* Checkbox chọn tất cả */}
                            <div className="form-check mb-3 ms-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="selectAll"
                                    onChange={handleSelectAll}
                                    checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                                />
                                <label className="form-check-label fw-semibold text-muted" htmlFor="selectAll">
                                    Chọn tất cả ({cartItems.length} sản phẩm)
                                </label>
                            </div>

                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá tiền</th>
                                        <th>Số lượng</th>
                                        <th>Tổng cộng</th>
                                        <th className="text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => {
                                        const IMAGE_BASE_URL = "https://localhost:7127";
                                        const rawImg = item.image || item.imageUrl || "";
                                        const fallbackImg = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400";

                                        let finalImgUrl = fallbackImg;
                                        if (rawImg) {
                                            if (rawImg.startsWith('http')) {
                                                finalImgUrl = rawImg;
                                            } else if (rawImg.startsWith('/')) {
                                                finalImgUrl = `${IMAGE_BASE_URL}${rawImg}`;
                                            } else {
                                                finalImgUrl = `${IMAGE_BASE_URL}/${rawImg}`;
                                            }
                                        }

                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {/* Checkbox chọn từng món */}
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input me-3"
                                                            checked={selectedItems.includes(item.id)}
                                                            onChange={() => handleSelectItem(item.id)}
                                                        />
                                                        <img
                                                            src={finalImgUrl}
                                                            alt={item.name}
                                                            className="rounded me-3 border"
                                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                            onError={(e) => { e.target.src = fallbackImg; }}
                                                        />
                                                        <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: '160px' }}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{(item.price || 0).toLocaleString('vi-VN')} đ</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <button type="button" className="btn btn-sm btn-outline-secondary px-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                        <span className="mx-3 fw-bold">{item.quantity}</span>
                                                        <button type="button" className="btn btn-sm btn-outline-secondary px-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                    </div>
                                                </td>
                                                <td className="fw-bold text-primary">{((item.price || 0) * (item.quantity || 0)).toLocaleString('vi-VN')} đ</td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>🗑 Xóa</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow-sm p-4 bg-light">
                            <h4 className="fw-bold mb-3 border-bottom pb-2">Tóm tắt đơn hàng</h4>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Tạm tính:</span>
                                <strong>{totalAmount.toLocaleString('vi-VN')} đ</strong>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Phí giao hàng:</span>
                                <span className="text-success fw-bold">Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fs-5 fw-bold">Thành tiền:</span>
                                <span className="fs-4 fw-bold text-danger">{totalAmount.toLocaleString('vi-VN')} đ</span>
                            </div>

                            {/* 🌟 THAY THẾ THẺ LINK THÀNH BUTTON ĐỂ KÍCH HOẠT HÀM HANDLEGOTOCHECKOUT CHUẨN XÁC */}
                            <button
                                type="button"
                                className="btn btn-primary w-100 btn-lg fw-bold text-white"
                                onClick={handleGoToCheckout}
                            >
                                🛒 TIẾN HÀNH ĐẶT HÀNG
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;