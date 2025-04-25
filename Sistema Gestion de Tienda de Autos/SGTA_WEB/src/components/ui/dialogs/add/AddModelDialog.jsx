import { useEffect, useState } from "react";
import { useNotification } from "../../../../context/NotificationContext";
import { createModel } from "../../../../api/models.api";
import { getBrands } from "../../../../api/brand.api";
import Clear from '@mui/icons-material/Clear';

export const AddModelDialog = ({ open, setOpen }) => {
    const [name, setName] = useState('');
    const [brand_id, setBrand_id] = useState('');
    const [image, setImage] = useState('');
    const [brands, setBrands] = useState([]);

    const { getError, getSuccess } = useNotification();

    const handleAddModel = async () => {
        if (!name || !brand_id || !image) {
            getError('Por favor completa todos los campos');
            return;
        }
        try {
            const response = await createModel(brand_id, { name, image });
            if (response.status !== 201) {
                getError('Error al registrar el modelo');
                return;
            }
            setName('');
            setBrand_id('');
            setImage('');
            getSuccess('Modelo registrado correctamente');
            setOpen(false);
        } catch (error) {
            getError('Error al registrar el modelo');
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await getBrands();
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchBrands();
    }, []);

    return (
        open ? (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                    <h2 className="text-2xl font-bold mb-4">Registrar Modelo</h2>
                    <p className="text-gray-500 mb-4">Completa los datos para registrar un nuevo modelo.</p>

                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded w-full"
                    />

                    <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <select
                        value={brand_id}
                        onChange={(e) => setBrand_id(e.target.value)}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">Selecciona una marca</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mt-4">Imagen</label>
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

                    <button className="btn btn-primary w-full mt-4" onClick={handleAddModel}>
                        Registrar modelo
                    </button>
                    <button
                        onClick={() => {
                            setName('');
                            setBrand_id('');
                            setImage('');
                            setOpen(false);
                        }}
                        className="absolute top-2 right-2 cursor-pointer"
                    >
                        <Clear color="black" />
                    </button>
                </div>
            </div>
        ) : null
    );
};
