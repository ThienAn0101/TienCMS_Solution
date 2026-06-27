/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Version: 4.5 (Tích hợp giao diện ô nhập Tìm kiếm Khoảng Giá Min-Max đồng bộ theo mẫu image_e583ac.jpg)
 */
import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

// 🌟 NHẬN THÊM CÁC PROPS KHOẢNG GIÁ TỪ FILE SHOP ĐƯA XUỐNG
function ShopSidebar({ activeId, onSelectCategory, minPrice, maxPrice, setMinPrice, setMaxPrice }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryProductService.getAllCategoryProducts();
                setCategories(Array.isArray(data) ? data : (data.data || []));
            } catch (error) {
                console.error("Không nạp được danh mục ShopSidebar:", error);
            }
        };
        loadCategories();
    }, []);

    return (
        <div className="shop-sidebar-wrapper p-3 border rounded bg-white shadow-sm" style={{ borderRadius: '12px' }}>

            {/* ─── DANH MỤC SẢN PHẨM ─── */}
            <h5 className="font-weight-bold text-uppercase text-dark mb-3" style={{ fontSize: '15px', color: '#005088' }}>
                <i className="fas fa-filter text-primary mr-2"></i> Danh Mục
            </h5>

            <div className="list-group list-group-flush mb-4">
                {/* Nút mặc định: Tất cả sản phẩm */}
                <button
                    type="button"
                    className={`list-group-item list-group-item-action border-0 font-weight-bold py-2 px-3 rounded mb-1 text-left ${activeId === null ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                    style={{ fontSize: '14px', transition: '0.2s' }}
                    onClick={() => onSelectCategory(null)}
                >
                    <i className="fas fa-angle-right mr-2"></i> Tất cả sản phẩm
                </button>

                {/* Vòng lặp các danh mục động từ SQL Server */}
                {categories.map((cat) => {
                    const id = cat.id || cat.Id;
                    const name = cat.name || cat.Name;
                    const isSelected = activeId === id;

                    return (
                        <button
                            key={id}
                            type="button"
                            className={`list-group-item list-group-item-action border-0 py-2 px-3 rounded mb-1 text-left ${isSelected ? 'bg-info text-white font-weight-bold' : 'text-secondary bg-transparent'}`}
                            style={{ fontSize: '14px', transition: '0.2s' }}
                            onClick={() => onSelectCategory(id)}
                        >
                            <i className="fas fa-angle-right mr-2"></i> {name}
                        </button>
                    );
                })}
            </div>

            <hr className="my-3" style={{ borderColor: '#eee' }} />

            {/* ─── 🌟 GIAO DIỆN BỘ LỌC KHOẢNG GIÁ THEO MẪU IMAGE_E583AC.JPG ─── */}
            <div className="price-filter-section">
                <h5 className="font-weight-bold text-uppercase mb-3" style={{ color: '#005088', fontSize: '15px' }}>
                    <i className="fas fa-tags mr-2 text-info"></i> Khoảng Giá (đ)
                </h5>

                {/* Ô nhập giá trị tối thiểu (Min) */}
                <div className="form-group mb-2">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-light text-secondary border-right-0" style={{ fontSize: '13px' }}>Từ</span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            style={{ fontSize: '13px' }}
                        />
                    </div>
                </div>

                {/* Ô nhập giá trị tối đa (Max) */}
                <div className="form-group mb-3">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-light text-secondary border-right-0" style={{ fontSize: '13px' }}>Đến</span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="999.000..."
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            style={{ fontSize: '13px' }}
                        />
                    </div>
                </div>

                {/* Nút hỗ trợ xóa nhanh bộ lọc để hiển thị lại toàn bộ */}
                {(minPrice !== '' || maxPrice !== '') && (
                    <button
                        className="btn btn-outline-danger btn-sm w-100 font-weight-bold shadow-sm transition-all"
                        onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                        style={{ borderRadius: '20px', fontSize: '12px', padding: '5px' }}
                    >
                        <i className="fas fa-trash-alt mr-1"></i> Xóa bộ lọc giá
                    </button>
                )}
            </div>

        </div>
    );
}

export default ShopSidebar;