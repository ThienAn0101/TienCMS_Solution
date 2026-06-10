/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

import axiosClient from '../api/axiosClient';

const categoryService = {
    getAllCategories: async () => {
        const data = await axiosClient.get('/categories');
        return data;
    }
};

export default categoryService;