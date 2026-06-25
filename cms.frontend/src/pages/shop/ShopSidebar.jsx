import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

function ShopSidebar({ activeId, onSelectCategory }) {
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
        <div className="shop-sidebar-wrapper p-3 border rounded bg-light shadow-sm">
            <h5 className="font-weight-bold text-uppercase text-dark mb-3" style={{ fontSize: '15px' }}>
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

            {/* Điểm mở rộng đồ án: Chỗ này Tiên sẽ viết tiếp 2 ô nhập khoảng giá Min-Max */}
        </div>
    );
}

export default ShopSidebar;