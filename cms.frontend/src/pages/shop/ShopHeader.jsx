/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Ngay cap nhat: 2026-06-27
 * Version: 2.0 (Kích hoạt tính năng tìm kiếm thời gian thực bằng cách nhận props từ file cha)
 */
import React from 'react';

// 🌟 SỬA ĐÂY: Nhận thêm 2 thuộc tính searchTerm và onSearchChange từ file cha Shop truyền xuống
function ShopHeader({ total = 0, searchTerm = '', onSearchChange }) {
    return (
        <div className="shop-header-wrapper d-flex justify-content-between align-items-center p-3 mb-4 bg-white rounded shadow-sm border">
            {/* Hiển thị số lượng sản phẩm động nhận từ file cha */}
            <div className="text-secondary font-weight-bold" style={{ fontSize: '15px' }}>
                Tìm thấy <span className="text-primary">{total}</span> sản phẩm
            </div>

            {/* Ô tìm kiếm nhanh thời gian thực theo mô tả đồ án */}
            <div className="search-box-wrapper" style={{ width: '300px' }}>
                <div className="input-group input-group-sm">
                    <input
                        type="text"
                        className="form-control border-right-0"
                        placeholder="Gõ từ khóa tìm mẫu váy, đầm..."
                        style={{ borderRadius: '4px 0 0 4px' }}

                        // 🌟 THẦN CHÚ ĐÂY RỒI: Kết nối ô nhập với State hệ thống
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text bg-white text-muted border-left-0" style={{ borderRadius: '0 4px 4px 0' }}>
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopHeader;