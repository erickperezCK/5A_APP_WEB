import React, { useEffect, useState } from "react";
import * as agentApi from "../../../../api/user.api";
import { useNotification } from "../../../../context/NotificationContext";
import { Loading } from "../../Loading";

export const EditAgentDialog = ({ setOpen, agent }) => {
    const [loading, setLoading] = useState(true);
    const [updatedAgent, setUpdatedAgent] = useState({});
    const { getError, getSuccess } = useNotification();

    const fetchAgentData = async () => {
        try {
            setLoading(true);
            const response = await agentApi.getAgentById(agent.id);
            setUpdatedAgent(response.data);
        } catch (error) {
            console.error("Error fetching agent data:", error);
            getError("Error al obtener los datos del agente");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await agentApi.updateAgent(agent.id, updatedAgent);
            getSuccess("Auto actualizado correctamente");
            setUpdatedAgent({});
            setOpen(false);
        } catch (error) {
            console.error("Error updating agent:", error);
            getError("Error al actualizar el auto");
        }
    };

    useEffect(() => {
        fetchAgentData();
    }, []);

    return (
        <div>
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-4">Editar Agente</h2>
                            <label className="block mb-2">Nombre:</label>
                            <input 
                                type="text" 
                                value={updatedAgent.name || ''} 
                                onChange={(e) => setUpdatedAgent({...updatedAgent, name: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <label className="block mb-2">Dirección:</label>
                            <input 
                                type="text" 
                                value={updatedAgent.address || ''} 
                                onChange={(e) => setUpdatedAgent({...updatedAgent, address: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <label className="block mb-2">Estado:</label>
                            <input 
                                type="text" 
                                value={updatedAgent.state || ''} 
                                onChange={(e) => setUpdatedAgent({...updatedAgent, state: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <label className="block mb-2">Municipio:</label>
                            <input 
                                type="text" 
                                value={updatedAgent.municipality || ''} 
                                onChange={(e) => setUpdatedAgent({...updatedAgent, municipality: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />
                            
                            <label className="block mb-2">Teléfono:</label>
                            <input 
                                type="number" 
                                value={updatedAgent.cellphone || ''} 
                                onChange={(e) => setUpdatedAgent({...updatedAgent, price: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <div className="flex justify-center">
                                <button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded mr-2">Guardar Cambios</button>
                                <button onClick={() => {
                                    setOpen(false);
                                    setUpdatedAgent({});
                                }} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}