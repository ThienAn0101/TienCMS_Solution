/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.0
 */

import React from 'react';
import CategoryProductList from './components/CategoryProductList';
import CategoryList from './components/CategoryList';
import BlogCategoryList from './components/BlogCategoryList';
import ProductList from './components/ProductList'; 
import PostList from './components/PostList';
import './App.css';

function App() {
    return (
        <div className="container mt-5">
            <header className="pb-3 mb-4 border-bottom">
                <span className="fs-4 font-weight-bold text-dark">
                    👗 FASHION BOUTIQUE - THỜI TRANG CÔNG SỞ & DẠ HỘI
                </span>
            </header>

            <div className="row">
                {/* CỘT TRÁI: CHỨA CÁC BỘ LỌC PHÂN LOẠI DỮ LIỆU */}
                <div className="col-md-4">
                    {/* Phân loại phục vụ thương mại điện tử (Đã làm ở buổi trước) */}
                    <CategoryList />

                    {/* BÀI TẬP TỰ LÀM: Phân loại phục vụ quản trị nội dung tin tức blog */}
                    <BlogCategoryList />
                </div>

                {/* Cột bên trái: Danh mục sản phẩm */}
                <div className="col-md-4">
                    <CategoryProductList />
                </div>

                {/* Cột bên phải: Danh sách sản phẩm thời trang tự làm */}
                <div className="col-md-8">
                    <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">Bộ sưu tập mới nhất</h4>
                    <ProductList />
                </div>

                {/* KHU VỰC 2: BLOG & BLOG CATEGORIES (Tin tức thời trang công sở, dạ hội) */}
                <div className="row mt-5">
                    <div className="col-12">
                        <PostList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
