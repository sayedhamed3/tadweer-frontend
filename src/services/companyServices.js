import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/companies`;

// Get all companies
const getAllCompanies = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
}

// Get company by id
const getOneCompany = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching company:", error);
        throw error;
    }
}

// Update company by id (name, phone, profileImage)
const updateCompany = async (id, companyData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}`, companyData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error updating company:", error);
        throw error;
    }
}

// Add Address to company
const addAddressToCompany = async (id, addressData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/add-address`, addressData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error adding address to company:", error);
        throw error;
    }
}

// Remove Address from company
const removeAddressFromCompany = async (id, addressId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/remove-address`, { addressId }, 
            { headers: {Authorization: `Bearer ${token}`} }
        );
        console.log("HERE")
        return response.data;
    }
    catch (error) {
        console.error("Error removing address from company:", error);
        throw error;
    }
}

// Add Schedule to company (day-"Sunday", time-"10:00", addressName-"from company address.name")
const addScheduleToCompany = async (id, scheduleData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/pickUpSchedule`, scheduleData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error adding schedule to company:", error);
        throw error;
    }
}

// Update Schedule in company (day-"Sunday", time-"10:00", addressName-"from company address.name")
const modifyScheduleInCompany = async (id,scheduleId, scheduleData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/pickUpSchedule/${scheduleId}`, scheduleData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error modifying schedule in company:", error);
        throw error;
    }
}

// Remove Schedule from company
const removeScheduleFromCompany = async (id, scheduleId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/${id}/pickUpSchedule`, { scheduleId }, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error removing schedule from company:", error);
        throw error;
    }
}


const clearScheduleFromCompany = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/${id}/pickUpSchedule`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error clearing schedule from company:", error);
        throw error;
    }
}


export {
    getAllCompanies,
    getOneCompany,
    updateCompany,
    addAddressToCompany,
    removeAddressFromCompany,
    addScheduleToCompany,
    modifyScheduleInCompany,
    removeScheduleFromCompany,
    clearScheduleFromCompany
}