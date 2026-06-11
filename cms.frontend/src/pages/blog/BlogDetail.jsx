// src/pages/blog/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../../services/blogService';

const BlogDetail = () => {
    // 1. Lấy tham số ID từ URL đường dẫn (Ví dụ: /blog/:id)
    const { id } = useParams();
    const navigate = useNavigate();

    // 2. Quản lý trạng thái dữ liệu bài viết và hiệu ứng chờ tải (loading)
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // 3. Tự động chạy khi mở trang để gọi API lấy dữ liệu chi tiết
    useEffect(() => {
        const fetchPostDetail = async () => {
            setLoading(true);
            try {
                const data = await blogService.getPostById(id);
                setPost(data);
            } catch (err) {
                console.error("Lỗi tải chi tiết bài viết:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPostDetail();
        }
    }, [id]);

    // 4. Xử lý giao diện lúc đang chờ API phản hồi
    if (loading) {
        return (
            <div className="text-center py-5 my-5">
                <div className="spinner-border text-info" role="status"></div>
                <p className="text-muted small mt-2">Đang tải nội dung bài viết...</p>
            </div>
        );
    }

    // 5. Xử lý trường hợp không tìm thấy bài viết hoặc ID sai
    if (!post) {
        return (
            <div className="container my-5 text-center py-5 bg-white rounded border">
                <i className="fa-solid fa-triangle-exclamation text-warning fa-2x mb-3"></i>
                <h5>Không tìm thấy bài viết!</h5>
                <p className="text-muted small">Bài viết này không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.</p>
                <button className="btn btn-info btn-sm font-weight-bold mt-2" onClick={() => navigate('/blog')}>
                    <i className="fa-solid fa-arrow-left mr-1"></i> Quay lại danh sách tin
                </button>
            </div>
        );
    }

    return (
        <div className="container my-4 animate__animated animate__fadeIn">
            {/* Thanh Breadcrumb dẫn đường chỉ hướng */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent p-0 mb-4" style={{ fontSize: '0.8rem' }}>
                    <li className="breadcrumb-item"><a href="/" className="text-secondary text-decoration-none">Trang chủ</a></li>
                    <li className="breadcrumb-item"><a href="/blog" className="text-secondary text-decoration-none">Cẩm nang tin tức</a></li>
                    <li className="breadcrumb-item active text-dark font-weight-bold text-truncate" aria-current="page" style={{ maxWidth: '300px' }}>
                        {post.title}
                    </li>
                </ol>
            </nav>

            <div className="row justify-content-center">
                {/* Khu vực bài viết căn giữa màn hình (Chiếm 8/12 cột máy tính để dễ đọc) */}
                <div className="col-lg-9 bg-white p-4 p-md-5 rounded shadow-sm border-0">

                    {/* Tên danh mục nhỏ phía trên */}
                    <span className="badge badge-info mb-3 px-2 py-1 text-uppercase font-weight-bold" style={{ fontSize: '0.65rem' }}>
                        {post.categoryName || 'Xu hướng thời trang'}
                    </span>

                    {/* TIÊU ĐỀ LỚN BÀI VIẾT (H1) */}
                    <h1 className="font-weight-bold text-dark mb-3" style={{ fontSize: '1.8rem', lineHeight: '1.4' }}>
                        {post.title}
                    </h1>

                    {/* THANH THÔNG TIN TÁC GIẢ, NGÀY THÁNG */}
                    <div className="text-muted small pb-3 mb-4 border-bottom d-flex flex-wrap align-items-center" style={{ gap: '20px' }}>
                        <span><i className="fa-regular fa-calendar mr-1"></i> Ngày đăng: {new Date(post.createdDate || Date.now()).toLocaleDateString('vi-VN')}</span>
                        <span><i className="fa-regular fa-user mr-1"></i> Người viết: {post.author || 'Ban biên tập ThaiCMS'}</span>
                        <span><i className="fa-regular fa-eye mr-1"></i> Lượt xem: {post.viewCount || 0}</span>
                    </div>

                    {/* ĐOẠN TÓM TẮT MỞ ĐẦU (Sapo bài viết) - IN ĐẬM */}
                    {post.shortDescription && (
                        <p className="text-secondary font-weight-bold p-3 rounded" style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #00cba9', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            {post.shortDescription}
                        </p>
                    )}

                    {/* KHỐI QUAN TRỌNG NHẤT: GIẢI MÃ NỘI DUNG HTML RAW TỪ CKEDITOR */}
                    <div
                        className="blog-main-content mt-4 text-dark"
                        style={{ fontSize: '1rem', lineHeight: '1.8', textAlign: 'justify' }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    {/* Giải thích: Thuộc tính dangerouslySetInnerHTML trên sẽ tự ép các chuỗi văn bản dạng <p> hay <img> tự động hiển thị đúng định dạng web vẽ ra */}

                    {/* NÚT QUAY LẠI CUỐI TRANG */}
                    <div className="mt-5 pt-3 border-top d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-secondary btn-sm font-weight-bold" onClick={() => navigate('/blog')}>
                            <i className="fa-solid fa-angle-left mr-1"></i> Trở về chuyên mục
                        </button>

                        {/* Chia sẻ mạng xã hội (Trang trí giả lập) */}
                        <div className="small text-secondary">
                            Chia sẻ bài viết:
                            <i className="fa-brands fa-facebook text-primary mx-2 cursor-pointer"></i>
                            <i className="fa-brands fa-twitter text-info cursor-pointer"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogDetail;