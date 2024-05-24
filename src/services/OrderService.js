import axios from "axios"

import {ApiContants} from '../contants';

const getOrderQuantityByProductId = async(productId) => {
    try {
        const orders = await axios.get(ApiContants.BACKEND_API.GET_ORDER_QUANTITY_BY_PRODUCTID + `/${productId}`);
        return orders.data.total;
    } catch (error) {
        return {
            status: false,
            message: `Orders not found`,
        };
    }
}

const getOrdersByUserId = async(userId) => {
    try {
        const orders = await axios.get(ApiContants.BACKEND_API.GET_ORDERS_BY_USER + `/${userId}`);
        return orders.data;
    } catch (error) {
        return {
            status: false,
            message: `Orders not found`,
        };
    }
}


export default { getOrderQuantityByProductId, getOrdersByUserId }