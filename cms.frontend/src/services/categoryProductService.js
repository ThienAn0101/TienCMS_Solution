/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.1 (Sửa lỗi chính tả định tuyến URL & Thêm bẫy lỗi async/await)
 */

import axiosClient from '../api/axiosClient';

const categoryProductService = {
    /**
     * Hàm lấy toàn bộ danh mục SẢN PHẨM từ Backend
     * Endpoint này kết nối tới CategoryProductController trong ASP.NET Core
     */
    getAllCategoryProducts: async () => {
        try {
            // SỬA LỖI: Đổi từ '/categoriesproducts' thành '/CategoryProducts' để khớp chuẩn Backend của bạn
            const url = '/CategoryProducts';

            const response = await axiosClient.get(url);
            return response;
        } catch (error) {
            console.error("Lỗi API getAllCategoryProducts của sinh viên Le Thi Cam Tien:", error);
            return []; // Trả về mảng rỗng để không bị đứng giao diện
        }
    }
};

export default categoryProductService;