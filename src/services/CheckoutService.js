import axios from "axios"

import {ApiContants} from '../contants';

const getAllPayments = async() => {
    try {
        const payments = await axios.get(ApiContants.BACKEND_API.GET_ALL_PAYMENTS);
        return payments.data;
    } catch (error) {
        return {
            status: false,
            message: `Payment not found`,
        };
    }
}

const getAllVouchers = async() => {
    try {
        const vouchers = await axios.get(ApiContants.BACKEND_API.GET_ALL_VOUCHERS);
        return vouchers.data;
    } catch (error) {
        return {
            status: false,
            message: `Payment not found`,
        };
    }
}

const order = async(order) => {
    try {
        const orders = await axios.post(ApiContants.BACKEND_API.CREATE_ORDER, order);
        return orders.data;
    } catch (error) {
        return {
            status: false,
            message: `Payment not found`,
        };
    }
}

export default {getAllPayments, getAllVouchers, order};