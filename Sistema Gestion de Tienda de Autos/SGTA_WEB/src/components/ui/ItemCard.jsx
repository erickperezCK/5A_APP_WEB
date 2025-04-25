import { useNavigate } from "react-router-dom";

export const ItemCard = ({ item, }) => {
    const navigate = useNavigate();

    return (
        <div
                key={item.id}
                className="w-full flex-shrink-0 flex flex-col items-center p-4 cursor-pointer"
                onClick={() => navigate(`/brands/${item.id}`)}
            >
                <img
                src={`data:image/png;base64,${btoa(
                    String.fromCharCode(...item.brand_image.data)
                )}`}
                alt={item.name}
                className="w-90 h-60 object-contain rounded-xl shadow-lg"
                />
                <p className="mt-2 text-lg font-bold text-gray-700">{item.name}</p>
            </div>
    )
}