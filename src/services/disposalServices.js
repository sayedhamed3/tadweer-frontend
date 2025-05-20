import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/disposals`;

// Get all disposals
const getAllDisposals = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching disposals:", error);
        throw error;
    }
}

// Get all pending disposals
const getAllPendingDisposals = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/pending`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching pending disposals:", error);
        throw error;
    }
}

// Get disposal by id
const getOneDisposal = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching disposal:", error);
        throw error;
    }
}

// Get disposal by worker id
const getDisposalByWorkerId = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/worker/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching disposal by worker id:", error);
        throw error;
    }
}


// Get disposal by company id
const getDisposalByCompanyId = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/company/${id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error fetching disposal by company id:", error);
        throw error;
    }
}

// Create a new disposal (company, disposalDate, addressName)
const createDisposal = async (disposalData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${BASE_URL}/`, disposalData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error creating disposal:", error);
        throw error;
    }
}

// Accept disposal (id)
const acceptDisposal = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/accept`, {}, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error accepting disposal:", error);
        throw error;
    }
}

// Reject disposal (id, rejectionMessage)
const rejectDisposal = async (id, rejectionMessage) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/reject`, { rejectionMessage }, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error rejecting disposal:", error);
        throw error;
    }
}

// Update disposal (id, either status or disposalDate)
const updateDisposal = async (id, disposalData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}`, disposalData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error updating disposal:", error);
        throw error;
    }
}

// Add Material to disposal (id, material, quantity)
const addMaterialToDisposal = async (id, materialData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/add-material`, materialData, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error adding material to disposal:", error);
        throw error;
    }
}

// remove material from disposal (id, materialId)
const removeMaterialFromDisposal = async (id, materialId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/${id}/remove-material`, { materialId }, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error removing material from disposal:", error);
        throw error;
    }
}

// Complete disposal (id)
const completeDisposal = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BASE_URL}/${id}/complete`, {}, 
            { headers: {Authorization: `Bearer ${token}`} }
        );

        return response.data;
    }
    catch (error) {
        console.error("Error completing disposal:", error);
        throw error;
    }
}


export {
    getAllDisposals,
    getAllPendingDisposals,
    getOneDisposal,
    getDisposalByWorkerId,
    getDisposalByCompanyId,
    createDisposal,
    acceptDisposal,
    rejectDisposal,
    updateDisposal,
    addMaterialToDisposal,
    removeMaterialFromDisposal,
    completeDisposal
}
