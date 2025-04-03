import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  LogIn, 
  LogOut, 
  Search, 
  Heart, 
  Star 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/api';
import { authService } from '../../api/authService';
import Login from '../../components/User/Login';
import SignUp from '../../components/User/SignUp';
import axios from 'axios';

import { toast } from 'react-hot-toast';


const API_URL = import.meta.env.VITE_BACKENDURL || 'http://localhost:5000';

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); 
  const navigate = useNavigate(); 

  if (!isOpen) return null;

  const handleSuccess = () => {
    toast.success('Login successful!');
    navigate('/console');

    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        {isSignUp ? (
          <SignUp onClose={onClose} onSuccess={handleSuccess} />
        ) : (
          <Login onClose={onClose} onSuccess={handleSuccess} />
        )}

        <div className="text-center mt-6">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:underline"
          >
            {isSignUp 
              ? 'Already have an account? Log In' 
              : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, canPurchase, onAddToCart, onAddToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-white p-3 rounded-full hover:bg-blue-500 hover:text-white transition"
              title="Add to Cart"
            >
              <ShoppingCart size={20} />
            </button>
            <button 
              onClick={() => onAddToWishlist(product)}
              className="bg-white p-3 rounded-full hover:bg-red-500 hover:text-white transition"
              title="Add to Wishlist"
            >
              <Heart size={20} />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-gray-600">{product.rating || 4.5}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <button 
            onClick={() => canPurchase ? onAddToCart(product) : null}
            className={`px-4 py-2 rounded-lg transition ${
              canPurchase 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!canPurchase}
          >
            {canPurchase ? 'Add to Cart' : 'Login to Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('guestId'));
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  
  // Generate a guest ID for non-logged in users
  const [guestId, setGuestId] = useState('');

  useEffect(() => {

  let storedGuestId = localStorage.getItem('guestId');
  if (!storedGuestId) {
    storedGuestId = 'guest_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('guestId', storedGuestId);
  }
  setGuestId(storedGuestId);
  fetchGuestCart(storedGuestId);
  
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
  
    const checkAuth = async () => {
      try {
        const isAuth = authService.isAuthenticated();
        if (isAuth) {
          // Await the promise to resolve
          const userData = await authService.getCurrentUser(); 
          setUser(userData.data.id); // Accessing the resolved user data
          fetchUserCart(userData.data.id);
        } else {
          // Guest ID handling
          let storedGuestId = localStorage.getItem('guestId');
          if (!storedGuestId) {
            storedGuestId = 'guest_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('guestId', storedGuestId);
          }
          setGuestId(storedGuestId);
          fetchGuestCart(storedGuestId);
        }
      } catch (error) {
        console.error('Error during auth check:', error);
      }
    };
  
    fetchProducts();
    checkAuth();
  }, [user]);
  
  

  // Fetch user's cart from Redis/DB
  const fetchUserCart = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };

  // Fetch guest cart from Redis
  const fetchGuestCart = async (guestId) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart/${guestId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching guest cart:', error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    // Clear cart on logout
    setCart([]);
    navigate('/console');
  };

  
  const handleAddToCart = async (product) => {
    const currentUserId = localStorage.getItem('guestId');

    if (!currentUserId) {
        console.error('No user ID or guest ID available');
        toast.error('Login Required!');
        return;
    }

    try {
        console.log(`Adding product to cart for user/guest: ${currentUserId}`);

        const response = await axios.post(`${API_URL}/api/cart/add`, {
            userId: currentUserId,
            productId: product.id,
            quantity: 1,
        });

        // Directly update the cart with product details
        setCart(response.data.cart);

        console.log('Product added to cart:', response.data.cart);
    } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error);
        toast.alert('Failed to add item to cart. Please try again.');
    }
};

  
  

  const handleAddToWishlist = (product) => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    // Wishlist functionality remains unchanged as it typically requires an account
    setWishlist(prevWishlist => [...prevWishlist, product]);
  };

  const handleCartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      // For guest users, we can either prompt them to login or allow guest checkout
      if (cart.length > 0) {
        navigate('/cart'); // Allow access to cart page even for guests
      } else {
        setIsLoginOpen(true);
      }
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-blue-600">ShopSmart</h1>
            <div className="relative ml-8">
              <input 
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button 
                className="relative hover:text-blue-600"
                onClick={() => user ? navigate('/wishlist') : setIsLoginOpen(true)}
              >
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button 
                className="relative hover:text-blue-600"
                onClick={handleCartClick}
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span>{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="mr-2" /> Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <LogIn className="mr-2" /> Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Our Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              canPurchase={true} // Allow all users (including guests) to add to cart
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 text-xl">
            No products found matching your search.
          </p>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;