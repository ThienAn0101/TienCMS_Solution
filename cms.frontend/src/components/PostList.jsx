/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-09
 * Version: 1.0
 */

import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const data = await blogService.getAllPosts();

                setPosts(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5">
                <div
                    className="spinner-border text-info"
                    role="status"
                >
                </div>

                <p className="mt-2 text-muted">
                    Đang tải tin tức thời trang...
                </p>
            </div>
        );
    }

    return (
        <div className="card shadow-sm p-4 bg-white rounded">

            <h4 className="card-title text-uppercase font-weight-bold text-dark border-bottom pb-3 mb-4">
                <i className="fa-solid fa-newspaper mr-2 text-info"></i>
                Xu hướng & Bí quyết mặc đẹp
            </h4>

            {posts.length === 0 ? (
                <div className="alert alert-light text-center border">
                    <p className="text-muted m-0">
                        Hiện tại chưa có bài viết nào.
                    </p>
                </div>
            ) : (
                <div className="row">

                    {posts.map((post) => (
                        <div
                            className="col-12 mb-4"
                            key={post.id}
                        >
                            <div className="card border-0 shadow-sm bg-light h-100">

                                <div className="card-body">

                                    <h5 className="font-weight-bold">
                                        <a
                                            href={`/post/${post.id}`}
                                            className="text-dark text-decoration-none"
                                        >
                                            {post.title}
                                        </a>
                                    </h5>

                                    <p className="text-secondary small mt-2">
                                        {
                                            post.shortDescription ||
                                            "Nhấn để xem chi tiết bài viết..."
                                        }
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top text-muted small">

                                        <span>
                                            <i className="fa-regular fa-calendar-days mr-1"></i>

                                            {
                                                new Date(
                                                    post.createdDate
                                                ).toLocaleDateString("vi-VN")
                                            }
                                        </span>

                                        <span className="badge badge-info px-3 py-2">
                                            Đọc tiếp
                                            <i className="fa-solid fa-angle-right ml-1"></i>
                                        </span>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};
export default PostList;