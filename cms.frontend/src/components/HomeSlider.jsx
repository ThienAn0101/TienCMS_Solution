import React, { useState, useEffect } from 'react';

function HomeSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const banners = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
            alt: "Bộ sưu tập mùa hè mới nhất",
            title: "FASHION NEW ARRIVALS",
            description: "Giảm giá lên đến 50% cho tất cả các sản phẩm công sở."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
            alt: "Xu hướng thời trang dạo phố",
            title: "STREETSTYLE TRENDS 2026",
            description: "Khám phá phong cách năng động, tự tin và cá tính."
        }
    ];

    // Tự động chạy slide sau mỗi 3 giây bằng React
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(interval); // Dọn dẹp bộ nhớ khi chuyển trang
    }, [activeIndex]);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div id="homeBannerCarousel" className="carousel slide shadow-sm mb-4">
            {/* 1. Các chấm nhỏ định vị */}
            <ol className="carousel-indicators">
                {banners.map((_, index) => (
                    <li
                        key={index}
                        className={index === activeIndex ? "active" : ""}
                        onClick={() => setActiveIndex(index)}
                        style={{ cursor: 'pointer' }}
                    ></li>
                ))}
            </ol>

            {/* 2. Phần chứa các bức ảnh Slider */}
            <div className="carousel-inner" style={{ borderRadius: '0 0 15px 15px', overflow: 'hidden' }}>
                {banners.map((banner, index) => (
                    <div className={`carousel-item ${index === activeIndex ? "active" : ""}`} key={banner.id}>
                        <img
                            src={banner.image}
                            className="d-block w-100"
                            alt={banner.alt}
                            style={{ height: '400px', objectFit: 'cover' }}
                        />
                        <div className="carousel-caption d-none d-md-block text-left p-4" style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            borderRadius: '10px',
                            bottom: '10%'
                        }}>
                            <h2 className="font-weight-bold text-white">{banner.title}</h2>
                            <p className="m-0 text-light">{banner.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Hai nút điều hướng Mũi tên */}
            <button className="carousel-control-prev border-0 bg-transparent" type="button" onClick={handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </button>
            <button className="carousel-control-next border-0 bg-transparent" type="button" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </button>
        </div>
    );
}

export default HomeSlider;