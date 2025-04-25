import { useState, useEffect } from "react";
import Clear from "@mui/icons-material/Clear";
import { useNotification } from "../../../../context/NotificationContext";
import { updateModel } from "../../../../api/models.api";
import { getImageSource } from "../../../../utils/GetImageSource";

export const EditModelDialog = ({ open, setOpen, model }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const { getError, getSuccess } = useNotification();

    useEffect(() => {
        if (model) {
            setName(model.name);
            setImage(model.image);
        }
    }, [model]);

    const handleUpdatemodel = async () => {
        if (!name || !image) {
            getError('Por favor completa todos los campos');
            return;
        }

        try {
            const res = await updateModel(model.id, { name, image });
            if (res.status !== 200) {
                getError("No se pudo actualizar la marca");
                return;
            }
            getSuccess("Marca actualizada correctamente");
            setOpen(false);
        } catch (err) {
            console.error(err);
            getError("Error al actualizar la marca");
        }
    };

    return (
        open ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                    <h2 className="text-2xl font-bold mb-4">Editar Modelo</h2>
                    <p className="text-gray-500 mb-4">Modifica los datos del modelo.</p>

                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded w-full"
                    />

                    <img src={getImageSource(model.image)} alt={model.name} className="w-full h-40 object-contain" />

                    <label className="block text-sm font-medium text-gray-700">Imagen</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setImage(reader.result);
                            };
                            if (file) reader.readAsDataURL(file);
                        }}
                        className="p-2 border rounded w-full"
                    />

                    <button className="btn btn-primary w-full mt-4" onClick={handleUpdatemodel}>Guardar cambios</button>
                    <button
                        onClick={() => {
                            setOpen(false);
                        }}
                        className="absolute top-2 right-2 cursor-pointer"
                    >
                        <Clear />
                    </button>
                </div>
            </div>
        ) : null
    );
};
