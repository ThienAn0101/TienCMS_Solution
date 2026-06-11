// Import cấu hình axiosClient dùng chung đã được cấu hình BaseURL ở thư mục api
import axiosClient from '../api/axiosClient';


const postService = {
    /**
     * 1. Lấy danh sách toàn bộ bài viết tin tức từ Backend
     * API Endpoint: GET https://localhost:xxxx/api/Posts (hoặc /api/Blogs tùy cấu hình Backend)
     */
    getAllPosts: async () => {
        try {
            // Thực hiện gọi API GET qua axiosClient
            const response = await axiosClient.get('/Posts');


            // Trả về dữ liệu mảng bài viết (thường nằm trong response.data hoặc trực tiếp response tùy cấu hình client)
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllBlogs:", error);
            throw error; // Đẩy lỗi ra ngoài để Component nhận biết và xử lý UI (như tắt loading, hiện thông báo lỗi)
        }
    },


    /**
     * 2. Lấy thông tin chi tiết của một bài viết theo ID
     * API Endpoint: GET https://localhost:xxxx/api/Posts/{id}
     */
    getPostById: async (id) => {
        try {
            const response = await axiosClient.get(`/Posts/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API getBlogById với ID ${id}:`, error);
            throw error;
        }
    }
};


// BẮT BUỘC: Xuất mặc định để file LatestBlog.jsx có thể import trực tiếp không bị lỗi
export default postService;

Source code latestBlog.jsx

import React, { useState, useEffect } from 'react';
import blogService from '../../services/postService';
// IMPORT  component CON VÀO ĐỂ SỬ DỤNG
import PostCard from '../../components/PostCard';




function LatestBlog() { // chỉ lấy 3 tin
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                const topThreePosts = data.sort((a, b) => b.id - a.id).slice(0, 3);
                setPosts(topThreePosts);
            } catch (error) {
                console.error("Lỗi hệ thống khi tải tin tức thời trang:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatestPosts();
    }, []);




    if (loading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>Đang nạp tin tức xu hướng...</span>
            </div>
        );
    }




    return (
        <section className="latest-blog-section py-5" style={{ backgroundColor: '#fdfbf7' }}>
            <div className="container">


                <div className="section-heading mb-4 text-center">
                    <h3 className="font-weight-bold text-uppercase" style={{ color: '#005088' }}>
                        Xu Hướng Thời Trang
                    </h3>
                    <p className="text-muted lead" style={{ fontSize: '15px' }}>
                        Cập nhật những mẹo phối đồ và tin tức phong cách mới nhất cùng ThaiCMS
                    </p>
                    <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#11CAA0' }}></div>
                </div>




                {/* KHUNG LƯỚI ĐỒNG BỘ  component CON */}
                <div className="row mt-5">
                    {posts.map((item) => (
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={item.id}>
                            {/* CHÈN COMPONENT CON VÀ TRUYỀN DỮ LIỆU QUA PROP post */}
                            <PostCard post={item} />
                        </div>
                    ))}
                </div>




            </div>
        </section>
    );
}




export default LatestBlog;
