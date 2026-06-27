/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-26
 * Ngay cap nhat: 2026-06-27
 * Version: 6.0 (Tích hợp State tìm kiếm searchTerm đồng bộ realtime với ShopHeader)
 */
import React, { useState, useEffect } from 'react';
import ShopSidebar from './ShopSidebar';
import ShopHeader from './ShopHeader';
import ProductList from './ProductList';
import productService from '../../services/productService';

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // 🌟 1. KHỞI TẠO STATE TÌM KIẾM TỪ KHÓA
    const [searchTerm, setSearchTerm] = useState('');

    // danh mục đang chọn
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let data;
                if (selectedCategoryId === null) {
                    data = await productService.getAllProducts();
                } else {
                    data = await productService.getProductsByCategory(selectedCategoryId);
                }

                const result = Array.isArray(data) ? data : [];
                setProducts(result);

                // reset về trang đầu khi đổi danh mục
                setCurrentPage(1);
            } catch (err) {
                console.log(err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategoryId]);

    // 🌟 2. TỰ ĐỘNG ĐƯA VỀ TRANG 1 KHI GÕ GIÁ HOẶC GÕ TỪ KHÓA TÌM KIẾM
    useEffect(() => {
        setCurrentPage(1);
    }, [minPrice, maxPrice, searchTerm]);

    // NGHIỆP VỤ THÊM VÀO GIỎ HÀNG THỜI GIAN THỰC
    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id || item.Id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id || product.Id,
                name: product.name || product.Name,
                price: product.price !== undefined ? product.price : product.Price,
                image: product.image || product.Image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // 🌟 3. KẾT HỢP LỌC SẢN PHẨM: THEO KHOẢNG GIÁ + THEO TỪ KHÓA TÌM KIẾM
    const filteredProducts = products.filter(product => {
        // Lấy dữ liệu Tên và Giá (đề phòng trường hợp API trả về chữ Hoa / chữ Thường)
        const rawName = product.name || product.Name || "";
        const rawPrice = product.price !== undefined ? product.price : product.Price;
        const productPrice = parseFloat(rawPrice) || 0;

        // Logic lọc khoảng giá
        const filterMin = minPrice === '' ? null : parseFloat(minPrice);
        const filterMax = maxPrice === '' ? null : parseFloat(maxPrice);
        const matchesMin = filterMin === null || productPrice >= filterMin;
        const matchesMax = filterMax === null || productPrice <= filterMax;

        // Logic lọc từ khóa tìm kiếm (Chuyển hết về chữ thường để so sánh không phân biệt Hoa-Thường)
        const matchesSearch = rawName.toLowerCase().includes(searchTerm.toLowerCase());

        // Sản phẩm thỏa mãn cả giá và từ khóa thì mới hiển thị
        return matchesMin && matchesMax && matchesSearch;
    });

    // STEP 2: PHÂN TRANG DỰA TRÊN MẢNG ĐÃ LỌC
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const start = (currentPage - 1) * pageSize;

    // Cắt sản phẩm từ mảng đã lọc
    const currentProducts = filteredProducts.slice(start, start + pageSize);

    return (
        <div className="container my-5">
            <div className="row">
                {/* sidebar */}
                <div className="col-md-3">
                    <ShopSidebar
                        activeId={selectedCategoryId}
                        onSelectCategory={setSelectedCategoryId}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                    />
                </div>

                {/* sản phẩm */}
                <div className="col-md-9">
                    {/* 🌟 4. TRUYỀN STATE VÀ HÀM SETSTATE XUỐNG SHOPHEADER */}
                    <ShopHeader
                        total={filteredProducts.length}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />

                    {/* TRUYỀN HÀM handleAddToCart XUỐNG COMPONENT CON */}
                    <ProductList
                        products={currentProducts}
                        loading={loading}
                        onAddToCart={handleAddToCart}
                    />

                    {/* phân trang */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                className="btn btn-outline-dark"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                ←
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={`btn mx-1 ${currentPage === i + 1
                                        ? 'btn-primary'
                                        : 'btn-outline-primary'
                                        }`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="btn btn-outline-dark"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Shop;