import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/achievements`;

// Get all achievements
const getAllAchievements = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching achievements:", error);
        throw error;
    }
}

// Get achievement by id
const getOneAchievement = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching achievement:", error);
        throw error;
    }
}


export {
    getAllAchievements,
    getOneAchievement
}
