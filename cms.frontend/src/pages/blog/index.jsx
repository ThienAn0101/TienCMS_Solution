// src/pages/blog/index.jsx
import React, { useState, useEffect } from 'react';
import blogService from '../../services/blogService';

import BlogCard from '../../components/BlogCard';
import BlogSidebar from './BlogSidebar';

const BlogListPage = () => {
    // 1. Quản lý trạng thái dữ liệu bài viết, danh mục và trạng thái tải (loading)
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null nghĩa là xem "Tất cả"
    const [loading, setLoading] = useState(true);

    // 2. Chạy một lần duy nhất khi trang được tải để nạp danh mục thanh bên Sidebar
    useEffect(() => {
        const loadSidebarCategories = async () => {
            try {
                const catData = await blogService.getBlogCategories();
                setCategories(catData || []);
            } catch (err) {
                console.error("Không thể tải danh mục Sidebar:", err);
            }
        };
        loadSidebarCategories();
    }, []);

    // 3. Tự động chạy lại mỗi khi biến selectedCategoryId thay đổi (Lọc dữ liệu theo danh mục)
    useEffect(() => {
        const loadPostsData = async () => {
            setLoading(true);
            try {
                let postsData = [];
                if (selectedCategoryId === null) {
                    // Nếu không chọn danh mục cụ thể -> Gọi hàm lấy hết bài viết
                    postsData = await blogService.getAllPosts();
                } else {
                    // Nếu click chọn danh mục -> Gọi hàm lọc theo ID danh mục
                    postsData = await blogService.getPostsByCategory(selectedCategoryId);
                }
                setPosts(postsData || []);
            } catch (err) {
                console.error("Lỗi nạp danh sách bài viết:", err);
            } finally {
                setLoading(false);
            }
        };

        loadPostsData();
    }, [selectedCategoryId]); // Lắng nghe sự thay đổi của danh mục lọc tại đây

    return (
        <div className="container my-4">
            {/* Thanh điều hướng chỉ dẫn (Breadcrumb) */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent p-0 mb-4" style={{ fontSize: '0.8rem' }}>
                    <li className="breadcrumb-item"><a href="/" className="text-secondary text-decoration-none">Trang chủ</a></li>
                    <li className="breadcrumb-item active text-dark font-weight-bold" aria-current="page">Cẩm nang tin tức</li>
                </ol>
            </nav>

            {/* Bố cục chính chia cột */}
            <div className="row">

                {/* CỘT TRÁI - HIỂN THỊ LƯỚI BÀI VIẾT (Chiếm 75% -> col-md-9) */}
                <div className="col-md-9">
                    <div className="mb-3 border-bottom pb-2">
                        <h4 className="font-weight-bold text-dark text-uppercase mb-0" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                            {selectedCategoryId === null ? '⚡ Xu hướng mới nhất' : '📰 Bài viết theo chủ đề'}
                        </h4>
                    </div>

                    {loading ? (
                        /* Hiển thị hiệu ứng tải dữ liệu nhẹ */
                        <div className="text-center py-5">
                            <div className="spinner-border text-info" role="status"></div>
                            <p className="text-muted small mt-2">Đang tải tin tức thời trang...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        /* Trường hợp không có dữ liệu trả về */
                        <div className="bg-white text-center py-5 rounded shadow-sm border">
                            <i className="fa-regular fa-folder-open text-muted fa-2x mb-3"></i>
                            <p className="text-muted mb-0 small">Hiện tại chưa có bài viết nào thuộc chủ đề này.</p>
                        </div>
                    ) : (
                        /* Thực hiện vòng lặp .map để render ra danh sách các thẻ BlogCard */
                        <div className="blog-list-wrapper">
                            {posts.map((item) => (
                                <BlogCard key={item.id} post={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* CỘT PHẢI - THANH BÊN SIDEBAR (Chiếm 25% -> col-md-3) */}
                <div className="col-md-3 mt-4 mt-md-0">
                    <BlogSidebar
                        categories={categories}
                        activeCategory={selectedCategoryId}
                        onSelectCategory={setSelectedCategoryId} // Truyền hàm cập nhật trạng thái xuống component con
                    />
                </div>

            </div>
        </div>
    );
};

export default BlogListPage;