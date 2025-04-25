import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getImageSource } from "../../utils/GetImageSource";

export const SlidingCarrousel = ({ items, endpoint, isCar }) => {

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
        <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            }}
        >
            {items.map((item, _index) => (
            <div
                key={item.id}
                className="w-full flex-shrink-0 flex flex-col items-center p-4 cursor-pointer"
                onClick={() => navigate(`/${endpoint}/${isCar ? item.id : item.name}`)}
            >
                <img
                src={getImageSource(item.image)}
                alt={item.name}
                className="w-90 h-60 object-contain rounded-xl shadow-lg"
                />
                <p className="mt-2 text-lg font-bold text-gray-700">{item.name}</p>
            </div>
            ))}
        </div>

        { items.length > 1 && (
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
                <ChevronLeft size={24} />
            </button>
        )}
        
        { items.length > 1 && (
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
                <ChevronRight size={24} />
            </button>
        )}

        <div className="flex justify-center mt-4 space-x-2">
            {items.map((_, index) => (
            <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
            />
            ))}
        </div>
        </div>
    );
};
