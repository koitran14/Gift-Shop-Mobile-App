import axios from "axios"

import {ApiContants} from '../contants';

const getStoreByProductId = async(productId) => {
    try {
        const store = await axios.get(ApiContants.BACKEND_API.GET_STORE_BY_PRODUCT_ID + `${productId}`);
        return store.data;
    } catch (error) {
        return {
            status: false,
            message: `Store not found`,
        };
    }
}

export default {getStoreByProductId};