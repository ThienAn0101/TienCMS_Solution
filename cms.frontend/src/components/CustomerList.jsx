/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-10
 * Version: 1.0
 */

import React, { useState, useEffect } from "react";
import customerService from "../services/customerService";

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        const fetchCustomers = async () => {

            const data =
                await customerService.getAllCustomers();

            setCustomers(data);
        };

        fetchCustomers();

    }, []);

    return (
        <div>
            <h3>Khách hàng</h3>

            {customers.map(customer => (

                <div key={customer.id}>
                    <p>{customer.fullName}</p>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                </div>

            ))}
        </div>
    );
};

export default CustomerList;