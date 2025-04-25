import api from "./base.api";

export const login = async (credentials) => {
    return await api.post("/auth/login", credentials);
};

export const register = async (userData) => {
    return await api.post("/auth/register", userData);
}

export const logout = async () => {
    return await api.post("/auth/logout");
}

export const forgotPassword = async (email) => {
    return await api.post("/auth/forgot-password", { email });
}

export const sendRegisterCode = async (email) => {
    return await api.post("/auth/send-register-code", { email });
}

export const verifyRegisterCode = async (email, code) => {
    return await api.post("/auth/verify-register-code", { email, code });
}

export const verifyResetCode = async (email, code) => {
    return await api.post("/auth/verify-reset-code", { email, code });
}

export const recoverPassword = async (email, newPassword) => {
    return await api.post("/auth/recover-password", { email, newPassword });
}

export const changePassword = async (oldPassword, newPassword) => {
    return await api.post("/auth/change-password", { oldPassword, newPassword });
}

export const verifyToken = () => {
    return api.get("/auth/verify-token");
}