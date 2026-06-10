/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

import React, { useState, useEffect } from "react";
import orderService from "../services/orderService";

const OrderList = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {

            const data =
                await orderService.getAllOrders();

            setOrders(data);
        };

        fetchOrders();

    }, []);

    return (
        <div>

            <h3>Đơn hàng</h3>

            {orders.map(order => (

                <div key={order.id}>

                    <p>Mã đơn: {order.id}</p>

                    <p>
                        Khách hàng:
                        {order.customer?.fullName}
                    </p>

                    <p>
                        Trạng thái:
                        {order.status}
                    </p>

                </div>

            ))}
        </div>
    );
};

export default OrderList;