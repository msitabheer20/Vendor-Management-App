import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api"
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;