/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-18
 * Version: 1.3 (Sửa triệt để lỗi thiếu dấu phẩy giữa các hàm)
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
    }, // <-- DẤU PHẨY THẦN THÁNH Ở ĐÂY NHA TIÊN, Nãy bị thiếu dấu này nè!

    // *
    //  * API Endpoint: POST https:localhost:7127/api/Customers/login
    
    // loginCustomer: async (loginData) => {
    //     try {
    //         const response = await axiosClient.post('/Customers/login', loginData);
    //         return response;
    //     } catch (error) {
    //         console.error("Lỗi API loginCustomer:", error);
    //         throw error;
    //     }
    // }
};

export default authService;