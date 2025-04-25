// components/ui/BrandCard.jsx
import { useNavigate } from "react-router-dom";
import { getImageSource } from "../../utils/GetImageSource";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../context/AuthContext"; // 👈 importa el contexto

export const BrandCard = ({ brand, onEdit }) => {
    const navigate = useNavigate();
    const { user } = useAuth(); // 👈 obtiene el usuario actual

    return (
        <div
            className="relative border rounded-xl shadow-md overflow-hidden group cursor-pointer"
            onClick={() => navigate(`/brands/models/${brand.name}`)}
        >
            {/* Mostrar ícono solo si el usuario es admin */}
            {user?.role === "admin" && (
                <button
                    className="absolute top-2 right-2 z-10 text-gray-700 hover:text-blue-500"
                    onClick={(e) => {
                        e.stopPropagation(); // Evita que se dispare el navigate
                        onEdit(brand);
                    }}
                >
                    <EditIcon />
                </button>
            )}

            <img
                src={getImageSource(brand.image)}
                alt={brand.name}
                className="w-full h-40 object-cover"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold">{brand.name}</h3>
            </div>
        </div>
    );
};
