import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://vendor-management-app.onrender.com/api"
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