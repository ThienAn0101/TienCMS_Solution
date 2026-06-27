/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-27
 * Ngay cap nhat: 2026-06-27
 * Version: 3.0 (Hỗ trợ luồng Mua ngay song song Giỏ hàng, tự động điền thông tin tài khoản đang login)
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import orderService from '../../services/orderService';

function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isBuyNow, setIsBuyNow] = useState(false); // Cờ hiệu phân biệt luồng mua

    // State quản lý thông tin Form khách hàng nhập
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        shippingAddress: '',
        orderNotes: '',
        paymentMethod: 'COD'
    });

    // 1. Tự động kiểm tra dữ liệu Mua ngay hoặc Giỏ hàng + Tự điền thông tin tài khoản
    useEffect(() => {
        // 🌟 BƯỚC A: Đọc thông tin user đang login để tự điền thông tin (Auto-fill)
        const storedCustomer = localStorage.getItem('customer') || localStorage.getItem('user');
        if (storedCustomer) {
            try {
                const user = JSON.parse(storedCustomer);
                setFormData(prev => ({
                    ...prev,
                    fullName: user.fullName || user.FullName || user.name || '',
                    phoneNumber: user.phone || user.Phone || user.phoneNumber || '',
                    shippingAddress: user.address || user.Address || ''
                }));
            } catch (err) {
                console.error("Lỗi đọc thông tin user:", err);
            }
        }

        // 🌟 BƯỚC B: Ưu tiên lọc luồng "Mua ngay" trước, nếu không có mới lấy "Giỏ hàng"
        const buyNowData = localStorage.getItem('buy_now_item');
        if (buyNowData) {
            try {
                const singleItem = JSON.parse(buyNowData);
                setCartItems([singleItem]); // Biến đối tượng đơn lẻ thành mảng 1 phần tử
                setIsBuyNow(true);          // Đánh dấu đây là đơn mua ngay
            } catch (error) {
                console.error("Lỗi đọc dữ liệu Mua Ngay:", error);
            }
        } else {
            // Luồng lấy giỏ hàng thông thường như cũ của Tiên
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                    setIsBuyNow(false);
                } catch (error) {
                    console.error("Lỗi đọc dữ liệu giỏ hàng tại Checkout:", error);
                    setCartItems([]);
                }
            }
        }
    }, []);

    // 2. Tính tổng tiền đơn hàng
    const totalAmount = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

    // 3. Hàm bắt sự kiện thay đổi dữ liệu trong các ô Input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 4. Hàm xử lý nhấn nút ĐẶT HÀNG
    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!formData.fullName.trim()) {
            alert("⚠️ Vui lòng nhập Họ và tên người nhận hàng!");
            return;
        }
        if (!formData.phoneNumber.trim()) {
            alert("⚠️ Vui lòng nhập Số điện thoại giao hàng!");
            return;
        }
        if (!formData.shippingAddress.trim()) {
            alert("⚠️ Vui lòng nhập Địa chỉ nhận hàng chi tiết!");
            return;
        }

        try {
            const storedCustomer = localStorage.getItem('customer') || localStorage.getItem('user');
            let currentId = 1;

            if (storedCustomer) {
                const parsedCustomer = JSON.parse(storedCustomer);
                currentId = parsedCustomer.id || parsedCustomer.Id || parsedCustomer.customerId || 1;
            }

            // Chuẩn hóa dữ liệu gửi lên API Orders trùng khớp cấu trúc Backend C#
            const orderPayload = {
                CustomerId: parseInt(currentId),
                FullName: formData.fullName,
                Phone: formData.phoneNumber,
                Address: formData.shippingAddress,
                Notes: formData.orderNotes,
                PaymentMethod: formData.paymentMethod,
                TotalAmount: totalAmount,
                OrderDetails: cartItems.map(item => ({
                    ProductId: item.id || item.productId, // Linh động ID sản phẩm
                    Quantity: item.quantity,
                    Price: item.price
                }))
            };

            await orderService.createOrder(orderPayload);

            alert(`🎉 Đặt hàng thành công!\n📦 Đơn hàng trị giá ${totalAmount.toLocaleString('vi-VN')} đ đã được lưu vào hệ thống Admin.`);

            // 🌟 BƯỚC C: Xóa bỏ dữ liệu tạm tương ứng sau khi đặt mua thành công
            if (isBuyNow) {
                localStorage.removeItem('buy_now_item'); // Xóa bộ nhớ tạm mua ngay
            } else {
                localStorage.removeItem('cart'); // Xóa giỏ hàng như cũ
                window.dispatchEvent(new Event('cartUpdated')); // Reset số icon giỏ hàng
            }

            // Điều hướng Tiên thẳng về trang lịch sử đơn hàng để kiểm tra kết quả đổ dữ liệu
            navigate('/my-orders');

        } catch (error) {
            console.error("Lỗi khi gửi API đặt hàng:", error);
            alert("❌ Đặt hàng thất bại! Tiên hãy kiểm tra lại kết nối dự án nhé.");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container my-5 text-center py-5">
                <div className="alert alert-warning py-4 shadow-sm mx-auto" style={{ maxWidth: '600px', borderRadius: '8px' }}>
                    <i className="fas fa-shopping-cart text-warning mb-3" style={{ fontSize: '30px' }}></i>
                    <h5>Không có sản phẩm nào để thanh toán!</h5>
                    <p className="text-muted small">Vui lòng quay lại cửa hàng chọn sản phẩm trước khi vào trang này.</p>
                    <Link to="/shop" className="btn btn-primary font-weight-bold px-4 mt-2">
                        Quay lại Cửa Hàng
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 fw-bold text-dark text-uppercase" style={{ letterSpacing: '0.5px' }}>
                Tiến hành thanh toán {isBuyNow && <span className="badge bg-danger fs-6.5 tại-chỗ">Mua Ngay</span>}
            </h2>

            <form onSubmit={handlePlaceOrder}>
                <div className="row">
                    {/* CỘT TRÁI: Form Nhập Thông Tin Nhận Hàng */}
                    <div className="col-lg-7 mb-4">
                        <div className="card shadow-sm border-0 p-4 bg-white" style={{ borderRadius: '8px' }}>
                            <h5 className="fw-bold text-dark mb-4 border-bottom pb-2">
                                <i className="far fa-address-card text-info me-2"></i>Thông tin giao hàng
                            </h5>

                            <div className="mb-3">
                                <label className="form-label font-weight-bold text-secondary small">Họ và tên người nhận <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    placeholder="Ví dụ: Lê Thị Cẩm Tiên"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label font-weight-bold text-secondary small">Số điện thoại <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    placeholder="Ví dụ: 090xxxxxxxx"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label font-weight-bold text-secondary small">Địa chỉ nhận hàng chi tiết <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="shippingAddress"
                                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                                    value={formData.shippingAddress}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label font-weight-bold text-secondary small">Ghi chú đơn hàng (Tùy chọn)</label>
                                <textarea
                                    className="form-control"
                                    name="orderNotes"
                                    rows="3"
                                    placeholder="Ghi chú về thời gian giao hàng, chỉ dẫn đường đi..."
                                    value={formData.orderNotes}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: Tóm Tắt Đơn Hàng & Phương Thức Thanh Toán */}
                    <div className="col-lg-5">
                        <div className="card shadow-sm border-0 p-4 bg-white mb-4" style={{ borderRadius: '8px' }}>
                            <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Đơn hàng của bạn</h5>

                            <div className="checkout-items-list mb-3" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                {cartItems.map((item, idx) => {
                                    const IMAGE_BASE_URL = "https://localhost:7127";
                                    const rawImg = item.image || item.imageUrl || "";
                                    const finalImgUrl = rawImg.startsWith('http') ? rawImg : `${IMAGE_BASE_URL}${rawImg}`;

                                    return (
                                        <div key={item.id || idx} className="d-flex align-items-center justify-content-between py-2 border-bottom">
                                            <div className="d-flex align-items-center text-truncate pe-2">
                                                <img
                                                    src={finalImgUrl}
                                                    alt={item.name}
                                                    className="rounded border me-2"
                                                    style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=100" }}
                                                />
                                                <div className="text-truncate">
                                                    <span className="fw-bold text-dark small d-block text-truncate" style={{ maxWidth: '180px' }}>{item.name}</span>
                                                    <span className="text-muted x-small">Số lượng: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <span className="fw-semibold text-secondary small flex-shrink-0">
                                                {((item.price || 0) * item.quantity).toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="d-flex justify-content-between mb-2 text-muted small">
                                <span>Tạm tính tổng sản phẩm:</span>
                                <span className="fw-semibold text-dark">{totalAmount.toLocaleString('vi-VN')} đ</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 text-muted small">
                                <span>Phí vận chuyển giao hàng:</span>
                                <span className="text-success font-weight-bold">Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-bold text-dark">Tổng tiền thành tiền:</span>
                                <span className="fw-bold text-danger fs-4">
                                    {totalAmount.toLocaleString('vi-VN')} đ
                                </span>
                            </div>
                        </div>

                        <div className="card shadow-sm border-0 p-4 bg-light mb-4" style={{ borderRadius: '8px' }}>
                            <h6 className="fw-bold text-dark mb-3">Phương thức thanh toán</h6>
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="payCOD"
                                    value="COD"
                                    checked={formData.paymentMethod === 'COD'}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label text-dark small fw-semibold" htmlFor="payCOD">
                                    💵 Thanh toán khi nhận hàng (COD)
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="payBank"
                                    value="BANK"
                                    checked={formData.paymentMethod === 'BANK'}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label text-dark small fw-semibold" htmlFor="payBank">
                                    🏦 Chuyển khoản ngân hàng qua mã QR
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success btn-lg w-100 fw-bold shadow-sm"
                            style={{ backgroundColor: '#11CAA0', borderColor: '#11CAA0', borderRadius: '8px', fontSize: '16px' }}
                        >
                            <i className="fas fa-check-circle me-2"></i> XÁC NHẬN ĐẶT HÀNG NGAY
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;