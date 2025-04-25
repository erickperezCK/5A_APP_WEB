import Clear from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import * as servicesApi from "../../../api/services.api";
import { useNotification } from "../../../context/NotificationContext";

export const ServicesDialog = ({ setOpenServices, handleSale, totalPrice, setTotalPrice }) => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const { getError } = useNotification();
    const [initialPrice] = useState(totalPrice);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await servicesApi.getAllServices();
                setServices(response.data);
            } catch (error) {
                getError("Error al obtener los servicios");
                console.error("Error al obtener los servicios:", error);
            }
        };

        fetchServices();
    }, []);

    const calculateTotalPrice = () => {
        const additionalCost = selectedServices.reduce(
            (acc, service) => acc + Number(service.price),
            0
        );
        
        const newTotal = Number(initialPrice) + additionalCost;
    
        if (!isNaN(newTotal)) {
            setTotalPrice(parseFloat(newTotal.toFixed(2)));
        } else {
            getError("Error al calcular el precio total");
        }
    };    

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedServices]);

    const handleServiceSelect = (service, type) => {
        const isAlreadySelected = selectedServices.some(
            (s) => s.id === service.id
        );

        if (isAlreadySelected) {
            // Actualiza el tipo si ya existe
            setSelectedServices((prev) =>
                prev.map((s) =>
                    s.id === service.id ? { ...s, type } : s
                )
            );
        } else {
            setSelectedServices((prev) => [
                ...prev,
                {
                    id: service.id,
                    name: service.name,
                    price: service.price,
                    type: type,
                },
            ]);
        }
    };

    const handleRemoveService = (id) => {
        setSelectedServices((prev) => prev.filter((s) => s.id !== id));
    };

    const handleConfirmSale = () => {
        console.log("Servicios seleccionados:", selectedServices);
        handleSale({
            additionalServices: selectedServices,
        });
        setOpenServices(false);
    };

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-full max-w-md max-h-screen overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Servicios Adicionales</h2>
                    <p className="text-gray-800 text-xl mb-4">Selecciona los servicios que deseas añadir.</p>

                    {services.length > 0 ? (
                        <div className="mb-4 space-y-4 max-h-64 overflow-y-auto">
                            {services.map((service) => (
                                <div key={service.id} className="border-b py-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-800 font-medium">{service.name}</span>
                                        <span className="text-gray-600">${service.price}</span>
                                    </div>
                                    <select
                                        className="w-full border rounded px-2 py-1 text-gray-700"
                                        defaultValue=""
                                        onChange={(e) =>
                                            handleServiceSelect(service, e.target.value)
                                        }
                                    >
                                        <option value="">Seleccionar tipo...</option>
                                        <option value="monthly">Mensual</option>
                                        <option value="annual">Anual</option>
                                        <option value="one-time">Único Pago</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            No hay servicios disponibles por el momento
                        </div>
                    )}

                    {/* Servicios seleccionados */}
                    {selectedServices.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Servicios Seleccionados:</h3>
                            <ul className="space-y-2">
                                {selectedServices.map((service) => (
                                    <li
                                        key={service.id}
                                        className="flex justify-between items-center border p-2 rounded"
                                    >
                                        <div>
                                            <span className="font-medium">{service.name}</span>{" "}
                                            <span className="text-sm text-gray-500">({service.type})</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold">${service.price}</span>
                                            <button
                                                onClick={() => handleRemoveService(service.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Clear />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex justify-between items-center my-4">
                        <span className="text-gray-600 font-semibold">Total:</span>
                        <span className="text-xl font-bold">${totalPrice}</span>
                    </div>

                    <button
                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={handleConfirmSale}
                    >
                        Confirmar Compra
                    </button>

                    <button
                        onClick={() => setOpenServices(false)}
                        className="absolute top-2 right-2 cursor-pointer"
                    >
                        <Clear />
                    </button>
                </div>
            </div>
        </div>
    );
};
