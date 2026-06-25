/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.1 (Bổ sung tính năng lọc sản phẩm theo danh mục dọc)
 */
// Import cấu hình axiosClient dùng chung từ thư mục api
import axiosClient from '../api/axiosClient';

const productService = {
    /**
     * 1. Lấy danh sách toàn bộ sản phẩm thời trang
     * API Endpoint: GET https://localhost:7127/api/Products
     */
    getAllProducts: async () => {
        try {
            // Thực hiện gọi API GET để lấy danh sách sản phẩm
            const response = await axiosClient.get('/Products');

            // Trả về mảng dữ liệu sản phẩm (axiosClient đã giải nén data qua interceptor)
            return response;
        } catch (error) {
            console.error("Lỗi API getAllProducts:", error);
            throw error;
        }
    },

    /**
     * 2. Lấy thông tin chi tiết của một sản phẩm theo ID
     * API Endpoint: GET https://localhost:7127/api/Products/{id}
     */
    getProductById: async (id) => {
        try {
            const response = await axiosClient.get(`/Products/${id}`);
            return response;
        } catch (error) {
            console.error(`Lỗi API getProductById với ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * 3. BỔ SUNG MỚI: Lấy danh sách sản phẩm thuộc một danh mục cụ thể
     * Kết nối chính xác tới Endpoint bạn đã viết ở Backend: api/CategoryProducts/{id}/products
     */
    getProductsByCategory: async (categoryId) => {
        try {
            // Nhớ bỏ chữ /api/ ở đầu vì axiosClient.js đã cài sẵn baseURL có chữ /api rồi nha Tiên!
            const response = await axiosClient.get(`/CategoryProducts/${categoryId}/products`);
            return response;
        } catch (error) {
            console.error(`Lỗi API getProductsByCategory với ID ${categoryId}:`, error);
            throw error;
        }
    }
};

// CRITICAL: Xuất mặc định đối tượng này để file ProductGrid.jsx import vào không bị lỗi 'default was not found'
export default productService;