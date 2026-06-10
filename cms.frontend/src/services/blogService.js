/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.0
 */

import axiosClient from '../api/axiosClient';

const blogService = {
    // Hàm gọi API lấy danh mục các chủ đề bài viết
    getBlogCategories: () => {
        const url = '/Categories'; // Khớp với Route quản lý chuyên mục tin tức ở Backend
        return axiosClient.get(url);
    },

    // 1. Hàm gọi API lấy toàn bộ các bài viết (Mẹo phối đồ, tin tức thời trang)
    getAllPosts: () => {
        const url = '/Posts'; // Khớp với Route quản lý bài viết ở Backend
        return axiosClient.get(url);
    },

    // 2. Hàm lấy chi tiết 1 bài viết theo ID (Phục vụ trang xem chi tiết sau này)
    getPostById: (id) => {
        const url = `/Posts/${id}`;
        return axiosClient.get(url);
    },
};

export default blogService;
