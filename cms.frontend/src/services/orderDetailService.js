/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

import axiosClient from "../api/axiosClient";

const orderDetailService = {

    getAllOrderDetails: async () => {

        const response =
            await axiosClient.get("/OrderDetail");

        return response.data;
    }
};

export default orderDetailService;