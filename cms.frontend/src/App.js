/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.0
 */

// src/App.js
import React from 'react';
// Import các thành phần lõi của thư viện điều hướng đường dẫn
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. IMPORT CÁC COMPONENT TOÀN CỤC (LAYOUT CHUNG)
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home/index';
import BlogListPage from './pages/blog/index';
import BlogDetail from './pages/blog/BlogDetail';
import Blog from './pages/blog-detail/index';
import Cart from './pages/cart/index';
import Checkout from './pages/checkout/index';
import ProductDetail from './pages/product-detail/index';
import Shop from './pages/shop/index';

import './App.css';

function App() {
    return (
        // Khởi tạo bộ định tuyến bao bọc toàn bộ ứng dụng Web
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-light">
                <Header />
                {/* KHU VỰC NỘI DUNG ĐỘNG (Thay đổi ruột tùy theo URL trên thanh địa chỉ) */}
                <main className="flex-grow-1">
                    <Routes>
                        {/* Cấu hình Trang chủ - Khớp hoàn toàn với địa chỉ "/home" */}
                        <Route path="/" element={<Home />} />

                        {/* 1. Đường dẫn đến trang danh sách toàn bộ tin tức */}
                        <Route path="/blog" element={<BlogListPage />} />

                        {/* 2. Đường dẫn đến trang chi tiết bài viết kèm mã ID động (:id) */}
                        <Route path="/post/:id" element={<BlogDetail />} />

                        {/* Cấu hình Trang Cửa hàng - Địa chỉ "/shop" */}
                        <Route path="/shop" element={<Shop />} />

                        {/* Cấu hình Trang Chi tiết sản phẩm - Sử dụng tham số động ":id" */}
                        <Route path="/product/:id" element={<ProductDetail />} />
                        {/* Ví dụ khi vào link: /product/5 -> useParams() sẽ lấy được id = 5 */}


                        {/* Cấu hình Trang Danh sách tin tức - Địa chỉ "/blog" */}
                        <Route path="/blog" element={<Blog />} />

                        {/* Cấu hình Trang Chi tiết bài viết - Địa chỉ "/blog/:id" */}
                        <Route path="/blog/:id" element={<BlogDetail />} />


                        {/* Cấu hình Trang Giỏ hàng cá nhân - Địa chỉ "/cart" */}
                        <Route path="/cart" element={<Cart />} />

                        {/* Cấu hình Trang Điền thông tin thanh toán - Địa chỉ "/checkout" */}
                        <Route path="/checkout" element={<Checkout />} />

                        {/* XỬ LÝ KỊCH BẢN TRANG LỖI 404 (Khi sinh viên gõ sai URL) */}
                        <Route path="*" element={
                            <div className="container text-center py-5 my-5">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/580/580185.png"
                                    alt="404"
                                    className="mb-4"
                                    style={{ width: '100px', opacity: 0.6 }}
                                />
                                <h2 className="fw-bold text-secondary">404 - KHÔNG TÌM THẤY TRANG</h2>
                                <p className="text-muted">Đường dẫn bạn truy cập không tồn tại trên hệ thống TienCMS.</p>
                                <a href="/" className="btn btn-dark btn-sm mt-2">Quay lại Trang Chủ</a>
                            </div>
                        } />
                    </Routes>
                </main>
                <Footer />

            </div>
        </Router>
    );
}


export default App;
