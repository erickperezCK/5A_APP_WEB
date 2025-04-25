import api from './base.api';

const endpoint = '/brands';

export const getBrands = async () => {
    return await api.get(endpoint);
}

export const getBrand = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}

export const createBrand = async (brand) => {
    return await api.post(endpoint, brand);
}

export const updateBrand = async (id, brand) => {
    return await api.put(`${endpoint}/${id}`, brand);
}

export const deactivateBrand = async (id) => {
    return await api.patch(`${endpoint}/${id}`);
}

export const activateBrand = async (id) => {
    return await api.patch(`${endpoint}/${id}`);
}