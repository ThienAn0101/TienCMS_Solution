/*
 * Ten: Le Thi Cam Tien
 * MSV: 2123110041
 * Ngay tao: 2026-06-25
 * Version: 1.2 (Sửa lỗi cú pháp chuẩn React Context API)
 */

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Khởi tạo Context gốc
const CartContext = createContext();

// 2. Định nghĩa Provider (CHÚ Ý: Dùng "export function" chứ KHÔNG DÙNG "public function")
export function CartProvider({ children }) {
    // Quản lý mảng giỏ hàng bằng State
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('tiencms_cart');
        return localData ? JSON.parse(localData) : [];
    });

    // Tự động lưu giỏ hàng vào trình duyệt khi có thay đổi
    useEffect(() => {
        localStorage.setItem('tiencms_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Hàm thêm sản phẩm
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const id = product.id || product.Id;
            const existItem = prevItems.find(item => (item.id || item.Id) === id);
            if (existItem) {
                return prevItems.map(item =>
                    (item.id || item.Id) === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    // Hàm cập nhật số lượng
    const updateQuantity = (id, newQty) => {
        if (newQty <= 0) {
            removeFromCart(id);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map(item => (item.id || item.Id) === id ? { ...item, quantity: newQty } : item)
        );
    };

    // Hàm xóa sản phẩm
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => (item.id || item.Id) !== id));
    };

    // Hàm làm sạch giỏ hàng khi đặt hàng xong
    const clearCart = () => setCartItems([]);

    // Hàm đếm tổng số lượng sản phẩm
    const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

    // Hàm tính tổng tiền
    const getCartTotal = () => cartItems.reduce((total, item) => {
        const price = item.price || item.Price || 0;
        return total + (price * item.quantity);
    }, 0);

    // CRITICAL: Đảm bảo có lệnh return bọc children và truyền đủ các giá trị vào thuộc tính value
    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getCartCount, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

// 3. Định nghĩa Hook useCart để các trang con trích xuất dữ liệu công khai
export function useCart() {
    return useContext(CartContext);
}

