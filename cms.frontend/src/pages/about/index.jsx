/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Version: 1.0 (Xây dựng nội dung giới thiệu Shop Cosplay & Phụ kiện Game chuẩn chuyên nghiệp)
 */
import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="about-page-wrapper bg-light py-5">
            <div className="container">

                {/* 🌟 PHẦN 1: BANNER GIỚI THIỆU CHÍNH */}
                <div className="row align-items-center mb-5 bg-white p-4 shadow-sm" style={{ borderRadius: '15px' }}>
                    <div className="col-md-6">
                        <h6 className="text-uppercase font-weight-bold text-primary mb-2" style={{ letterSpacing: '1px' }}>
                            Chào mừng bạn đến với TienCMS.Fashion
                        </h6>
                        <h2 className="font-weight-bold mb-4" style={{ color: '#005088' }}>
                            Thế Giới Cosplay & Phụ Kiện Hóa Trang Game Đỉnh Cao
                        </h2>
                        <p className="text-muted text-justify" style={{ lineHeight: '1.8' }}>
                            Được thành lập từ niềm đam mê cháy bỏng với văn hóa đại chúng, Anime và thế giới trò chơi điện tử,
                            <strong> TienCMS.Fashion</strong> tự hào là cầu nối giúp các game thủ và các cosplayer biến những nhân vật
                            ảo tưởng trong màn hình thành những bộ trang phục đời thực lộng lẫy nhất.
                        </p>
                        <p className="text-muted text-justify" style={{ lineHeight: '1.8' }}>
                            Chúng tôi hiểu rằng, Cosplay không chỉ là mặc một bộ quần áo, đó là sự hóa thân, là cách bạn thể hiện tình yêu
                            với nhân vật mà mình ngưỡng mộ. Chính vì vậy, từng đường kim mũi chỉ, từng chi tiết phụ kiện đều được shop
                            chăm chút vô cùng tỉ mỉ.
                        </p>
                    </div>
                    <div className="col-md-6 text-center mt-4 mt-md-0">
                        {/* Biểu tượng đại diện cho ngành hóa trang/game nghệ thuật */}
                        <div className="p-5 bg-link rounded-circle d-inline-block shadow-sm" style={{ backgroundColor: '#eef7ff' }}>
                            <i className="fas fa-mask text-primary" style={{ fontSize: '120px' }}></i>
                        </div>
                    </div>
                </div>

                {/* 🌟 PHẦN 2: THẾ MẠNH & SẢN PHẨM CỦA SHOP */}
                <h3 className="text-center font-weight-bold mb-4" style={{ color: '#005088' }}>
                    Chúng Tôi Cung Cấp Những Gì?
                </h3>
                <div className="row text-center mb-5">

                    {/* Khối 1: Trang phục Cosplay */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '12px' }}>
                            <div className="icon-box mb-3 text-primary" style={{ fontSize: '40px' }}>
                                <i className="fas fa-tshirt"></i>
                            </div>
                            <h5 className="font-weight-bold">Trang Phục Chuẩn Form</h5>
                            <p className="text-muted small text-justify">
                                Chuyên trang phục các tựa game đình đám (Genshin Impact, Liên Quân, League of Legends...).
                                Chất liệu vải cao cấp, co giãn tốt, đứng dáng và lên hình cực kì bắt mắt.
                            </p>
                        </div>
                    </div>

                    {/* Khối 2: Tóc giả & Phụ kiện */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '12px' }}>
                            <div className="icon-box mb-3" style={{ fontSize: '40px', color: '#11CAA0' }}>
                                <i className="fas fa-magic"></i>
                            </div>
                            <h5 className="font-weight-bold">Wig & Phụ Kiện Cao Cấp</h5>
                            <p className="text-muted small text-justify">
                                Cung cấp Tóc giả (Wig) tơ chịu nhiệt dễ tạo kiểu, cùng hàng loạt phụ kiện hóa trang như:
                                tai mèo, cánh thiên thần, lens mắt, trang sức nhân vật sắc nét đến từng chi tiết.
                            </p>
                        </div>
                    </div>

                    {/* Khối 3: Vũ khí & Đạo cụ mô hình */}
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '12px' }}>
                            <div className="icon-box mb-3 text-warning" style={{ fontSize: '40px' }}>
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h5 className="font-weight-bold">Đạo Cụ & Vũ Khí (Props)</h5>
                            <p className="text-muted small text-justify">
                                Mô hình kiếm, trượng, khiên thần binh được làm bằng chất liệu siêu nhẹ (như foam, nhựa PVC),
                                tuyệt đối an toàn khi mang đi tham gia các sự kiện Festival/Fes lớn nhỏ.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 🌟 PHẦN 3: LỜI CAM KẾT VỚI KHÁCH HÀNG */}
                <div className="bg-dark text-white p-4 text-center rounded shadow" style={{ borderRadius: '15px' }}>
                    <h4 className="font-weight-bold mb-3">Sẵn Sàng Tỏa Sáng Tại Các Buổi Festival Nhờ Combo Độc Quyền?</h4>
                    <p className="small text-light mb-4" style={{ opacity: '0.8' }}>
                        TienCMS.Fashion cam kết luôn bảo mật thông tin đơn hàng, hỗ trợ đổi size linh hoạt và tư vấn cách setup,
                        chăm sóc Wig hoàn toàn miễn phí cho các bạn mới tập chơi (Newbie)!
                    </p>
                    <Link
                        to="/shop"
                        className="btn font-weight-bold px-4 py-2 text-uppercase shadow-sm"
                        style={{ backgroundColor: '#11CAA0', color: '#fff', borderRadius: '25px' }}
                    >
                        Khám phá cửa hàng ngay
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default About;