import axios from "axios";
import { ApiContants } from "../contants";

//ADD STORE
const addStore = async (storeData) => {
    try {
        const addStoreResponse = await axios.post(ApiContants.BACKEND_API.ADD_STORE, storeData);
        console.log('Add store successfully:',addStoreResponse.data);
        return addStoreResponse.data;
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error
        };
    }
};

//GET PRODUCT IN STORE
const getProduct = async (type,value) => {
    try {
        let params = {[type]: value};
        const productResponse = await axios.get(
            ApiContants.BACKEND_API.GET_PRODUCT, 
            {params}
            );
        console.log('Getting products successfully:', productResponse.data);
        return productResponse?.data;
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error
        };
    }
};

//GET CATEGORY IN STORE
const getCategories = async (storeData) => {
    if (!storeData?.storeName){
        return { status: false, message: 'Please fill up store name'};
    }
    try {
        const categoriesResponse = await axios.get('ApiContants.BACKEND_API.GET_CATEGORIES', {
            params: { storeName }
        });
        console.log('Getting categories successfully:', categoriesResponse.data);
        return categoriesResponse.data;
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error
        };
    }
};

//GET PRODUCT IN STORE BY CATEGORIES
const getProductByCategories = async (storeData) => {
    if (!storeData?.storeName || !storeData?.categoryName){
        return { status: false, message: 'Please fill up store name and category name'};
    }
    try {
        const productByCategoriesResponse = await axios.get('ApiContants.BACKEND_API.GET_PRODUCT_BY_CATEGORIES', {
            params: { storeName, categoryName }
        });
        console.log('Getting product by category successfully:', productByCategoriesResponse.data);
        return productByCategoriesResponse.data;
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error
        };
    }
};

export default { addStore, getProduct, getCategories, getProductByCategories };