import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKENDURL || 'http://localhost:5000';

const CartPage = ({ user }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`${API_URL}/api/cart/${user.id}`)
                .then(res => setCart(res.data))
                .catch(err => console.error('Error fetching cart:', err));
        }
    }, [user]);

    const handleRemove = (productId) => {
        axios.delete(`${API_URL}/api/cart/remove/${user.id}/${productId}`)
            .then(() => setCart(prev => prev.filter(item => item.id !== productId)))
            .catch(err => console.error(err));
    };

    const handleCheckout = () => {
        axios.post(`${API_URL}/api/checkout`, { userId: user.id, items: cart })
            .then(res => alert(`Order placed! Order ID: ${res.data.orderId}`))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.map(item => (
                <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>${item.price} x {item.quantity}</p>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
            ))}
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default CartPage;
