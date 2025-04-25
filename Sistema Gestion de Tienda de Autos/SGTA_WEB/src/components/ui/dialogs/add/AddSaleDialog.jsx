import Clear from '@mui/icons-material/Clear';
import { useRef, useState } from 'react';
import { saleSchema } from '../../../../utils/ValidateForm';
import { useNotification } from '../../../../context/NotificationContext';
import * as salesApi from '../../../../api/sales.api';

export const AddSaleDialog = ({ open, setOpen }) => {
    const [carId, setCarId] = useState('');
    const [clientId, setClientId] = useState('');
    const [agentId, setAgentId] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const carRef = useRef();
    const clientRef = useRef();
    const agentRef = useRef();
    const priceRef = useRef();

    const { getError, getSuccess } = useNotification();

    const handleAddSale = async () => {
        const result = await saleSchema.safeParse({
            carId,
            clientId,
            agentId,
            totalPrice,
        });

        if (!result.success) {
            const fieldErrors = result.error.format();

            if (fieldErrors.carId) {
                getError('El ID del auto es incorrecto');
                carRef.current.focus();
            } else if (fieldErrors.clientId) {
                getError('El ID del cliente es incorrecto');
                clientRef.current.focus();
            } else if (fieldErrors.agentId) {
                getError('El ID del agente es incorrecto');
                agentRef.current.focus();
            } else if (fieldErrors.totalPrice) {
                getError('El precio total es incorrecto');
                priceRef.current.focus();
            }
            return;
        }

        try {
            await salesApi.create({
                car_id: carId,
                client_id: clientId,
                agent_id: agentId,
                total_price: parseFloat(totalPrice),
            });
            setCarId('');
            setClientId('');
            setAgentId('');
            setTotalPrice('');
            getSuccess('Venta registrada correctamente');
            setOpen(false);
        } catch (error) {
            console.error(
                'Error al registrar la venta:',
                error.response?.data?.message || error.message
            );
            getError('Error al registrar la venta');
        }
    };

    return open ? (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-full max-w-md sm:w-full sm:max-w-md max-h-screen overflow-y-auto opacity-100">
                    <h2 className="text-2xl font-bold mb-4">Registrar Venta</h2>
                    <p className="text-gray-500 mb-4">Completa los datos para registrar una nueva venta.</p>

                    <div className="mb-4">
                        <label htmlFor="carId">ID del Auto</label>
                        <input
                            type="number"
                            id="carId"
                            ref={carRef}
                            value={carId}
                            onChange={(e) => setCarId(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded"
                        />

                        <label htmlFor="clientId">ID del Cliente</label>
                        <input
                            type="number"
                            id="clientId"
                            ref={clientRef}
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded"
                        />

                        <label htmlFor="agentId">ID del Agente (Opcional)</label>
                        <input
                            type="number"
                            id="agentId"
                            ref={agentRef}
                            value={agentId}
                            onChange={(e) => setAgentId(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded"
                        />

                        <label htmlFor="totalPrice">Precio Total</label>
                        <input
                            type="number"
                            id="totalPrice"
                            ref={priceRef}
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded"
                        />

                        <button
                            className="btn btn-primary w-full mt-4 cursor-pointer"
                            onClick={handleAddSale}
                        >
                            Registrar Venta
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            setCarId('');
                            setClientId('');
                            setAgentId('');
                            setTotalPrice('');
                            setOpen(false); 
                        }}
                        className="absolute top-2 right-2 cursor-pointer"
                    >
                        <Clear />
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};
