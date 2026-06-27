/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Ngay cap nhat: 2026-06-27
 * Version: 2.0 
 */
import axiosClient from "../api/axiosClient";

const orderService = {

    // 1. Hàm lấy toàn bộ đơn hàng (Dành cho trang Admin xem danh sách)
    getAllOrders: async () => {
        const response = await axiosClient.get("/Order");
        return response.data;
    },

    // 🌟 2. HÀM MỚI BỔ SUNG: Gửi đơn hàng từ trang Checkout lên Cơ sở dữ liệu
    createOrder: async (orderData) => {
        // Thực hiện lệnh POST đến endpoint "/Order" kèm theo dữ liệu khách hàng + giỏ hàng
        const response = await axiosClient.post("/Orders", orderData);
        return response.data;
    }
};

export default orderService;