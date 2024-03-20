import axios from "axios";
import { ApiContants } from "../contants";

const AuthRequest = axios.create({
    baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});

const register = async (user) => {
    if (!user?.username || !user?.email || !user?.password) {
        return {
            status: false,
            message: "Fill Up All The Fields"
        };
    }
    try {
        let requestBody = {
            user: user?.username,
            password: user?.password,
            email: user?.email
        };
        let registerResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.REGISTER, requestBody
        )
        console.log(registerResponse?.data);
        return registerResponse?.data;
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error
        };
    }
}

export default { register };