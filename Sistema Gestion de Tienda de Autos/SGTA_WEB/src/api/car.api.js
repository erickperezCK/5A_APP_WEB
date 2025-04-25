import api from './base.api';

const endpoint = '/cars';

export const getCars = async () => { 
    return await api.get(endpoint);
};

export const getCar = async (id) => {
    return await api.get(`${endpoint}/${id}`);
};

export const getAvailableCars = async () => {
    return await api.get(`${endpoint}/available`);
}

export const createCar = async (car) => {
    return await api.post(endpoint, car);
};

export const updateCar = async (id, car) => {
    return await api.put(`${endpoint}/${id}`, car);
};

export const updateCarStatus = async (id, status) => {
    return await api.patch(`${endpoint}/${id}`, { status });
};

export const deleteCar = async (id) => {
    return await api.delete(`${endpoint}/${id}`);
};

export const getMostExpensiveCars = async () => {
    return await api.get(`${endpoint}/expensive`);
};

export const getCarsByBrand = async (brandId) => {
    return await api.get(`${endpoint}/by-brand/${brandId}`);
};

export const getCarsByBrandName = async (brandName) => {
    return await api.get(`${endpoint}/by-brand-name/${brandName}`);
};

export const getCarByName = async (name) => {
    return await api.get(`${endpoint}/by-name/${name}`);
}