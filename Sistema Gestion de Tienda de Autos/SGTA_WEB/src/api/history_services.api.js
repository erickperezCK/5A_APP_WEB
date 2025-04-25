import api from './base.api'; 
const endpoint = '/history-services'; 

export const getAllHistoryServices = async () => {
    return await api.get(endpoint);
};

export const getHistoryServiceById = async (id) => {
    return await api.get(`${endpoint}/${id}`);
};

export const createHistoryService = async (saleId, serviceId, expirationDate) => {
    return await api.post(endpoint, { saleId, serviceId, expirationDate });
};

export const deleteHistoryService = async (id) => {
    return await api.delete(`${endpoint}/${id}`);
};