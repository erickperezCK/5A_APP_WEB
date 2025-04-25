import api from './base.api';

const endpoint = '/services';

export const getAllServices = async () => {
    return await api.get(endpoint);
}

export const getServiceById = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}

export const createService = async (service) => {
    return await api.post(endpoint, service);
}

export const updateService = async (id, service) => {
    return await api.put(`${endpoint}/${id}`, service);
}

export const deleteService = async (id) => {
    return await api.delete(`${endpoint}/${id}`);
}