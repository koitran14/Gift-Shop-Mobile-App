import axios from "axios";
import { ApiContants } from "../contants";

const register = async (user) => {
    if (!user?.username || !user?.email || !user?.password) {
        return {
            status: false,
            message: "Fill Up All The Fields"
        };
    }
    try {
        let requestBody = {
            username: user?.username,
            password: user?.password,
            email: user?.email
        };
        let registerResponse = await axios.post(
            ApiContants.BACKEND_API.REGISTER, 
            requestBody
        );
        return registerResponse?.data;
    } catch (error) {
        return {
            status: false,
            message: error
        };
    }
}

const login = async user => {
    if (!user?.username || !user?.password){
        return { status: false, message: 'Please fill up all fields'};
    }
    try {
        let requestBody = {
            username: user?.username,
            password: user?.password,
        }
        let loginResponse = await axios.post(
            ApiContants.BACKEND_API.LOGIN,
            requestBody,
        );
        return loginResponse?.data;
    } catch (error) {
        return { status: false, message: 'Oops! Something went wrong.'};
    }
}

const checkUserExist = async(type, value) => {
    try {
        let params = {[type]: value};
        let userCheckResponse = await axios.get(
            ApiContants.BACKEND_API.USER_EXIST,
            {params}
        )
        return userCheckResponse?.data;
    } catch (error) {
        return {status: false, message: 'Oops! Something went wrong'};    
    }
}

export default { register, login, checkUserExist };