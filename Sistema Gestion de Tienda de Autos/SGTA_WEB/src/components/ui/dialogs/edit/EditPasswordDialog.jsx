import { useState } from "react";

export const EditPasswordDialog = ({ open, onSubmit }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        onSubmit(newPassword, oldPassword);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        open(false);
    };

    return (
        <div className="">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl relative w-96 opacity-100">
                <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña actual
                        </label>
                        <input
                            type="password"
                            id="old-password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar nueva contraseña
                        </label>
                        <input
                            type="password"
                            id="confirm-new-password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
                        >
                            Cambiar contraseña
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setOldPassword("");
                                setNewPassword("");
                                setConfirmNewPassword("");
                                open(false);
                            }}
                            className="ml-2 bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400 transition duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}