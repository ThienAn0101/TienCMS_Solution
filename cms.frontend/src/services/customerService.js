/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

import axiosClient from "../api/axiosClient";

const customerService = {

    getAllCustomers: async () => {

        const response =
            await axiosClient.get("/Customer");

        return response.data;
    }
};

export default customerService;