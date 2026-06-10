/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

import React, { useEffect, useState } from "react";
import orderDetailService from "../services/orderDetailService";

const OrderDetailList = () => {

    const [details, setDetails] = useState([]);

    useEffect(() => {

        const fetchDetails = async () => {

            const data =
                await orderDetailService.getAllOrderDetails();

            setDetails(data);
        };

        fetchDetails();

    }, []);

    return (
        <div>

            <h3>Chi tiết đơn hàng</h3>

            {details.map(item => (

                <div key={item.id}>

                    <p>
                        {item.product?.name}
                    </p>

                    <p>
                        SL: {item.quantity}
                    </p>

                    <p>
                        Giá: {item.unitPrice}
                    </p>

                </div>

            ))}

        </div>
    );
};

export default OrderDetailList;