import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/workers`;

const getAllWorkers = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching workers:", error);
        throw error;
    }
}

const getOneWorker = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching worker:", error);
        throw error;
    }
}

const updateWorker = async (id, workerData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}`, workerData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error updating worker:", error);
        throw error;
    }
}

export {
    getAllWorkers,
    getOneWorker,
    updateWorker
}

