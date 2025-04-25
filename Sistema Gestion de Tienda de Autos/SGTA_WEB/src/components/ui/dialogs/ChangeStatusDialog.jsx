import React, { useState } from "react";
import * as carApi from "../../../api/car.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../Loading";

export const ChangeStatusDialog = ({ setOpen, car, setCar }) => {
    const [loading] = useState(false);
    const [status, setStatus] = useState(car.status || '');
    const { getError, getSuccess } = useNotification();

    const handleUpdate = async () => {
        try {
            await carApi.updateCarStatus(car.id, status);
            setStatus('');
            getSuccess("Auto actualizado correctamente");
            setCar((prevCar) => ({ ...prevCar, status }));
            setOpen(false);
        } catch (error) {
            console.error("Error updating car:", error);
            getError("Error al actualizar el auto");
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-4">Editar Auto</h2>

                            <select
                                value={status || 'Pendiente'}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border rounded mb-2"
                            >
                                  <option value="pending">Pendiente</option>
                                <option value="available">Disponible</option>
                                <option value="sold">Vendido</option>
                            </select>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleUpdate}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded mr-2"
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    onClick={() => {
                                        setStatus('');
                                        setOpen(false)
                                    }}
                                    className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
