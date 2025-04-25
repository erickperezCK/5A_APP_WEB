import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginDialog } from "../ui/dialogs/LoginDialog";
import { RegisterDialog } from "../ui/dialogs/RegisterDialog";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupsIcon from "@mui/icons-material/Groups";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const Header = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { user, logout } = useAuth();

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [showPanelsDropdown, setShowPanelsDropdown] = useState(false);

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        if (openRegisterDialog || openLoginDialog) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openRegisterDialog, openLoginDialog]);

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
                name: "Clientes",
                icon: <GroupsIcon className="text-gray-700 mr-2" />,
                route: "/clients",
            },
            {
                name: "Marcas",
                icon: <ApartmentIcon className="text-gray-700 mr-2" />,
                route: "/brandscatalog",
            }
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
        <header className="bg-header w-full h-28 flex items-center px-5">
            <div className="logo cursor-pointer" onClick={() => navigate("/")}>
                <img
                    src="/src/assets/logo/logo2.png"
                    alt="Logo"
                    className="h-32 mr-8 cursor-pointer"
                />
            </div>
            <div className="flex-1 h-full">
                <nav className="flex h-full space-x-5 p-4">
                    <ul className="flex items-end items-center space-x-5">
                        {/*<li className="cursor-pointer" onClick={() => navigate("/brands")}>
                            Marcas
                        </li>
                        <li className="cursor-pointer" onClick={() => navigate("/popular")}>
                            Populares
                        </li> */}
                        <li className="cursor-pointer" onClick={() => navigate("/catalog")}>
                            Catálogo
                        </li>
                        {user && (user.role === "admin" || user.role === "agent") && (
                            <li className="relative">
                                <div 
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setShowPanelsDropdown(!showPanelsDropdown)}
                                >
                                    <span>Paneles</span>
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
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="pt-5 pr-5 flex items-center">
                {user && (
                    <span className="mr-4 font-semibold">
                        {getUserRoleText()}
                    </span>
                )}
                <AccountCircleIcon
                    className="cursor-pointer mr-4"
                    sx={{ fontSize: 40 }}
                    onClick={() => {
                        !user ? setOpenLoginDialog(true) : navigate("/profile");
                    }}
                />
                {user && (
                    <button
                        className="cursor-pointer btn btn-primary"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                )}
            </div>
            {openLoginDialog && (
                <LoginDialog
                    setOpenLoginDialog={setOpenLoginDialog}
                    setOpenRegisterDialog={setOpenRegisterDialog}
                />
            )}
            {openRegisterDialog && (
                <RegisterDialog
                    setOpenRegisterDialog={setOpenRegisterDialog}
                    setOpenLoginDialog={setOpenLoginDialog}
                />
            )}
        </header>
    );
};