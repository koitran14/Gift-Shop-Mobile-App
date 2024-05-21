import axios from "axios"

import {ApiContants} from '../contants';

const getAllCategories = async() => {
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

export default {getAllCategories};