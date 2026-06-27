/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Version: 4.1 (Bổ sung thuộc tính value cho input và đồng bộ bóc tách dữ liệu sạch từ authService)
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

function Login() {
    const navigate = useNavigate();

    // State lưu trữ cặp tài nguyên đăng nhập từ người dùng
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Gọi API xác thực từ authService
            const response = await authService.login(credentials);

            // 🌟 ĐỒNG BỘ: Đọc an toàn từ cả response.data (nếu trả về response gốc)
            // hoặc chính response (nếu authService đã bóc .data từ trước)
            const data = response.data || response;

            if (data && data.user) {
                // 2. Lưu thông tin đăng nhập thành viên vào bộ nhớ trình duyệt
                localStorage.setItem('customer', JSON.stringify(data.user));
                localStorage.setItem('user', JSON.stringify(data.user));

                alert(`🎉 XÁC THỰC THÀNH CÔNG: Chào mừng ${data.user.fullName || data.user.FullName} đã đăng nhập hệ thống!`);

                // 3. Điều hướng quay lại trang chủ
                navigate('/');

                // Ép trình duyệt nạp lại để cập nhật giao diện Header ngay lập tức
                window.location.reload();
            } else {
                alert("⛔ ĐĂNG NHẬP THẤT BẠI: Cấu trúc phản hồi từ Server không khớp!");
            }
        } catch (error) {
            console.error("Chi tiết lỗi đăng nhập từ Server:", error);

            // Hiện câu chữ lỗi thật từ thông báo BadRequest của C# trả lên
            if (error.response && error.response.data && error.response.data.message) {
                alert("⛔ ĐĂNG NHẬP THẤT BẠI: " + error.response.data.message);
            } else {
                alert("⛔ ĐĂNG NHẬP THẤT BẠI: Sai tài khoản Email hoặc Mật khẩu không chính xác!");
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center py-5">
                <div className="col-md-4 col-sm-8">
                    <div className="card shadow-lg border-0 p-4" style={{ borderRadius: '15px' }}>
                        <div className="text-center mb-4">
                            <div className="icon-wrapper text-primary mb-2" style={{ fontSize: '50px' }}>
                                <i className="fas fa-user-shield"></i>
                            </div>
                            <h4 className="font-weight-bold text-uppercase m-0" style={{ color: '#005088', letterSpacing: '0.5px' }}>
                                ĐĂNG NHẬP HỆ THỐNG
                            </h4>
                        </div>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold text-secondary">TÀI KHOẢN EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={credentials.email} // 🌟 Bổ sung value đồng bộ State
                                    className="form-control"
                                    placeholder="example@gmail.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label className="small font-weight-bold text-secondary">MẬT KHẨU</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password} // 🌟 Bổ sung value đồng bộ State
                                    className="form-control"
                                    placeholder="******"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block w-100 py-2 font-weight-bold" style={{ backgroundColor: '#005088', borderColor: '#005088', borderRadius: '8px' }}>
                                ĐĂNG NHẬP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;