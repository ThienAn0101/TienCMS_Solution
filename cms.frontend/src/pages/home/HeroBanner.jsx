/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-25
 * Version: 1.1 (Đã thay thế ô thực hành bằng Slider chuyển ảnh tự động)
 */
import React from 'react';
import HomeSlider from '../../components/HomeSlider';

function HeroBanner() {
    return (
        // 🌟 2. Thay đổi cấu trúc bao ngoài: Bỏ viền nét đứt và căn giữa để nhường chỗ cho Slider phủ hết diện tích
        <section className="hero-banner-main my-4">
            {/* Gọi trực tiếp component HomeSlider để chạy chuỗi ảnh thời trang động */}
            <HomeSlider />
        </section>
    );
}

export default HeroBanner;