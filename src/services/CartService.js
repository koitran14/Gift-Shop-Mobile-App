import axios from "axios"

import {ApiContants} from '../contants';

const getAllCart = async() => {
    try {
        const categories = await axios.get(ApiContants.BACKEND_API.GET_ALL_CATEGORIES);
        return categories.data;
    } catch (error) {
        return {
            status: false,
            message: `Category not found`,
        };
    }
}

const getAllCartsByUserId = async(userId) => {
    try {
        const carts = await axios.get(ApiContants.BACKEND_API.GET_CART_BY_USERID + `/${userId}`);
        return carts.data;
    } catch (error) {
        return {
            status: false,
            message: `Category not found`,
        };
    }
}


const addToCart = async(cart) => {
    try {
        const addToCart = await axios.post(ApiContants.BACKEND_API.ADD_TO_CART, cart);
        return addToCart.data;
    } catch (error) {
        return {
            status: false,
            message: `Adding failed.`,
        };
    }
}

const removeCart = async(cartId) => {
    try {
        const removeFromCart = await axios.delete(ApiContants.BACKEND_API.REMOVE_FROM_CART + `/${cartId}`);
        return {
            status: removeFromCart.status,
            message: removeFromCart.message
        };
    } catch (error) {
        return {
            status: false,
            message: `Remove failed.`,
        };
    }
}

const updateQuantity = async(cart, quantity) => {
    try {
        const update = await axios.put(ApiContants.BACKEND_API.UPDATE_QUANTITY + `/${cart.user._id}/${cart.product._id}`, { quantity: quantity });
        return update.data;
    } catch (error) {
        return {
            status: false,
            message: `Update failed.`,
        };
    }
}

export default {getAllCart, updateQuantity, addToCart, getAllCartsByUserId, removeCart};