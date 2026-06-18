import React from 'react';

const IMAGE_BASE_URL = "https://localhost:7127"; // Đường dẫn Backend của bạn

function PostCard({ post }) {
    // Bẫy lỗi: Hỗ trợ đọc cả chữ thường (camelCase) và chữ hoa đầu (PascalCase) từ API .NET
    const title = post.title || post.Title || 'Bài viết chưa có tiêu đề';
    const summary = post.summary || post.Summary || post.shortDescription || post.ShortDescription;
    const createdDate = post.createdDate || post.CreatedDate;
    const id = post.id || post.Id;

    // Xử lý đường dẫn ảnh an toàn
    const rawImgUrl = post.imageUrl || post.ImageUrl || post.image || post.Image;
    let finalImageUrl = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400'; // Ảnh mặc định dự phòng

    if (rawImgUrl) {
        // Nếu Backend trả về đường dẫn có sẵn http/https thì dùng luôn, nếu không thì cộng với Domain Backend
        finalImageUrl = rawImgUrl.startsWith('http') ? rawImgUrl : `${IMAGE_BASE_URL}${rawImgUrl}`;
    }

    return (
        <div className="card h-100 shadow-sm border-0 blog-card-hover" style={{ borderRadius: '12px', overflow: 'hidden', transition: '0.3s' }}>

            {/* 1. Hình ảnh đại diện của bài viết (Thumbnail) */}
            <div className="blog-image-wrapper" style={{ height: '220px', overflow: 'hidden' }}>
                <img
                    src={finalImageUrl}
                    className="w-100 h-100"
                    alt={title}
                    style={{ objectFit: 'cover', transition: '0.5s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>

            {/* 2. Nội dung tóm tắt bài viết */}
            <div className="card-body p-4 d-flex flex-column">
                {/* Ngày đăng bài viết */}
                <small className="text-uppercase font-weight-bold text-muted mb-2 d-block" style={{ fontSize: '12px', color: '#11CAA0' }}>
                    <i className="far fa-calendar-alt mr-1"></i>
                    {createdDate ? new Date(createdDate).toLocaleDateString('vi-VN') : 'Mới cập nhật'}
                </small>

                {/* Tiêu đề bài viết */}
                <h5 className="card-title font-weight-bold mb-2" style={{ color: '#005088', fontSize: '18px', lineHeight: '1.4', minHeight: '50px' }}>
                    <a href={`/blog/${id}`} className="text-decoration-none text-dark-hover" style={{ color: '#005088' }}>
                        {title}
                    </a>
                </h5>

                {/* Đoạn mô tả ngắn (Cắt chuỗi an toàn bảo vệ layout) */}
                <p className="card-text text-secondary text-justify mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    {summary ? `${summary.substring(0, 100)}...` : 'Khám phá bí quyết lựa chọn trang phục phù hợp với vóc dáng để luôn tự tin tỏa sáng...'}
                </p>

                {/* Nút liên kết xem chi tiết đẩy xuống sát đáy Card */}
                <div className="mt-auto pt-2 border-top">
                    <a
                        href={`/blog/${id}`}
                        className="font-weight-bold text-decoration-none d-inline-flex align-items-center"
                        style={{ color: '#11CAA0', fontSize: '14px', transition: '0.3s' }}
                        onMouseOver={(e) => e.target.style.color = '#005088'}
                        onMouseOut={(e) => e.target.style.color = '#11CAA0'}
                    >
                        Đọc bài viết <i className="fas fa-long-arrow-alt-right ml-2"></i>
                    </a>
                </div>
            </div>

        </div>
    );
}

export default PostCard;