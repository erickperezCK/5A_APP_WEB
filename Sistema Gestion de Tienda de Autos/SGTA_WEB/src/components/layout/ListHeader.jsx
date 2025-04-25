import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "../../context/AuthContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupsIcon from "@mui/icons-material/Groups";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';

export const ListHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); 
    const location = useLocation();
    const [showPanelsDropdown, setShowPanelsDropdown] = useState(false);

    const pageTitles = {
        "/sales": "Ventas",
        "/clients": "Clientes",
        "/cars": "Autos",
        "/brandscatalog": "Catalogo de marcas",
        "/agents": "Agentes",
    }

    const handleLogout = () => {
        logout();
    }

    const getPageTitle = () => {
        return pageTitles[location.pathname] || "Panel";
    }

    const getUserRoleText = () => {
        if (!user) return "";
        if (user.role === "admin") return "Administrador";
        if (user.role === "agent") return "Agente de ventas";
        if (user.role === "client") return user.name ? `Cliente - ${user.name}` : "Cliente";
        return user.role.charAt(0).toUpperCase() + user.role.slice(1);
    };

    const getPanels = () => {
        const panels = [
            {
                name: "Ventas",
                icon: <AttachMoneyIcon className="text-gray-700 mr-2" />,
                route: "/sales",
            },
            {
                name: "Autos",
                icon: <DirectionsCarIcon className="text-gray-700 mr-2" />,
                route: "/cars",
            },
            {
                name: "Marcas",
                icon: <ApartmentIcon className="text-gray-700 mr-2" />,
                route: "/brandscatalog",
            },
            {
                name: "Clientes",
                icon: <GroupsIcon className="text-gray-700 mr-2" />,
                route: "/clients",
            },
        ];

        if (user?.role === "admin") {
            panels.push({
                name: "Agentes",
                icon: <SupportAgentIcon className="text-gray-700 mr-2" />,
                route: "/agents",
            });
        }

        return panels;
    };

    return (
        <header className="bg-blue-900 w-full h-28 flex items-center px-5 text-white">
            {/* Sección izquierda: Logo y navegación */}
            <div className="flex items-center w-1/3">
                <img 
                    src="/src/assets/logo/logo8.png" 
                    alt="Logo" 
                    className="h-32 cursor-pointer" 
                    onClick={() => navigate("/")} 
                />
                
                <div className="flex items-center ml-10 space-x-6">
                    <p 
                        className="text-xl cursor-pointer hover:text-blue-200 transition-colors"
                        onClick={() => navigate("/")}
                    >
                        Volver
                    </p>
                    
                    {user && (user.role === "admin" || user.role === "agent") && (
                        <div className="relative">
                            <div 
                                className="flex items-center cursor-pointer hover:text-blue-200 transition-colors"
                                onClick={() => setShowPanelsDropdown(!showPanelsDropdown)}
                            >
                                <span className="text-xl">Paneles</span>
                                <ArrowDropDownIcon />
                            </div>
                            
                            {showPanelsDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 text-gray-800">
                                    {getPanels().map((panel, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(panel.route);
                                                setShowPanelsDropdown(false);
                                            }}
                                        >
                                            {panel.icon}
                                            <span>{panel.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Sección central: Título */}
            <div className="w-1/3 flex justify-center">
                <h1 className="text-5xl font-bold text-center">
                    {getPageTitle()}
                </h1>
            </div>
            
            {/* Sección derecha: Usuario */}
            <div className="w-1/3 flex justify-end pr-5">
                {user && (
                    <div className="flex items-center pt-5">
                        <span className="mr-4 font-semibold">
                            {getUserRoleText()}
                        </span>
                        <AccountCircleIcon 
                            className="cursor-pointer mr-4 hover:text-blue-200 transition-colors" 
                            sx={{fontSize:40}} 
                            onClick={() => navigate("/profile")} 
                        />  
                        <button 
                            className="cursor-pointer btn btn-primary hover:bg-blue-700 transition-colors"
                            onClick={() => handleLogout()}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}