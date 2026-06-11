// pages/home/LatestBlog.jsx
import React from 'react';

// VỊ TRÍ SỬA 1: Gán mảng rỗng mặc định { posts = [], loading } để phòng hờ posts bị undefined
const LatestBlog = ({ posts = [], loading }) => {
    if (loading) return null;

    return (
        <div className="container mt-5 pt-3"> {/* Thêm container để căn lề đẹp theo chuẩn mẫu */}
            <h4 className="mb-4 text-uppercase text-dark font-weight-bold d-flex align-items-center" style={{ fontSize: '1rem' }}>
                <i className="fa-solid fa-feather-pointed text-info mr-2"></i> Xu hướng & Bí quyết mặc đẹp
            </h4>

            {/* VỊ TRÍ SỬA 2: Sử dụng Optional Chaining (posts?.length) để an toàn tuyệt đối */}
            {!posts || posts?.length === 0 ? (
                <p className="text-muted small">Chưa có bài viết tin tức nào mới.</p>
            ) : (
                <div className="row">
                    {posts.slice(0, 3).map((post) => (
                        <div className="col-md-4 mb-4" key={post.id}>
                            <div className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden">
                                <div className="card-body p-4">
                                    <span className="badge badge-info mb-2 px-2 py-1 text-uppercase font-weight-bold" style={{ fontSize: '0.7rem' }}>
                                        Blog thời trang
                                    </span>
                                    <h5 className="card-title font-weight-bold" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                                        <a href={`/post/${post.id}`} className="text-dark text-decoration-none hover-text-primary">
                                            {post.title}
                                        </a>
                                    </h5>
                                    <p className="card-text text-muted small text-truncate-3" style={{ minHeight: '60px' }}>
                                        {post.shortDescription || 'Đang cập nhật nội dung tóm tắt cho bài viết...'}
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center px-4 pb-4 text-secondary small">
                                    <span>
                                        <i className="fa-regular fa-calendar mr-1"></i>
                                        {new Date(post.createdDate || Date.now()).toLocaleDateString('vi-VN')}
                                    </span>
                                    <a href={`/post/${post.id}`} className="font-weight-bold text-info text-decoration-none">
                                        Đọc tiếp <i className="fa-solid fa-angle-right ml-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestBlog;