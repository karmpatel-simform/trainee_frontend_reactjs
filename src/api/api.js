import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKENDURL; 

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products/get`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/api/products/add`, {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image, 
    });

    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const editProduct = async (productId, productData) => {
  try {
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

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/products/delete/${productId}`);

    return response.data;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};