import React, { useEffect, useState } from "react";
import * as clientApi from "../../../../api/user.api";
import { useNotification } from "../../../../context/NotificationContext";
import { Loading } from "../../Loading";

export const EditClientDialog = ({ setOpen, client }) => {
    const [loading, setLoading] = useState(true);
    const [updatedClient, setUpdatedClient] = useState({});
    const { getError, getSuccess } = useNotification();

    const fetchClientData = async () => {
        try {
            setLoading(true);
            const response = await clientApi.getClientById(client.id);
            setUpdatedClient(response.data);
        } catch (error) {
            console.error("Error fetching client data:", error);
            getError("Error al obtener los datos del cliente");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await clientApi.updateClient(client.id, updatedClient);
            setUpdatedClient({});
            getSuccess("Auto actualizado correctamente");
            setOpen(false);
        } catch (error) {
            console.error("Error updating client:", error);
            getError("Error al actualizar el auto");
        }
    };

    useEffect(() => {
        fetchClientData();
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
                            <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
                            <label className="block mb-2">Nombre:</label>
                            <input 
                                type="text" 
                                value={updatedClient.name || ''} 
                                onChange={(e) => setUpdatedClient({...updatedClient, name: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <label className="block mb-2">Dirección:</label>
                            <input 
                                type="text" 
                                value={updatedClient.address || ''} 
                                onChange={(e) => setUpdatedClient({...updatedClient, address: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <label className="block mb-2">Estado:</label>
                            <input 
                                type="text" 
                                value={updatedClient.state || ''} 
                                onChange={(e) => setUpdatedClient({...updatedClient, state: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <label className="block mb-2">Municipio:</label>
                            <input 
                                type="text" 
                                value={updatedClient.municipality || ''} 
                                onChange={(e) => setUpdatedClient({...updatedClient, municipality: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />
                            
                            <label className="block mb-2">Teléfono:</label>
                            <input 
                                type="number" 
                                value={updatedClient.cellphone || ''} 
                                onChange={(e) => setUpdatedClient({...updatedClient, price: e.target.value})} 
                                className="w-full p-2 border rounded mb-2" 
                            />

                            <div className="flex justify-center">
                                <button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded mr-2">Guardar Cambios</button>
                                <button onClick={() => {
                                    setOpen(false);
                                    setUpdatedClient({});
                                }} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}