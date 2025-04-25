import React, { useEffect, useState } from "react";
import * as carApi from "../../../../api/car.api";
import { useNotification } from "../../../../context/NotificationContext";
import { Loading } from "../../Loading";
import { getImageSource } from "../../../../utils/GetImageSource";

export const SeeCarDialog = ({ setOpen, car }) => {
    const [loading, setLoading] = useState(true);
    const [carData, setCarData] = useState(null);

    const { getError } = useNotification();

    const fetchCarData = async () => {
        try {
            setLoading(true);
            const response = await carApi.getCar(car.id);
            console.log("response", response.data);
            setCarData(response.data);
        } catch (error) {
            console.error("Error fetching car data:", error);
            getError("Error al obtener los datos del agente");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            fetchCarData();
    }, []);

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-4">Detalles del Auto</h2>
                            <p><strong>Motor:</strong> {carData?.motor}</p>
                            <p><strong>Descripción:</strong> {carData?.description}</p>
                            <p><strong>Marca:</strong> {carData?.brand_name}</p>
                            <p><strong>Modelo:</strong> {carData?.model_name}</p>
                            <p><strong>Año:</strong> {carData?.year}</p>
                            <p><strong>Color:</strong> {carData?.color}</p>
                            <p><strong>Precio:</strong> {carData?.price}</p>
                            <p><strong>Estado:</strong> {carData?.status}</p>
                            <p><strong>Imagen:</strong></p>
                            <img src={getImageSource(carData?.image)} alt={carData?.name} className="w-full h-auto mb-4" />
                            <button
                                onClick={() => setOpen(false)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Cerrar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}