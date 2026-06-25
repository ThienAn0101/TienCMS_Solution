/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.2 (Sửa lỗi bóc tách dữ liệu mảng $values từ ASP.NET Core Web API)
 */

import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

function CategoryMenu() {
    const [categories, setCategories] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryProductService.getAllCategoryProducts();

                // 🛑 IN LOG ĐỂ KIỂM TRA TRONG F12 CONSOLE
                console.log("Dữ liệu danh mục gốc từ Service:", data);

                let listResult = [];

                // BẪY LỖI ĐA TẦNG: Giải quyết triệt để lỗi bọc dữ liệu $values của C# .NET
                if (data) {
                    if (data.$values) {
                        listResult = data.$values;
                    } else if (data.data && data.data.$values) {
                        listResult = data.data.$values;
                    } else if (data.data && Array.isArray(data.data)) {
                        listResult = data.data;
                    } else if (Array.isArray(data)) {
                        listResult = data;
                    }
                }

                console.log("Dữ liệu danh mục sau khi bóc tách mảng thành công:", listResult);
                setCategories(listResult);
            } catch (error) {
                console.error("Lỗi khi kéo danh mục sản phẩm từ Backend:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuCategories();
    }, []);

    const handleCategoryClick = (id) => {
        setActiveCategoryId(id);
        console.log(`Sinh viên Le Thi Cam Tien xử lý lọc sản phẩm cho danh mục có ID: ${id}`);
    };

    if (loading) {
        return (
            <div className="container my-3 text-center">
                <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>Đang nạp menu phân loại...</span>
            </div>
        );
    }

    return (
        <section id="category-menu-section" className="category-menu-wrapper my-4">
            <div className="container">
                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div className="card-body p-2 bg-white">

                        <ul className="nav nav-pills flex-wrap justify-content-center flex-sm-row">

                            {/* Nút mặc định: Xem tất cả sản phẩm */}
                            <li className="nav-item m-1">
                                <button
                                    className={`nav-link font-weight-bold border-0 text-uppercase py-2 px-4 ${activeCategoryId === null ? 'active' : 'text-secondary bg-transparent'}`}
                                    style={{
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        backgroundColor: activeCategoryId === null ? '#005088' : 'transparent',
                                        color: activeCategoryId === null ? '#fff' : '#6c757d',
                                        transition: '0.3s'
                                    }}
                                    onClick={() => handleCategoryClick(null)}
                                >
                                    <i className="fas fa-th-large mr-2"></i> Tất cả sản phẩm
                                </button>
                            </li>

                            {/* VÒNG LẶP ĐỘNG: Duyệt danh sách các danh mục */}
                            {categories && categories.length > 0 && categories.map((cat) => {
                                const catId = cat.id || cat.Id;
                                const catName = cat.name || cat.Name;

                                return (
                                    <li className="nav-item m-1" key={catId}>
                                        <button
                                            className={`nav-link font-weight-bold border-0 text-uppercase py-2 px-4 ${activeCategoryId === catId ? 'active' : 'text-secondary bg-transparent'}`}
                                            style={{
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                backgroundColor: activeCategoryId === catId ? '#11CAA0' : 'transparent',
                                                color: activeCategoryId === catId ? '#fff' : '#6c757d',
                                                transition: '0.3s'
                                            }}
                                            onClick={() => handleCategoryClick(catId)}
                                        >
                                            {catName}
                                        </button>
                                    </li>
                                );
                            })}

                        </ul>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryMenu;