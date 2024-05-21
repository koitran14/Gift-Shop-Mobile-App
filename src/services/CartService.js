import axios from 'axios';

const API_URL = 'http://localhost:4000/api/cart';

// Get all cart items
const getAll = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Add an item to the cart
const addToCart = async (cartItem) => {
  try {
    const response = await axios.post(`${API_URL}/addToCart`, cartItem);
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

// Remove an item from the cart
const removeFromCart = async (cartItemId) => {
  try {
    const response = await axios.delete(`${API_URL}/removeFromCart`, { data: { id: cartItemId } });
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

// Update the quantity of an item in the cart
const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/updateCartItemQuantity`, { id: cartItemId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

export default {
  getAll,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
};
