import { useState } from "react";
import { useNotification } from "../../../../context/NotificationContext";
import Clear from '@mui/icons-material/Clear';
import { createBrand } from "../../../../api/brand.api";

export const AddBrandDialog = ({ open, setOpen }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const { getError, getSuccess } = useNotification();

    const handleAddBrand = async () => {
        if (!name || !image) {
            getError('Por favor completa todos los campos');
            return;
        }
        try {
            const response = await createBrand({ name, image });
            if (response.status !== 201) {
                getError('Error al registrar la marca');
                return;
            }
            getSuccess('Marca registrada correctamente');
            setName('');
            setImage('');
            setOpen(false);
        } catch (error) {
            getError('Error al registrar la marca');
            console.error(error);
        }
    }

    return (
        open ? (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                    <h2 className="text-2xl font-bold mb-4">Registrar Marca</h2>
                    <p className="text-gray-500 mb-4">Completa los datos para registrar una nueva marca.</p>
                    
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded w-full" />
                    
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
                    
                    <button className="btn btn-primary w-full mt-4" onClick={handleAddBrand}>Registrar marca</button>
                    <button onClick={() => {
                        setName('')
                        setImage('')
                        setOpen(false)
                    }} className="absolute top-2 right-2 cursor-pointer"><Clear color="black" /></button>
                </div>
            </div>
        ) : null
    )
}