/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-27
 * Version: 2.0 (Khắc phục hoàn toàn lỗi trống Mật khẩu và Địa chỉ, hỗ trợ ẩn/hiện chuỗi băm)
 */
import React, { useState } from 'react';

function Profile() {
    // Lấy thông tin khách hàng đang đăng nhập từ localStorage
    const currentUser = JSON.parse(localStorage.getItem('user')) || null;

    // Trạng thái ẩn/hiển thị chuỗi mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    if (!currentUser) {
        return (
            <div className="container my-5 text-center py-5">
                <div className="card shadow-sm p-5 col-md-6 mx-auto border-0">
                    <i className="fas fa-exclamation-circle fa-3x text-warning mb-3"></i>
                    <h5 className="text-danger fw-bold">Vui lòng đăng nhập tài khoản để xem hồ sơ cá nhân nha Tiên!</h5>
                </div>
            </div>
        );
    }

    // Lấy giá trị linh động phòng hờ Backend trả về chữ Hoa hoặc chữ Thường
    const passwordValue = currentUser.password || currentUser.Password || "••••••••";
    const addressValue = currentUser.address || currentUser.Address || "Chưa cập nhật địa chỉ mặc định";

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow border-0 rounded-lg">

                        {/* Header */}
                        <div className="card-header bg-primary text-white text-center py-4">
                            <div className="mb-2">
                                <i className="fas fa-user-circle fa-4x"></i>
                            </div>
                            <h4 className="m-0 font-weight-bold text-uppercase">HỒ SƠ CÁ NHÂN</h4>
                            <small className="opacity-80">Thành viên hệ thống TienCMS.Fashion</small>
                        </div>

                        {/* Body */}
                        <div className="card-body p-4">
                            <div className="mb-4 text-center">
                                <h5 className="font-weight-bold text-dark mb-1">
                                    {currentUser.fullName || currentUser.FullName}
                                </h5>
                                <span className="badge bg-success text-white px-3 py-1 rounded-pill">
                                    <i className="fas fa-check-circle mr-1"></i> Đã xác thực tài khoản
                                </span>
                            </div>

                            <hr className="my-3" />

                            <div className="profile-details">
                                {/* 1. Họ và Tên */}
                                <div className="form-group mb-3">
                                    <label className="text-muted small font-weight-bold mb-1">
                                        <i className="fas fa-user mr-2 text-primary"></i> Họ và Tên khách hàng
                                    </label>
                                    <div className="form-control bg-light border-0 py-2 font-weight-bold text-dark">
                                        {currentUser.fullName || currentUser.FullName}
                                    </div>
                                </div>

                                {/* 2. Số Điện Thoại */}
                                <div className="form-group mb-3">
                                    <label className="text-muted small font-weight-bold mb-1">
                                        <i className="fas fa-phone mr-2 text-primary"></i> Số điện thoại liên hệ
                                    </label>
                                    <div className="form-control bg-light border-0 py-2 text-dark">
                                        {currentUser.phone || currentUser.Phone || "Chưa cập nhật"}
                                    </div>
                                </div>

                                {/* 3. Địa Chỉ Email */}
                                <div className="form-group mb-3">
                                    <label className="text-muted small font-weight-bold mb-1">
                                        <i className="fas fa-envelope mr-2 text-primary"></i> Địa chỉ Email (Tài khoản)
                                    </label>
                                    <div className="form-control bg-light border-0 py-2 text-dark">
                                        {currentUser.email || currentUser.Email}
                                    </div>
                                </div>

                                {/* 4. Mật khẩu bảo mật */}
                                <div className="form-group mb-3">
                                    <label className="text-muted small font-weight-bold mb-1">
                                        <i className="fas fa-lock mr-2 text-primary"></i> Mật khẩu bảo mật trong DB
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control bg-light border-0 py-2 text-dark"
                                            value={passwordValue}
                                            readOnly
                                            style={{ fontSize: showPassword ? '13px' : '16px' }}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-outline-secondary border-0 bg-light text-muted"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{ zIndex: 5 }}
                                            >
                                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* 5. Địa chỉ nhận hàng */}
                                <div className="form-group mb-4">
                                    <label className="text-muted small font-weight-bold mb-1">
                                        <i className="fas fa-map-marker-alt mr-2 text-primary"></i> Địa chỉ giao/nhận hàng mặc định
                                    </label>
                                    <textarea
                                        className="form-control bg-light border-0 py-2 text-dark"
                                        rows="2"
                                        value={addressValue}
                                        readOnly
                                    ></textarea>
                                </div>
                            </div>

                            {/* Nút hành động */}
                            <div className="text-center mt-2">
                                <button className="btn btn-primary btn-block py-2 font-weight-bold text-uppercase">
                                    <i className="fas fa-user-edit mr-2"></i> Cập nhật thông tin hồ sơ
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;