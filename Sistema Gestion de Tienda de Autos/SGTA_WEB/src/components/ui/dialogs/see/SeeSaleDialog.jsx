import React, { useEffect, useState } from "react";
import * as saleApi from "../../../../api/sales.api";
import { useNotification } from "../../../../context/NotificationContext";
import { Loading } from "../../Loading";
import { useAuth } from "../../../../context/AuthContext";
import { getImageSource } from "../../../../utils/GetImageSource";

export const SeeSaleDialog = ({ setOpen, sale }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saleData, setSaleData] = useState(null);

    const { getError } = useNotification();

    const fetchSaleData = async () => {
        try {
            setLoading(true);
            const response = await saleApi.getOne(user.id, sale.id);
            console.log("Sale data:", response.data);
            setSaleData(response.data);
        } catch (error) {
            console.error("Error fetching sale data:", error);
            getError("Error al obtener los datos de la venta");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            fetchSaleData();
    }, []);

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Detalles de la Venta</h2>
                            <p><strong>Cliente:</strong> {saleData?.client_name}</p>
                            <p><strong>Agente:</strong> {saleData?.agent_name || "Sin vendedor"}</p>
                            <p><strong>Auto:</strong> {saleData?.car_name}</p>
                            <p><strong>Precio:</strong> {saleData?.total_price}</p>
                            <p><strong>Fecha:</strong> {new Date(saleData?.created_at).toLocaleDateString()}</p>
                            <p><strong>Servicios Adicionales:</strong></p>
                            {saleData?.history_services && saleData?.history_services.length === 0 ? (
                            <ul className="list-disc pl-5 mb-4">
                                {saleData?.history_services.map((service) => (
                                    <li key={service.id}>{service.name}</li>
                                ))}
                            </ul>
                            ) : (
                                <p>No hay servicios adicionales.</p>
                            )}
                            <image src={getImageSource(saleData?.car_image)} alt="Car" className="w-full h-auto mb-4" />
                            <div className="w-full flex justify-center">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded m-auto"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}