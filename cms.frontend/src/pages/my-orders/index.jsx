/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-27
 * Version: 2.0 (Khắc phục hoàn toàn lỗi lệch pha API Endpoint và đồng bộ dữ liệu chuẩn với C# Backend)
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy thông tin user đăng nhập từ localStorage để lấy ID khách hàng
    const currentUser = JSON.parse(localStorage.getItem('user')) || null;

    useEffect(() => {
        const fetchMyOrders = async () => {
            if (!currentUser || (!currentUser.id && !currentUser.Id)) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // Lấy linh động ID phòng trường hợp Backend trả về chữ Hoa hoặc chữ Thường
                const userId = currentUser.id || currentUser.Id;

                // 🌟 ĐÃ SỬA: Gọi chuẩn xác API Endpoint của OrdersController kèm tham số query parameter
                const response = await axios.get(`http://localhost:7127/api/Orders/my-orders?customerId=${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, []);

    // 🌟 ĐÃ ĐỒNG BỘ: Hàm kiểm tra số trạng thái từ DB khớp với logic Admin của Tiên
    const renderStatusBadge = (status) => {
        switch (status) {
            case 0:
                return <span className="badge bg-warning text-dark p-2"><i className="fas fa-box mr-1"></i> Người bán đang chuẩn bị hàng</span>;
            case 1:
                return <span className="badge bg-primary text-white p-2"><i className="fas fa-shipping-fast mr-1"></i> Đang được vận chuyển</span>;
            case 2:
                return <span className="badge bg-success text-white p-2"><i className="fas fa-check-circle"></i> Giao thành công</span>;
            default:
                return <span className="badge bg-secondary text-white p-2">Đơn hàng đã hủy</span>;
        }
    };

    if (!currentUser) {
        return (
            <div className="container my-5 text-center py-5">
                <h5 className="text-danger fw-bold">Vui lòng đăng nhập để xem đơn hàng cá nhân nha Tiên!</h5>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container my-5 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Đang tải danh sách đơn hàng...</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="d-flex align-items-center mb-4 border-bottom pb-2">
                <h3 className="fw-bold text-uppercase m-0" style={{ color: '#005088' }}>
                    <i className="fas fa-shopping-bag mr-2 text-primary"></i> Đơn hàng của tôi
                </h3>
            </div>

            {orders.length === 0 ? (
                <div className="card shadow-sm p-5 text-center text-muted">
                    <i className="fas fa-receipt fa-3x mb-3 text-secondary"></i>
                    <h5>Tiên chưa có đơn hàng nào trên hệ thống hiện tại.</h5>
                </div>
            ) : (
                orders.map((order) => (
                    <div className="card shadow-sm mb-4 border-0 rounded-lg" key={order.id}>
                        {/* Header Đơn Hàng */}
                        <div className="card-header bg-light d-flex justify-content-between align-items-center py-3">
                            <div>
                                <span className="text-muted small">Mã đơn hàng:</span>
                                <strong className="text-dark ml-1">#{order.id}</strong>
                                <span className="text-muted small ml-3">Ngày đặt: {order.orderDate}</span>
                            </div>
                            <div>
                                {/* 🌟 Đọc trạng thái statusCode chữ thường từ đối tượng map DTO */}
                                {renderStatusBadge(order.statusCode)}
                            </div>
                        </div>

                        {/* Body Đơn Hàng - Danh Sách Sản Phẩm */}
                        <div className="card-body p-4">
                            <h6 className="fw-bold border-bottom pb-2 text-secondary"><i className="fas fa-tshirt mr-1"></i> Ghi chú & Chi tiết</h6>

                            <p className="text-muted small"><b>Ghi chú đơn hàng:</b> {order.notes || "Không có ghi chú nào"}</p>

                            {/* Thông Tin Người Nhận */}
                            <div className="row mt-4 bg-light p-3 rounded mx-0">
                                <div className="col-md-7 border-right">
                                    <h6 className="fw-bold text-secondary mb-2"><i className="fas fa-user-circle mr-1"></i> Thông tin giao hàng</h6>
                                    <p className="m-0 small text-dark"><b>Họ tên người mua:</b> {currentUser.fullName || currentUser.FullName}</p>
                                    <p className="m-0 small text-dark"><b>Số điện thoại:</b> {currentUser.phone || currentUser.Phone}</p>
                                    <p className="m-0 small text-dark"><b>Địa chỉ nhận hàng:</b> {currentUser.address || currentUser.Address || "Hà Tĩnh"}</p>
                                </div>
                                <div className="col-md-5 d-flex flex-column justify-content-center align-items-md-end mt-3 mt-md-0">
                                    <span className="text-muted small">Trạng thái xử lý nội bộ:</span>
                                    <h4 className="fw-bold text-primary m-0 mt-1">
                                        {order.statusText}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyOrders;