import React from "react";
import { CarCard } from "./CarCard";

export const CarList = ({ carList }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {carList.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>  
  );
};
