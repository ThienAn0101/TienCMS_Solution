/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Version: 2.1 (Tối ưu hóa việc truyền tham số đăng nhập và bóc tách dữ liệu sạch)
 */
import axiosClient from '../api/axiosClient';

const authService = {
    /**
     * Hàm gửi dữ liệu đăng ký tài khoản khách hàng mới xuống Backend
     */
    registerCustomer: async (customerData) => {
        try {
            const response = await axiosClient.post('/Customers', customerData);
            return response;
        } catch (error) {
            console.error("Lỗi API registerCustomer:", error);
            throw error;
        }
    },

    /**
     * Hàm gửi yêu cầu Đăng nhập xuống Backend
     */
    login: async (loginData) => {
        try {
            // Gửi trực tiếp loginData (chứa email và password viết thường) xuống Backend
            // Phía C# dynamic sẽ tự bóc tách được bất kể hoa thường
            const response = await axiosClient.post('/Customers/Login', loginData);

            // Lưu dữ liệu user sạch vào localStorage nếu có
            if (response.data && response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            // Trả về toàn bộ response gốc để file Login.jsx dễ xử lý mã trạng thái
            return response;
        } catch (error) {
            console.error("Lỗi API login:", error);
            throw error;
        }
    }
};

export default authService;