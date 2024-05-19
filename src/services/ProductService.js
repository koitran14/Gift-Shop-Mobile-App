import axios from "axios"

import {ApiContants} from '../contants';

const getAllProducts = async() => {
    try {
        const products = await axios.get(ApiContants.BACKEND_API.GET_ALL_PRODUCT);
        return products.data;
    } catch (error) {
        return {
            status: false,
            message: `Products not found`,
        };
    }
}

export default {getAllProducts};