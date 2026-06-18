import React, { useState, useEffect } from 'react';
import postService from '../../services/postService'; // Đảm bảo đúng đường dẫn tới postService của bạn

const IMAGE_BASE_URL = "https://localhost:7127"; // Đường dẫn của Backend C#

const LatestBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await postService.getAllPosts();
                const listResult = Array.isArray(data) ? data : (data.data || []);
                const topThree = [...listResult].sort((a, b) => b.id - a.id).slice(0, 3);
                setPosts(topThree);
            } catch (error) {
                console.error("Lỗi khi nạp bài viết xu hướng:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>Đang nạp xu hướng & bí quyết...</span>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-3">
            <h4 className="mb-4 text-uppercase text-dark font-weight-bold d-flex align-items-center" style={{ fontSize: '1rem' }}>
                <i className="fa-solid fa-feather-pointed text-info mr-2"></i> Xu hướng & Bí quyết mặc đẹp
            </h4>

            {posts.length === 0 ? (
                <p className="text-muted small">Chưa có bài viết tin tức nào mới.</p>
            ) : (
                <div className="row">
                    {posts.map((post) => {
                        const title = post.title || post.Title || 'Bài viết chưa có tiêu đề';
                        const id = post.id || post.Id;
                        const summary = post.shortDescription || post.ShortDescription || post.summary || post.Summary;
                        const createdDate = post.createdDate || post.CreatedDate;

                        // Lấy đường dẫn ảnh thô từ API
                        const rawImgUrl = post.imageUrl || post.ImageUrl || post.image || post.Image;
                        // Nếu có đường dẫn ảnh thì ghép nối với Domain Backend, ngược lại dùng ảnh dự phòng
                        const finalImageUrl = rawImgUrl
                            ? (rawImgUrl.startsWith('http') ? rawImgUrl : `${IMAGE_BASE_URL}${rawImgUrl}`)
                            : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400';

                        return (
                            <div className="col-md-4 mb-4" key={id}>
                                <div className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden">

                                    {/* Khung ảnh đại diện bài viết */}
                                    <div className="blog-image-wrapper" style={{ height: '200px', overflow: 'hidden' }}>
                                        <img
                                            src={finalImageUrl}
                                            className="w-100 h-100"
                                            alt={title}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div className="card-body p-4">
                                        <span className="badge badge-info mb-2 px-2 py-1 text-uppercase font-weight-bold" style={{ fontSize: '0.7rem' }}>
                                            Blog thời trang
                                        </span>
                                        <h5 className="card-title font-weight-bold" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                                            <a href={`/post/${id}`} className="text-dark text-decoration-none hover-text-primary">
                                                {title}
                                            </a>
                                        </h5>
                                        <p className="card-text text-muted small text-truncate-3" style={{ minHeight: '60px' }}>
                                            {summary || 'Đang cập nhật nội dung tóm tắt cho bài viết...'}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center px-4 pb-4 text-secondary small">
                                        <span>
                                            <i className="fa-regular fa-calendar mr-1"></i>
                                            {createdDate ? new Date(createdDate).toLocaleDateString('vi-VN') : 'Mới cập nhật'}
                                        </span>
                                        <a href={`/post/${id}`} className="font-weight-bold text-info text-decoration-none">
                                            Đọc tiếp <i className="fa-solid fa-angle-right ml-1"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LatestBlog;