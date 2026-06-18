/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.0
 */
import axiosClient from '../api/axiosClient';

const categoryProductService = {
    getAllCategoryProducts: async () => {
        try {
            // SỬA Ở ĐÂY: Viết hoa chữ C và chữ P cho khớp với tên Controller bên Backend
            const url = 'CategoryProducts';
            const response = await axiosClient.get(url);
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllCategoryProducts:", error);
            throw error;
        }
    }
};
export default categoryProductService;