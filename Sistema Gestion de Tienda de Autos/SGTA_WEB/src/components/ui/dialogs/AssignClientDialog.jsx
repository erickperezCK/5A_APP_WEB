import React, { useState } from "react";

export const AssignClientDialog = ({ 
    clients, 
    onClose, 
    onAssign,
    setOpenAddClientDialog 
}) => {
    const [selectedId, setSelectedId] = useState("");

    return (
        <div className="fixed inset-0 z-40">
            {/* Fondo semitransparente */}
            <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            
            {/* Contenedor del diálogo */}
            <div className="relative flex items-center justify-center h-full z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Asignar cliente</h2>
                    
                    <div className="flex justify-between gap-4">
                    <select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-base mb-4"
                    >
                        <option value="">Selecciona un cliente</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name} ({client.email})
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center mb-4">
                        <button
                            className="bg-blue-600  text-white px-4 py-2 rounded flex items-center"
                            onClick={() => {
                                onClose();
                                setOpenAddClientDialog(true);
                            }}
                        >
                            <span className="">+</span>
                        </button>
                    </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            className="ml-2 bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400 transition duration-200"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bw-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                            disabled={!selectedId}
                            onClick={() => onAssign(selectedId)}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};