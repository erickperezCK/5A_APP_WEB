import Clear from '@mui/icons-material/Clear';
import { useRef, useState, useEffect } from 'react';
import { useNotification } from '../../../context/NotificationContext';
import { editSchema } from '../../../utils/ValidateForm';
import { useAuth } from '../../../context/AuthContext';

export const EditDialog = ({ setOpenEditDialog, userData }) => {
    const [name, setName] = useState(userData.name || "");
    const [cellphone, setCellphone] = useState(userData.cellphone || "");
    const [address, setAddress] = useState(userData.address || "");
    const [state, setState] = useState(userData.state || "");
    const [municipality, setMunicipality] = useState(userData.municipality || "");

    const { update } = useAuth();

    const nameRef = useRef();
    const cellphoneRef = useRef();
    const addressRef = useRef();
    const stateRef = useRef();
    const municipalityRef = useRef();

    const { getError, getSuccess } = useNotification();

    useEffect(() => {
        if (userData) {
            setName(userData.name);
            setCellphone(userData.cellphone);
            setAddress(userData.address);
            setState(userData.state);
            setMunicipality(userData.municipality);
        }
    }, [userData]);

    const handleEdit = async () => {
        const result = await editSchema.safeParse({
            name,
            cellphone,
            address,
            state,
            municipality
        });

        if (!result.success) {
            const fieldErrors = result.error.format();

            if (fieldErrors.name) {
                getError("El nombre es obligatorio");
                nameRef.current.focus();
            } else if (fieldErrors.cellphone) {
                getError("El número de celular es obligatorio");
                cellphoneRef.current.focus();
            } else if (fieldErrors.address) {
                getError("La dirección es obligatoria");
                addressRef.current.focus();
            } else if (fieldErrors.state) {
                getError("El estado es obligatorio");
                stateRef.current.focus();
            } else if (fieldErrors.municipality) {
                getError("El municipio es obligatorio");
                municipalityRef.current.focus();
            }

            return;
        }

        try {
            await update({
                name,
                cellphone,
                address,
                state,
                municipality
            });

            getSuccess("Usuario actualizado correctamente");
            setOpenEditDialog(false);
        } catch (error) {
            switch (error.response?.status) {
                case 401:
                    getError("No autorizado");
                    break;
                case 404:
                    getError("Usuario no encontrado");
                    break;
                default:
                    getError("Error al actualizar el usuario");
                    break;        
            }
        }
    };

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                    <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>

                    <div className="mb-4 space-y-2">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            ref={nameRef}
                            className="w-full p-2 border border-gray-200 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        
                        <label htmlFor="cellphone">Numero de celular</label>
                        <input
                            type="text"
                            id="cellphone"
                            ref={cellphoneRef}
                            className="w-full p-2 border border-gray-200 rounded"
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                        />

                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            ref={addressRef}
                            className="w-full p-2 border border-gray-200 rounded"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <label htmlFor="state">Estado</label>
                        <input
                            type="text"
                            id="state"
                            ref={stateRef}
                            className="w-full p-2 border border-gray-200 rounded"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />

                        <label htmlFor="municipality">Municipio</label>
                        <input
                            type="text"
                            id="municipality"
                            ref={municipalityRef}
                            className="w-full p-2 border border-gray-200 rounded"
                            value={municipality}
                            onChange={(e) => setMunicipality(e.target.value)}
                        />

                        <button
                            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                            onClick={handleEdit}
                        >
                            Guardar cambios
                        </button>
                    </div>

                    <button
                        onClick={() => setOpenEditDialog(false)}
                        className="absolute top-2 right-2 cursor-pointer"
                    >
                        <Clear />
                    </button>
                </div>
            </div>
        </div>
    );
};
