import axios from "axios"
import Ionicons from "react-native-vector-icons/Ionicons";
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

const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <Ionicons
                    key={i}
                    name="star"
                    size={14}
                    color={'orange'}
                />
            );
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars.push(
                <Ionicons
                    key={i}
                    name="star-half"
                    size={14}
                    color={'orange'}
                />
            );
        } else {
            stars.push(
                <Ionicons
                    key={i}
                    name="star-outline"
                    size={14}
                    color={'orange'}
                />
            );
        }
    }
    return stars;
};

const averageRating = (feedbacks) => {
    if (feedbacks.length > 0) {
        const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
        const avgRating = totalRating / feedbacks.length;
        return avgRating.toFixed(1);
    }
    return 0;
}


export default {getAllProducts, renderStars, averageRating};