import React, { useEffect, useState } from "react";
import * as carApi from "../../../../api/car.api";
import { useNotification } from "../../../../context/NotificationContext";
import { Loading } from "../../Loading";
import { useAuth } from "../../../../context/AuthContext";

export const EditCarDialog = ({ setOpen, car }) => {
    const initialCarState = {
        motor: '',
        description: '',
        year: '',
        color: '',
        price: '',
        status: '',
        image: ''
    };

    const [loading, setLoading] = useState(true);
    const [updatedCar, setUpdatedCar] = useState(initialCarState);
    const { getError, getSuccess } = useNotification();
    const { user } = useAuth();

    const fetchCarData = async () => {
        try {
            setLoading(true);
            const response = await carApi.getCar(car.id);
            setUpdatedCar(response.data);
        } catch (error) {
            console.error("Error fetching car data:", error);
            getError("Error al obtener los datos del auto");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            console.log("Updated car data:", updatedCar);
            await carApi.updateCar(car.id, updatedCar);
            setUpdatedCar(initialCarState);
            getSuccess("Auto actualizado correctamente");
            setOpen(false);
        } catch (error) {
            console.error("Error updating car:", error);
            getError("Error al actualizar el auto");
        }
    };

    useEffect(() => {
        fetchCarData();
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
                            <h2 className="text-xl font-bold mb-4">Editar Auto</h2>

                            {user.role === "admin" && (
                                <>
                                    <label className="block mb-2">Motor:</label>
                                    <input
                                        type="text"
                                        value={updatedCar.motor || ''}
                                        onChange={(e) => setUpdatedCar({ ...updatedCar, motor: e.target.value })}
                                        className="w-full p-2 border rounded mb-2"
                                    />

                                    <label className="block mb-2">Descripción:</label>
                                    <input
                                        type="text"
                                        value={updatedCar.description || ''}
                                        onChange={(e) => setUpdatedCar({ ...updatedCar, description: e.target.value })}
                                        className="w-full p-2 border rounded mb-2"
                                    />

                                    <label className="block mb-2">Año:</label>
                                    <input
                                        type="number"
                                        value={updatedCar.year || ''}
                                        onChange={(e) => setUpdatedCar({ ...updatedCar, year: e.target.value })}
                                        className="w-full p-2 border rounded mb-2"
                                    />

                                    <label className="block mb-2">Color:</label>
                                    <input
                                        type="text"
                                        value={updatedCar.color || ''}
                                        onChange={(e) => setUpdatedCar({ ...updatedCar, color: e.target.value })}
                                        className="w-full p-2 border rounded mb-2"
                                    />

                                    <label className="block mb-2">Precio:</label>
                                    <input
                                        type="number"
                                        value={updatedCar.price || ''}
                                        onChange={(e) => setUpdatedCar({ ...updatedCar, price: e.target.value })}
                                        className="w-full p-2 border rounded mb-2"
                                    />

                                    <label className="block mb-2">Estado:</label>
                                </>
                            )}

                            <select
                                value={updatedCar.status || 'Estado'}
                                onChange={(e) => setUpdatedCar({ ...updatedCar, status: e.target.value })}
                                className="w-full p-2 border rounded mb-2"
                            >
                                  <option value="">Estado</option>
                                <option value="available">Disponible</option>
                                <option value="sold">Vendido</option>
                            </select>

                            { user.role === "admin" && (
                                <>
                                    <label className="block mb-2">Imagen:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setUpdatedCar({ ...updatedCar, image: reader.result });
                                            };
                                            if (file) reader.readAsDataURL(file);
                                        }}
                                        className="w-full p-2 border rounded mb-2"
                                    />
                                </>
                            )}

                            <div className="flex justify-center">
                                <button
                                    onClick={handleUpdate}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded mr-2"
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    onClick={() => {
                                        setUpdatedCar(initialCarState);
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
