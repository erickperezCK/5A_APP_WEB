import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../api/auth.api";
import * as userApi from "../api/user.api";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const { getError, getSuccess } = useNotification();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
    }, []);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await authApi.verifyToken();
            } catch (error) {
                getError("Sesión expirada, por favor inicie sesión nuevamente");
                logout();
            }
        };
        if (user) {
            verifyToken();
        }
        return () => {
            setUser(null);
        };
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authApi.login(credentials);
            setUser(response.data.user);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));

            if (response.data.user.role === "admin" || response.data.user.role === "agent") {
                navigate("/");
            }
            else {
                navigate("/");
            }

        } catch (error) {
            console.error("Error en login:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authApi.register(userData);
            setUser(response.data.user);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
        } catch (error) {
            console.error("Error en registro:", error.response?.data?.message || error.message);
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            sessionStorage.removeItem("user");
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            await authApi.logout();
            navigate("/");
        } catch (error) {
            console.error("Error en logout:", error.response?.data?.message || error.message);
        }
    };

    const update = async (userData) => {
        try {
            const response = await userApi.updateProfile(userData);
            setUser(response.data.updatedUser);
            sessionStorage.setItem("user", JSON.stringify(response.data.updatedUser));
        } catch (error) {
            console.error("Error al actualizar:", error.response?.data?.message || error.message);
        }
    };

    const changePassword = async (newPassword, oldPassword) => {
        try {
            const response = await authApi.changePassword({newPassword, oldPassword});
            if (response.status === 200) {
                getSuccess("Contraseña cambiada correctamente");
                logout();
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error.message);
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, register, logout, update, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}