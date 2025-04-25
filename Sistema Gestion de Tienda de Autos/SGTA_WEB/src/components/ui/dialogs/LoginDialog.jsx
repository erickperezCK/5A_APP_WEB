import Clear from '@mui/icons-material/Clear';
import { useRef, useState } from 'react';
import { useNotification } from '../../../context/NotificationContext';
import { loginSchema } from "../../../utils/ValidateForm";
import { useAuth } from '../../../context/AuthContext';
import { forgotPassword, recoverPassword, verifyResetCode } from '../../../api/auth.api';

export const LoginDialog = ({ setOpenLoginDialog, setOpenRegisterDialog }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);

    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const { getError, getSuccess } = useNotification();

    const { login } = useAuth();

    const handleChangeToRegister = () => {
        setOpenRegisterDialog(true);  
        setOpenLoginDialog(false);
    }

    const handleForgotPassword = () => {
        setOpenForgotPasswordDialog(true);
    }

    const handleSendRecoveryCode = async () => {
        if (email === "") { 
            getError("El correo electrónico es obligatorio");
            emailRef.current.focus();
            return;
        }

        try {
            await forgotPassword(email);
            getSuccess("Código de recuperación enviado al correo electrónico");
            setOpenCodeDialog(true);
            
        } catch (error) {
            switch (error.response?.status) {
                case 400:
                    getError("El correo electrónico no está registrado");
                    break;
                default:
                    getError("Error al enviar el código de recuperación");
                    break;
            }
        }
    }

    const handleVerifyCode = async () => {
        if (code === "") {
            getError("El código de recuperación es obligatorio");
            return;
        }
        if (newPassword === "") {
            getError("La nueva contraseña es obligatoria");
            return;
        }
        if (confirmNewPassword !== newPassword) {
            getError("Las contraseñas no coinciden");
            return;
        }

        try {
            await verifyResetCode(email, code);
            await recoverPassword(email, newPassword);
            getSuccess("Contraseña cambiada exitosamente");
            setOpenLoginDialog(false);
            setOpenForgotPasswordDialog(false);
            setOpenCodeDialog(false);
        } catch (error) {
            switch (error.response?.status) {
                case 400:
                    getError("El código de recuperación es incorrecto o ha expirado");
                    break;
                case 401:
                    getError("El correo electrónico no está registrado");
                    break;
                default:
                    getError("Error al cambiar la contraseña");
                    break;
            }
        }
    }


    const handleLogin = async () => {
        const result = await loginSchema.safeParse({ email, password });

        if (!result.success) {
            const fieldErrors = result.error.format();

            if (fieldErrors.email) {
                getError("El correo electrónico es incorrecto");
                emailRef.current.focus();
            } else if (fieldErrors.password) {
                getError("La contraseña es incorrecta");
                passwordRef.current.focus();
            }

            return;
        }

        try {
            await login({ email, password });
            getSuccess("Inicio de sesión exitoso");
            setOpenLoginDialog(false);
        } catch (error) {
            switch (error.response?.status) {
                case 401:
                    getError("Correo electrónico o contraseña incorrectos");
                    break;
                default:
                    getError("Error en el inicio de sesión");
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
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                    { !openForgotPasswordDialog ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Inicio de sesión</h2>
    
                        <div className="mb-4">
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                ref={emailRef}
                                className="w-full p-2 border border-gray-200 rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                ref={passwordRef}
                                className="w-full p-2 border border-gray-200 rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className='text-blue-500 text-sm  cursor-pointer' onClick={handleForgotPassword}>
                                Olvidaste tu contraseña?
                            </button>
    
                            
                            <button
                                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" onClick={handleLogin}>
                                Iniciar sesión
                            </button>
                            <button className='text-blue-500 text-sm  cursor-pointer' onClick={handleChangeToRegister}>No tienes una cuenta? Regístrate aquí</button>
    
                        </div>
    
                        <button
                            onClick={() => setOpenLoginDialog(false)}
                            className="absolute top-2 right-2 cursor-pointer"
                        >
                            <Clear />
                        </button>
                    </>
                    ) : (
                        <>
                        { !openCodeDialog ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
        
                                <div className="mb-4">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        ref={emailRef}
                                        className="w-full p-2 border border-gray-200 rounded"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
        
                                    <button
                                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" 
                                        onClick={() => handleSendRecoveryCode()}>
                                        Enviar código de recuperación
                                    </button>
        
                                </div>
        
                                <button
                                    onClick={() => setOpenLoginDialog(false)}
                                    className="absolute top-2 right-2 cursor-pointer"
                                >
                                    <Clear />
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
        
                                <div className="mb-4">
                                    <label htmlFor="code">Código de recuperación</label>
                                    <input
                                        type="text"
                                        id="code"
                                        className="w-full p-2 border border-gray-200 rounded"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
        
                                    <label htmlFor="newPassword">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        className="w-full p-2 border border-gray-200 rounded"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
        
                                    <label htmlFor="confirmNewPassword">Confirmar nueva contraseña</label>
                                    <input
                                        type="password"
                                        id="confirmNewPassword"
                                        className="w-full p-2 border border-gray-200 rounded"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
        
                                    <button
                                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" 
                                        onClick={() => handleVerifyCode()}>
                                        Cambiar contraseña
                                    </button>
        
                                </div>
        
                                <button
                                    onClick={() => setOpenLoginDialog(false)}
                                    className="absolute top-2 right-2 cursor-pointer"
                                >
                                    <Clear />
                                </button>
                            </>
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}