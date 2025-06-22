import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    localStorage.setItem("authToken", response.data.accessToken);
    return response.data;
};
