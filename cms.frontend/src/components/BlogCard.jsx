// src/components/BlogCard.jsx
import React from 'react';

const BlogCard = ({ post }) => {
    // Định dạng lại ngày tháng hiển thị sang kiểu Việt Nam (DD/MM/YYYY)
    const formattedDate = new Date(post.createdDate || Date.now()).toLocaleDateString('vi-VN');

    return (
        <div className="card mb-4 border-0 shadow-sm rounded-lg overflow-hidden" style={{ transition: 'transform 0.2s' }}>
            <div className="row no-gutters align-items-center p-3">
                {/* Hình ảnh đại diện bài viết */}
                <div className="col-md-4">
                    <div style={{ height: '180px', overflow: 'hidden', borderRadius: '6px' }}>
                        <img
                            src={post.image || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400'}
                            alt={post.title}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* Nội dung tóm tắt bài viết */}
                <div className="col-md-8 pl-md-4 mt-3 mt-md-0">
                    <span className="badge badge-info mb-2 px-2 py-1 text-uppercase font-weight-bold" style={{ fontSize: '0.65rem' }}>
                        {post.categoryName || 'Xu hướng'}
                    </span>

                    <h5 className="card-title font-weight-bold mb-2">
                        <a href={`/post/${post.id}`} className="text-dark text-decoration-none" style={{ fontSize: '1.15rem', lineHeight: '1.4' }}>
                            {post.title}
                        </a>
                    </h5>

                    <div className="text-secondary small mb-2 d-flex align-items-center" style={{ gap: '15px' }}>
                        <span><i className="fa-regular fa-calendar mr-1"></i> {formattedDate}</span>
                        <span><i className="fa-regular fa-user mr-1"></i> {post.author || 'Ban biên tập'}</span>
                    </div>

                    <p className="card-text text-muted small text-truncate-3 mb-3" style={{ lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.shortDescription || 'Đang cập nhật nội dung tóm tắt cho xu hướng thời trang này...'}
                    </p>

                    <a href={`/post/${post.id}`} className="btn btn-sm btn-outline-info font-weight-bold px-3" style={{ borderRadius: '6px' }}>
                        Đọc tiếp <i className="fa-solid fa-angle-right ml-1"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;