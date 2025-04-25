// components/ui/modelCard.jsx
import { useNavigate } from "react-router-dom";
import { getImageSource } from "../../utils/GetImageSource";
import { useAuth } from "../../context/AuthContext"; // 👈 importa el contexto

import EditIcon from "@mui/icons-material/Edit";

export const ModelCard = ({ model, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const { user } = useAuth(); // 👈 obtiene el usuario actual

    return (
        <div className="relative border rounded-xl shadow-md overflow-hidden group">
            <img src={getImageSource(model.image)} alt={model.name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{model.name}</h3>
            </div>
            {user?.role === "admin" && (
            <button
                className="absolute top-2 right-2 text-gray-700 hover:text-blue-500"
                onClick={() => onEdit(model)}
            >
                <EditIcon />
            </button>
                        )}
        </div>
    );
};

