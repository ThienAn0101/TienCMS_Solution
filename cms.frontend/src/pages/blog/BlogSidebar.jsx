// src/pages/blog/BlogSidebar.jsx
import React from 'react';

const BlogSidebar = ({ categories, activeCategory, onSelectCategory }) => {
    return (
        <div className="blog-sidebar bg-white p-4 rounded-lg shadow-sm border-0">
            {/* Tiêu đề sidebar */}
            <h5 className="font-weight-bold pb-2 mb-3 border-bottom text-uppercase text-dark" style={{ fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                <i className="fa-solid fa-list-ul text-info mr-2"></i> Danh mục tin tức
            </h5>

            {/* Danh sách các danh mục dưới dạng menu dọc */}
            <div className="list-group list-group-flush">
                {/* Lựa chọn mặc định: Tất cả bài viết */}
                <button
                    type="button"
                    className={`list-group-item list-group-item-action border-0 px-2 d-flex justify-content-between align-items-center font-weight-bold py-2 ${activeCategory === null ? 'text-info bg-light' : 'text-secondary'
                        }`}
                    onClick={() => onSelectCategory(null)}
                    style={{ fontSize: '0.85rem', borderRadius: '5px' }}
                >
                    <span>• Tất cả bài viết</span>
                </button>

                {/* Duyệt qua mảng Categories từ API backend */}
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        className={`list-group-item list-group-item-action border-0 px-2 d-flex justify-content-between align-items-center py-2 ${activeCategory === cat.id ? 'text-info font-weight-bold bg-light' : 'text-secondary'
                            }`}
                        onClick={() => onSelectCategory(cat.id)}
                        style={{ fontSize: '0.85rem', borderRadius: '5px' }}
                    >
                        <span>• {cat.name}</span>
                    </button>
                ))}
            </div>

            {/* Khối Note trang trí nhỏ */}
            <div className="mt-5 text-center p-3 rounded" style={{ backgroundColor: '#f8f9fa', border: '1px dashed #e0e0e0' }}>
                <h6 className="font-weight-bold text-dark small mb-2">Fashion Note</h6>
                <p className="text-muted text-justify mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
                    Cập nhật liên tục những xu hướng phối đồ công sở, dạ hội thịnh hành nhất và bí quyết bảo quản trang phục từ chuyên gia.
                </p>
            </div>
        </div>
    );
};

export default BlogSidebar;