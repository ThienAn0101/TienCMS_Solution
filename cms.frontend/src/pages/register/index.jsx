/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Version: 4.0 (Đồng bộ chuẩn hóa các thuộc tính sang C# CustomerRegisterDto và sửa lỗi hiện thị [object Object])
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

function Register() {
    const navigate = useNavigate();

    // State bọc tập trung toàn bộ dữ liệu ô nhập liệu
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });

    // Hàm lắng nghe sự kiện gõ chữ để cập nhật State động
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // LOGIC VALIDATION (BẮT LỖI) TRƯỚC KHI GỬI LỆNH XUỐNG BACKEND
    const validateForm = () => {
        if (!formData.fullName || !formData.email || !formData.password) {
            alert("⛔ LỖI: Vui lòng không bỏ trống Họ tên, Email và Mật khẩu!");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("⛔ LỖI: Định dạng Email không hợp lệ (Ví dụ đúng: NguyenVanA@gmail.com)!");
            return false;
        }

        if (formData.password.length < 6) {
            alert("⛔ LỖI: Mật khẩu phải chứa ít nhất 6 ký tự để đảm bảo an toàn!");
            return false;
        }

        return true;
    };

    // Hàm xử lý khi người dùng nhấn nút Đăng Ký Ngay
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Chạy hàm kiểm tra form trước khi gọi API
        if (!validateForm()) return;

        try {
            // 🌟 ĐỒNG BỘ ĐỘC QUYỀN: Gửi object khớp 100% cấu trúc thuộc tính CustomerRegisterDto bên C#
            const response = await authService.registerCustomer({
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                password: formData.password
            });

            // Nếu Axios nhận dữ liệu thành công
            alert("🎉 ĐĂNG KÝ THÀNH CÔNG TÀI KHOẢN MỚI RỒI NHA TIÊN!");
            navigate('/login'); // Tự động chuyển hướng Tiên sang trang đăng nhập

        } catch (error) {
            console.error("Chi tiết lỗi Đăng ký:", error);

            // 🌟 SỬA DỨT ĐIỂM LỖI [object Object]: Bóc tách chuẩn chuỗi thông báo từ API trả lên
            let errorMsg = "Vui lòng kiểm tra lại cấu hình hệ thống!";
            if (error.response && error.response.data) {
                errorMsg = error.response.data.message || error.response.data;
            } else if (error.message) {
                errorMsg = error.message;
            }

            alert("🚨 ĐĂNG KÝ THẤT BẠI: " + errorMsg);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0 p-4" style={{ borderRadius: '15px' }}>
                        <h3 className="text-center font-weight-bold text-uppercase mb-4" style={{ color: '#005088' }}>
                            Đăng Ký Tài Khoản
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold text-secondary">Họ và Tên *</label>
                                <input type="text" name="fullName" value={formData.fullName} className="form-control" onChange={handleChange} placeholder="Nhập họ và tên của bạn" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="small font-weight-bold text-secondary">Email (Tài khoản đăng nhập) *</label>
                                <input type="email" name="email" value={formData.email} className="form-control" onChange={handleChange} placeholder="example@gmail.com" required />
                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group mb-3">
                                    <label className="small font-weight-bold text-secondary">Số Điện Thoại</label>
                                    <input type="text" name="phone" value={formData.phone} className="form-control" onChange={handleChange} placeholder="090xxxxxxx" />
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label className="small font-weight-bold text-secondary">Mật Khẩu *</label>
                                    <input type="password" name="password" value={formData.password} className="form-control" onChange={handleChange} placeholder="Tối thiểu 6 ký tự" required />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label className="small font-weight-bold text-secondary">Địa Chỉ Nhận Hàng</label>
                                <textarea name="address" value={formData.address} className="form-control" rows="2" onChange={handleChange} placeholder="Nhập số nhà, tên đường, quận/huyện..."></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block w-100 py-2 font-weight-bold shadow-sm" style={{ backgroundColor: '#005088', borderColor: '#005088', borderRadius: '8px' }}>
                                ĐĂNG KÝ NGAY
                            </button>
                        </form>
                        <p className="text-center mt-3 small m-0 text-muted">
                            Đã có tài khoản thành viên? <Link to="/login" className="font-weight-bold text-primary">Đăng nhập tại đây</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;