import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;


// Get all users
const getAllUsers = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

// Get user by id
const getOneUser = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

// Update user by id

const updateUser = async (id, userData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}`, userData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

// Delete user by id
const deleteUser = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}






export {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}