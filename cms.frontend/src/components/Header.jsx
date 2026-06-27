/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Ngay cap nhat: 2026-06-27
 * Version: 5.2 (Sửa triệt để lỗi đứng hình số 0 bằng cách tích hợp lắng nghe sự kiện Custom Event Realtime)
 */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 🌟 CHỨC NĂNG MỚI: State quản lý tổng số lượng sản phẩm trong giỏ hàng
    const [cartCount, setCartCount] = useState(0);

    // 🌟Tính tổng số loại mặt hàng thay vì cộng dồn số lượng mua
    const updateCartCount = () => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const cartItems = JSON.parse(savedCart);
                // Lấy độ dài của mảng (số lượng dòng sản phẩm khác nhau trong giỏ)
                const uniqueItemsCount = cartItems.length;
                setCartCount(uniqueItemsCount);
            } catch (e) {
                setCartCount(0);
            }
        } else {
            setCartCount(0);
        }
    };

    useEffect(() => {
        // 1. Đọc thông tin đăng nhập của khách hàng
        const storedCustomer = localStorage.getItem('customer') || localStorage.getItem('user');
        if (storedCustomer) {
            try {
                setCurrentCustomer(JSON.parse(storedCustomer));
            } catch (error) {
                console.error("Lỗi đọc thông tin đăng nhập:", error);
            }
        }

        // 2. 🌟 CHẠY LẦN ĐẦU: Cập nhật số lượng giỏ hàng ngay khi vừa nạp trang
        updateCartCount();

        // 3. 🌟 LẮNG NGHE ĐỒNG BỘ: Đón nhận sự kiện 'cartUpdated' từ trang Shop hoặc trang Cart bắn ra
        window.addEventListener('cartUpdated', updateCartCount);

        // Hủy lắng nghe khi component bị hủy để giải phóng bộ nhớ hệ thống
        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('customer');
        localStorage.removeItem('user');
        setCurrentCustomer(null);
        setIsMenuOpen(false);
        alert("👋 Đã đăng xuất tài khoản thành công!");
        navigate('/login');
        window.location.reload();
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        alert("Chức năng tìm kiếm nhanh trên Header sẽ kết nối API Search ở các buổi sau!");
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active font-weight-bold text-primary' : 'text-dark';
    };

    return (
        <header className="main-header-wrapper bg-white shadow-sm sticky-top">

            {/* ──────────────────────────────────────────────────────── */}
            {/* TẦNG TIỆN ÍCH 1: THANH TOP BAR */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="top-bar bg-dark py-2 text-white" style={{ fontSize: '13px' }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="top-bar-left">
                        <span className="mr-3">
                            <i className="fas fa-phone-alt mr-1"></i> Hotline: 090x.xxx.xxx
                        </span>
                        <span>
                            <i className="fas fa-envelope mr-1"></i> Email: support@tiencms.retail
                        </span>
                    </div>

                    <div className="top-bar-right">
                        {currentCustomer ? (
                            <div className={`dropdown d-inline-block ${isMenuOpen ? 'show' : ''}`}>
                                <a
                                    className="text-white text-decoration-none dropdown-toggle font-weight-bold"
                                    href="#"
                                    role="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMenuOpen(!isMenuOpen);
                                    }}
                                    style={{ cursor: 'pointer', letterSpacing: '0.3px' }}
                                >
                                    <i className="fas fa-user-circle mr-1"></i>
                                    Chào, {currentCustomer.fullName || currentCustomer.FullName || 'Thành viên'}
                                </a>

                                <div
                                    className={`dropdown-menu dropdown-menu-right shadow border-0 mt-2 ${isMenuOpen ? 'show' : ''}`}
                                    style={{
                                        borderRadius: '6px',
                                        position: 'absolute',
                                        right: 0,
                                        left: 'auto',
                                        zIndex: 1050
                                    }}
                                >
                                    <Link
                                        className="dropdown-item small py-2 text-dark"
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <i className="fas fa-id-card mr-2 text-primary"></i> Hồ sơ cá nhân
                                    </Link>
                                    <Link
                                        className="dropdown-item small py-2 text-dark"
                                        to="/my-orders"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <i className="fas fa-box mr-2 text-success"></i> Đơn hàng của tôi
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item small py-2 text-danger font-weight-bold" href="#" onClick={handleLogout}>
                                        <i className="fas fa-sign-out-alt mr-2"></i> Đăng xuất
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-white mr-3 text-decoration-none transition-link">
                                    <i className="fas fa-user mr-1"></i> Đăng nhập
                                </Link>
                                <Link to="/register" className="text-white text-decoration-none transition-link">
                                    <i className="fas fa-user-plus mr-1"></i> Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* TẦNG TIỆN ÍCH 2: KHU VỰC CHÍNH (Logo, Search Bar & Giỏ hàng) */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="main-header py-3 border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-3 col-6">
                            <Link to="/" className="text-decoration-none">
                                <h3 className="font-weight-bold m-0" style={{ color: '#005088', letterSpacing: '1px' }}>
                                    TienCMS<span style={{ color: '#11CAA0' }}>.Fashion</span>
                                </h3>
                            </Link>
                        </div>
                        <div className="col-md-6 d-none d-md-block">
                            <form className="input-group" onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    className="form-control border-right-0"
                                    placeholder="Tìm kiếm mẫu đầm dạ hội, sơ mi công sở..."
                                    style={{ borderRadius: '20px 0 0 20px', fontSize: '14px' }}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary border-left-0 px-4" type="submit" style={{ borderRadius: '0 20px 20px 0', backgroundColor: '#005088', borderColor: '#005088' }}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-3 col-6 text-right">
                            {/* 🌟 SỬA TRIỆT ĐỂ: Gắn biến trạng thái cartCount động vào badge số lượng */}
                            <Link to="/cart" className="btn position-relative p-2" style={{ color: '#005088', fontSize: '22px' }}>
                                <i className="fas fa-shopping-bag"></i>
                                {cartCount > 0 && (
                                    <span
                                        className="badge badge-pill position-absolute"
                                        style={{
                                            top: '0',
                                            right: '0',
                                            backgroundColor: '#11CAA0',
                                            color: '#fff',
                                            fontSize: '11px',
                                            padding: '4px 6px',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* TẦNG TIỆN ÍCH 3: THANH MENU ĐIỀU HƯỚNG CHÍNH */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="main-navigation bg-white py-2">
                <div className="container">
                    <nav className="navbar navbar-expand p-0">
                        <ul className="navbar-nav w-100">
                            <li className="nav-item mr-4">
                                <Link to="/" className={`nav-link p-0 text-decoration-none ${isActive('/')}`} style={{ transition: 'all 0.2s' }}>Trang Chủ</Link>
                            </li>
                            <li className="nav-item mr-4">
                                <Link to="/shop" className={`nav-link p-0 text-decoration-none ${isActive('/shop')}`} style={{ transition: 'all 0.2s' }}>Cửa Hàng</Link>
                            </li>
                            <li className="nav-item mr-4">
                                <Link to="/blog" className={`nav-link p-0 text-decoration-none ${isActive('/blog')}`} style={{ transition: 'all 0.2s' }}>Tin Tức / Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className={`nav-link p-0 text-decoration-none ${isActive('/about')}`} style={{ transition: 'all 0.2s' }}>Về Chúng Tôi</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;