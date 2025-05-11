import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/achievements`;

// Sign up
const signUp = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/sign-up`, userData);
        return response.data;
    }
    catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}

const login = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, userData);
        return response.data;
    }
    catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export {
    signUp,
    login
}