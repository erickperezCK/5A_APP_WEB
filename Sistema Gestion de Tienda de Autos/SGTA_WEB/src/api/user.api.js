import api from "./base.api";

const endpoint = "/users";

export const getAllAgents = async () => {
    return await api.get(`${endpoint}/admin/agents`);
};

export const getAgentById = async (id) => {
    return await api.get(`${endpoint}/admin/agents/${id}`);
};

export const createAgent = async (agentData) => {
    return await api.post(`${endpoint}/admin/agents`, agentData);
};

export const deactivateAgent = async (id) => {
    return await api.delete(`${endpoint}/admin/agents/${id}`);
};

export const getAllClients = async () => {
    return await api.get(`${endpoint}/agents/clients`);
};

export const getClientById = async (id) => {
    return await api.get(`${endpoint}/agents/clients/${id}`);
};

export const activateClient = async (clientId) => {
    return await api.patch(`${endpoint}/agents/clients/${clientId}`);
};

export const deactivateClient = async (id) => {
    return await api.delete(`${endpoint}/clients/${id}`);
};

export const updateProfile = async (userData) => {
    return await api.put(endpoint, userData);
};

export const updateClient = async (clientId, clientData) => {
    return await api.put(`${endpoint}/agents/clients/${clientId}`, clientData);
};

export const updateAgent = async (agentId, agentData) => {
    return await api.put(`${endpoint}/admin/agents/${agentId}`, agentData);
};

export const registerClient = async (clientData) => {
    return await api.post(`${endpoint}/agents/clients`, clientData);
};