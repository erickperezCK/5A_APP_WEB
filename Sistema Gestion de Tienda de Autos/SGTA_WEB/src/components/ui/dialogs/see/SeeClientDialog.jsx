import React, { useEffect, useState } from "react";
import * as clientApi from "../../../../api/user.api";
import { useNotification } from "../../../../context/NotificationContext";
import { Loading } from "../../Loading";

export const SeeClientDialog = ({ setOpen, client }) => {
    const [loading, setLoading] = useState(true);
    const [clientData, setClientData] = useState(null);

    const { getError } = useNotification();

    const fetchClientData = async () => {
        try {
            setLoading(true);
            const response = await clientApi.getClientById(client.id);
            setClientData(response.data);
        } catch (error) {
            console.error("Error fetching client data:", error);
            getError("Error al obtener los datos del cliente");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientData();
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
                            <h2 className="text-xl font-bold mb-4">Detalles del Cliente</h2>
                            <p><strong>Nombre:</strong> {clientData?.name}</p>
                            <p><strong>Email:</strong> {clientData?.email}</p>
                            <p><strong>Teléfono:</strong> {clientData?.cellphone}</p>
                            <p><strong>Dirección:</strong> {clientData?.address}, {clientData?.municipality}, {clientData?.state}</p>
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