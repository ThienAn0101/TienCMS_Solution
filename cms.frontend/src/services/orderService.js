/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

import axiosClient from "../api/axiosClient";

const orderService = {

    getAllOrders: async () => {

        const response =
            await axiosClient.get("/Order");

        return response.data;
    }
};

export default orderService;