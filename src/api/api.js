import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKENDURL; 

// Fetch the list of products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products/get`);
    return response.data; // Return the list of products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add a new product (with image URL instead of file upload)
export const addProduct = async (productData) => {
  try {
    // Prepare the data to send in the request
    const response = await axios.post(`${API_URL}/api/products/add`, {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image, // Use the image URL directly
    });

    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Edit an existing product (with image URL instead of file upload)
export const editProduct = async (productId, productData) => {
  try {
    // Prepare the data to send in the request
    const response = await axios.put(`${API_URL}/api/products/edit/${productId}`, {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
      oldImage: productData.oldImage,
    });

    return response.data;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};
