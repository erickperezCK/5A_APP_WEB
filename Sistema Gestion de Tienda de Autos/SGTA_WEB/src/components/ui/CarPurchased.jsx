import React from "react";
import { getImageSource } from "../../utils/GetImageSource";


export const CarPurchased = ({ car }) => {
  return (
    <div 
      className={`rounded-2xl shadow-lg overflow-hidden w-80 m-4`}
    >
      <img
        src={getImageSource(car.image)}
        alt={car.description || "Imagen del carro"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{car.name}</h2>
        <h2 className="text-xl font-bold text-gray-800">Modelo: {car.model_name}</h2>
        <p className="text-gray-600 mt-2">{car.description || "Sin descripción"}</p>
        <p className="text-blue-500 font-semibold mt-2">${parseFloat(car.price).toFixed(2)}</p>
        <p className="text-sm mt-1">
          <span className="font-semibold">Color:</span> {car.color || "No especificado"}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Motor:</span> {car.motor || "No especificado"}
        </p>
      </div>
    </div>
  );
};
