import Clear from '@mui/icons-material/Clear';
import { useRef, useState } from 'react';
import { registerSchema } from '../../../utils/ValidateForm';
import { useNotification } from '../../../context/NotificationContext';
import { useAuth } from '../../../context/AuthContext';
import { sendRegisterCode, verifyRegisterCode } from '../../../api/auth.api';

export const RegisterDialog = ({ setOpenRegisterDialog, setOpenLoginDialog }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [municipality, setMunicipality] = useState("");

    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [code, setCode] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();
    const cellphoneRef = useRef();
    const addressRef = useRef();
    const stateRef = useRef();
    const municipalityRef = useRef();

    const { getError, getSuccess } = useNotification();

    const { register } = useAuth();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            getError("Las contraseñas no coinciden");
            confirmPasswordRef.current.focus();
            return;
        }

        const result = await registerSchema.safeParse({ email, password, confirmPassword, name, cellphone, address, state, municipality });

        if (!result.success) {
            const fieldErrors = result.error.format();

            if (fieldErrors.email) {
                getError("El correo electrónico no es valido o esta vacio");
                emailRef.current.focus();
            } else if (fieldErrors.password) {
                getError("La contraseña debe contener mas de 6 digitos");
                passwordRef.current.focus();
            } else if (fieldErrors.confirmPassword) {
                getError("Las contraseñas no coinciden");
                confirmPasswordRef.current.focus();
            } else if (fieldErrors.name) {
                getError("El nombre esta incorrecto o esta vacio");
                nameRef.current.focus();
            } else if (fieldErrors.cellphone) {
                getError("El numero de celular es incorrecto o esta vacio");
                cellphoneRef.current.focus();
            } else if (fieldErrors.address) {
                getError("La dirección es incorrecta o esta vacia");
                addressRef.current.focus();
            } else if (fieldErrors.state) {
                getError("El estado es incorrecto o esta vacio");
                stateRef.current.focus();
            } else if (fieldErrors.municipality) {
                getError("El municipio es incorrecto o esta vacio");
                municipalityRef.current.focus();
            }

            return;
        }

        try {
            await sendRegisterCode(email);
            getSuccess("Código de verificación enviado a tu correo electrónico");
            setOpenCodeDialog(true);
            //await register({ email, password, name, cellphone, address, state, municipality });
            //getSuccess("Registro correcto");
            //setOpenRegisterDialog(false);
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
    
    const handleChangeToLogin = () => {
        setOpenLoginDialog(true);
        setOpenRegisterDialog(false);
    }

    const handleVerifyCode = async () => {
        try {
            await verifyRegisterCode(email, code);
            getSuccess("Código de verificación correcto, registrando usuario...");
            setCode("");
            setOpenCodeDialog(false);
            await register({ email, password, name, cellphone, address, state, municipality });
            getSuccess("Registro correcto");
            setOpenRegisterDialog(false);
        } catch (error) {
            console.error("Error al registrar:", error.response?.data?.message || error.message);

            switch (error.response?.status) {
                case 400:
                    getError("El código de verificación es incorrecto o ha expirado");
                    break;
                default:
                    getError("Error en el servidor");
                    break;
            }
        }
    }

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />

            <div
                className="fixed inset-0 flex items-center justify-center z-50"
            >
            <div
                className="bg-white p-6 rounded-xl  shadow-xl relative w-full max-w-md sm:w-full sm:max-w-md max-h-screen overflow-y-auto opacity-100"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
                    { !openCodeDialog ? (
                    <>
                        <p className="text-gray-500 mb-4 text-center">Completa los datos para registrarte.</p>
    
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
                            
                            <div className=''>
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
    
                            <button className='text-blue-500 text-sm  cursor-pointer' onClick={handleChangeToLogin}>
                                Ya tienes una cuenta? Inicia sesión aquí
                            </button>
    
                            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" onClick={handleRegister}>
                                Registrarse
                            </button>
                        </div>
                    </>
                    
                    ) : (
                    <div className="mb-4">
                        <p className="text-gray-500 mb-4 text-center">Ingresa el código de verificación que se ha enviado a tu correo electrónico.</p>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded"
                        />
    
                        <button 
                            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" 
                            onClick={() => {handleVerifyCode(code)}}>
                            Verificar código
                        </button>
                    </div>
                    )}

                    <button
                        onClick={() => setOpenRegisterDialog(false)}
                        className="absolute top-2 right-2 cursor-pointer"  
                    >
                        <Clear />
                    </button>
                </div>
            </div>
        </div>
    )
}