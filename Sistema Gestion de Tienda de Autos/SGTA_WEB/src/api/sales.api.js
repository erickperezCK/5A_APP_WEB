import api from "./base.api";

const endpoint = "/sales";

export const getAll = async () => {
    return await api.get(endpoint);
}

export const getOne = async (userId, id) => {
    return await api.get(`${endpoint}/${userId}/${id}`);
}

export const getCarsPurchased = async () => {
    return await api.get(`${endpoint}/purchased`);
}

export const buyCar = async (data) => {
    return await api.post(endpoint, data);
}

export const update = async (id, data) => {
    return await api.put(`${endpoint}/${id}`, data);
}

export const remove = async (id) => {
    return await api.delete(`${endpoint}/${id}`);
}

export const getFiltered = async (query) => {
    return await api.get(`${endpoint}?${query}`);
}