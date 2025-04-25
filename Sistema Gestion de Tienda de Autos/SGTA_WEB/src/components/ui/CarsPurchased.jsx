import React from "react";
import { CarPurchased } from "./CarPurchased";

export const CarsPurchased = ({ carList }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {carList.map((car) => (
        <CarPurchased key={car.id} car={car.car} />
      ))}
    </div>  
  );
};
