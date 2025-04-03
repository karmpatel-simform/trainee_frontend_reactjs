import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';

const API_URL = import.meta.env.VITE_BACKENDURL || 'http://localhost:5000';

const CartPage = ({ user }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Get or create a guest ID if user is not logged in
  const getGuestId = () => {
    if (user && user.id) return user.id;
    
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
      guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('guestId', guestId);
    }
    return guestId;
  };

  // Determine which ID to use (user ID or guest ID)
  const getUserId = () => {
    return getGuestId();
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        
        if (!userId) {
          setLoading(false);
          return;
        }
        
        console.log(`Fetching cart for user/guest ID: ${userId}`);
        const response = await axios.get(`${API_URL}/api/cart/${userId}`);
        console.log('Cart data received:', response.data);
        
        // Ensure price is a number for all items
        const processedCart = response.data.map(item => ({
          ...item,
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
          quantity: typeof item.quantity === 'string' ? parseInt(item.quantity, 10) : item.quantity
        }));
        
        setCart(processedCart);
        setError(null);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to load your cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemove = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      console.log(`Removing product ${productId} from cart`);
      await axios.delete(`${API_URL}/api/cart/remove/${userId}/${productId}`);
      setCart(prev => prev.filter(item => 
        (item.productId !== productId) && (item.id !== productId)
      ));
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item. Please try again.');
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    const userId = getUserId();
    if (!userId) return;

    try {
      console.log(`Updating quantity for product ${productId} to ${quantity}`);
      await axios.put(`${API_URL}/api/cart/update`, {
        userId: userId,
        productId: productId,
        quantity: quantity
      });
      
      setCart(prev => prev.map(item =>
        (item.productId === productId || item.id === productId) 
          ? { ...item, quantity } 
          : item
      ));
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity. Please try again.');
    }
  };

  const getUser = async () => {
    try {
      const result = await authService.getCurrentUser();
      console.log(result); // This will show the full response
      if (result.success) {
        const userData = result.data;
        console.log('User data:', userData);
        return userData; // Return the user data
      } else {
        console.error('Error getting user:', result.message);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };



  const handleCheckout = async () => {
    const user = await getUser();
    const userId = user?.id;
  
    if (!userId || cart.length === 0) return;
  
    try {
      const response = await axios.post(`${API_URL}/api/cart/checkout`, {
        userId: userId,
        guestId: localStorage.getItem('guestId'),
      });
  
      if (response.status === 200) {
        setCart([]); // Clear cart after successful checkout
        alert(`Order placed successfully! Order ID: ${response.data.orderId}`);
        navigate('/orders');
      } else {
        throw new Error('Checkout failed.');
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('Failed to process checkout. Please try again.');
    }
  };
  
  

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      // Ensure values are treated as numbers
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return sum + (price * quantity);
    }, 0);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="animate-pulse">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800 mr-4">
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <p className="text-xl mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => {
                    // Use either productId or id depending on which one is available
                    const itemId = item.productId || item.id;
                    const price = parseFloat(item.price) || 0;
                    const quantity = parseInt(item.quantity, 10) || 0;
                    const itemTotal = price * quantity;
                    
                    return (
                      <tr key={itemId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleUpdateQuantity(itemId, quantity - 1)}
                              disabled={quantity <= 1}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(itemId, quantity + 1)}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${itemTotal.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleRemove(itemId)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 pb-4 border-b">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                <ShoppingBag size={20} className="mr-2" />
                {authService.isAuthenticated() ? 'Proceed to Checkout' : 'Login & Checkout'}
              </button>
              {!authService.isAuthenticated() && (
                <p className="text-sm text-gray-600 mt-4">
                  You'll need to login or create an account to complete your purchase.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;