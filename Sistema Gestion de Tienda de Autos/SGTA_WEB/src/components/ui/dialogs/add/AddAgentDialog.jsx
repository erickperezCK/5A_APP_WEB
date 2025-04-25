import Clear from '@mui/icons-material/Clear';
import { useRef, useState } from 'react';
import { registerSchema } from '../../../../utils/ValidateForm';
import { useNotification } from '../../../../context/NotificationContext';
import { createAgent } from '../../../../api/user.api';

export const AddAgentDialog = ({ open, setOpen }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [municipality, setMunicipality] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();
    const cellphoneRef = useRef();
    const addressRef = useRef();
    const stateRef = useRef();
    const municipalityRef = useRef();

    const { getError, getSuccess } = useNotification();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            console.error("Las contraseñas no coinciden");
            confirmPasswordRef.current.focus();
            return;
        }

        console.log(email, password, confirmPassword, name, cellphone, address, state, municipality);
        const result = await registerSchema.safeParse({ email, password, confirmPassword, name, cellphone, address, state, municipality });
        console.log(result.success);
        if (!result.success) {
            const fieldErrors = result.error.format();

            if (fieldErrors.email) {
                getError("El correo electrónico es incorrecto");
                emailRef.current.focus();
            } else if (fieldErrors.password) {
                getError("La contraseña es incorrecta");
                passwordRef.current.focus();
            } else if (fieldErrors.confirmPassword) {
                getError("Las contraseñas no coinciden");
                confirmPasswordRef.current.focus();
            } else if (fieldErrors.name) {
                getError("El nombre es incorrecto");
                nameRef.current.focus();
            } else if (fieldErrors.cellphone) {
                getError("El numero de celular es incorrecto");
                cellphoneRef.current.focus();
            } else if (fieldErrors.address) {
                getError("La dirección es incorrecta");
                addressRef.current.focus();
            } else if (fieldErrors.state) {
                getError("El estado es incorrecto");
                stateRef.current.focus();
            } else if (fieldErrors.municipality) {
                getError("El municipio es incorrecto");
                municipalityRef.current.focus();
            }

            return;
        }

        try {
            await createAgent({ email, password, name, cellphone, address, state, municipality });
            getSuccess("Registro correcto");
            clearForm();
            setOpen(false);
        } catch (error) {
            console.error("Error al registrar:", error.response?.data?.message || error.message);

            switch (error.response?.status) {
                case 400:
                    getError("El correo electrónico ya está en uso");
                    break;
                default:
                    getError("Error en el servidor");
                    break;
            }
        }
    }

    const clearForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setCellphone("");
        setAddress("");
        setState("");
        setMunicipality("");
    }
    
    return (
        <>
            { open && (
                <div className="">
                <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />

                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div
                        className="bg-white p-6 rounded-xl  shadow-xl relative w-full max-w-md sm:w-full sm:max-w-md max-h-screen overflow-y-auto opacity-100"
                    >
                        <h2 className="text-2xl font-bold mb-4">Registro de agente</h2>
                            <p className="text-gray-500 mb-4">Completa los datos para registrar un agente.</p>

                            <div className="mb-4">
                            <div className='flex gap-10 mb-4'>
                            <div className=''>
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={emailRef}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />
                                
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    ref={passwordRef}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />

                                <label htmlFor="confirm-password">Confirma tu contraseña</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    ref={confirmPasswordRef}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />

                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    ref={nameRef}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="cellphone">Número de celular</label>
                                <input
                                    type="tel"
                                    id="cellphone"
                                    ref={cellphoneRef}
                                    value={cellphone}
                                    onChange={(e) => setCellphone(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />
                                
                                <label htmlFor="address">Dirección</label>
                                <input
                                    type="text"
                                    id="address"
                                    ref={addressRef}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />
                                
                                <label htmlFor="state">Estado</label>
                                <input
                                    type="text"
                                    id="state"
                                    ref={stateRef}
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />
                                
                                <label htmlFor="municipality">Municipio</label>
                                <input
                                    type="text"
                                    id="municipality"
                                    ref={municipalityRef}
                                    value={municipality}
                                    onChange={(e) => setMunicipality(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded"
                                />
                            </div>
                            </div>

                                <button className="btn btn-primary w-full mt-4 cursor-pointer" onClick={handleRegister}>
                                    Agregar agente
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    clearForm();
                                }}
                                className="absolute top-2 right-2 cursor-pointer"  
                            >
                                <Clear />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}