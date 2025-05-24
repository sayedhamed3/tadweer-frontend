import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/materials`;

// Get all materials
const getAllMaterials = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching materials:", error);
        throw error;
    }
}

// Get material by id
const getOneMaterial = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching material:", error);
        throw error;
    }
}

// Search material (with pagination and search)
const searchMaterial = async (page, search, type) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/search?page=${page}&search=${search}&type=${type}`, 
            { headers : {Authorization: `Bearer ${token}`} }
        );
        return response.data;
    }
    catch (error) {
        console.error("Error searching materials:", error);
        throw error;
    }
}


export {
    getAllMaterials,
    getOneMaterial,
    searchMaterial
}