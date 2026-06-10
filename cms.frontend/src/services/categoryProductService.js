/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.0
 */

import axiosClient from '../api/axiosClient';

const categoryProductService = {
    /**
     * Hàm lấy toàn bộ danh mục SẢN PHẨM từ Backend
     * Endpoint này kết nối tới CategoryProductController trong ASP.NET Core
     */
    getAllCategoryProducts: () => {
        // Đường dẫn định tuyến khớp chính xác với cấu trúc định tuyến [Route("api/[controller]")] của Backend
        const url = '/categoriesproducts';
        return axiosClient.get(url);
    }
};

export default categoryProductService;
