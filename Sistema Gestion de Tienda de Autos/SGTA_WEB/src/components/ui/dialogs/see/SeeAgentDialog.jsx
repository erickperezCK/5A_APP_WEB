import React, { useEffect, useState } from "react";
import * as agentApi from "../../../../api/user.api";
import { useNotification } from "../../../../context/NotificationContext";
import { Loading } from "../../Loading";

export const SeeAgentDialog = ({ setOpen, agent }) => {
    const [loading, setLoading] = useState(true);
    const [agentData, setAgentData] = useState(null);

    const { getError } = useNotification();

    const fetchAgentData = async () => {
        try {
            setLoading(true);
            const response = await agentApi.getAgentById(agent.id);
            setAgentData(response.data);
        } catch (error) {
            console.error("Error fetching agent data:", error);
            getError("Error al obtener los datos del agente");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgentData();
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
                            <h2 className="text-xl font-bold mb-4">Detalles del Agente</h2>
                            <p><strong>Nombre:</strong> {agentData?.name}</p>
                            <p><strong>Email:</strong> {agentData?.email}</p>
                            <p><strong>Teléfono:</strong> {agentData?.cellphone}</p>
                            <p><strong>Dirección:</strong> {agentData?.address}</p>
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