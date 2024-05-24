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


const followStore = async(storeId, user) => {
    try {
        const following = await axios.post(ApiContants.BACKEND_API.ADD_FOLLOWER + `${storeId}`, user);
        return following.data;
    } catch (error) {
        return {
            status: false,
            message: `Store not found`,
        };
    }
}

const unfollowStore = async(storeId, user) => {
     try {
        const unfollowing = await axios.post(ApiContants.BACKEND_API.REMOVE_FOLLOWER + `${storeId}`, user);
        return unfollowing.data;
    } catch (error) {
        return {
            status: false,
            message: `Store not found`,
        };
    }
}


const getFollowingStores = async(userId) => {
    try {
       const followingStores = await axios.get(ApiContants.BACKEND_API.GET_FOLLOWING_STORE + `/${userId}`);
       return followingStores.data;
   } catch (error) {
       return {
           status: false,
           message: `Store not found`,
       };
   }
}

export default {getStoreByProductId, getFollowingStores, followStore, unfollowStore};