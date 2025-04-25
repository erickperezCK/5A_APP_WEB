import api from "./base.api";

const endpoint = "/models";

export const getModels = async (brandId) => {
    return await api.get(`${endpoint}/${brandId}`,);
}

export const getModelsByBrandId = async (brandId) => {
    return await api.get(`${endpoint}/brand/${brandId}`,);
}

export const getModel = async (id) => {
    return await api.get(`${endpoint}/${id}`);
}

export const createModel = async (id, model) => {
    return await api.post(`${endpoint}/${id}`, model);
}

export const updateModel = async (id, model) => {
    return await api.put(`${endpoint}/${id}`, model);
}

export const deleteModel = async (id) => {
    return await api.delete(`${endpoint}/${id}`);
}

export const deactivateModel = async (id) => {
    return await api.delete(`${endpoint}/deactivate/${id}`);
}

export const activateModel = async (id) => {
    return await api.post(`${endpoint}/activate/${id}`);
}