import Clear from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import { carSchema } from '../../../../utils/ValidateForm';
import { useNotification } from '../../../../context/NotificationContext';
import * as carsApi from '../../../../api/car.api';
import * as modelsApi from '../../../../api/models.api';
import * as brandsApi from '../../../../api/brand.api';

export const AddCarDialog = ({ open, setOpen }) => {
    const [modelId, setModelId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [year, setYear] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [motor, setMotor] = useState('');
    const [image, setImage] = useState('');
    
    const { getError, getSuccess } = useNotification();
    
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    
    // Lista de colores predefinidos
    const colors = [
        'Rojo',
        'Azul',
        'Verde',
        'Negro',
        'Blanco',
        'Gris',
        'Plateado',
        'Dorado',
        'Amarillo',
        'Naranja',
        'Morado',
        'Rosa',
        'Marrón',
        'Beige',
        'Turquesa'
    ];
    
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await brandsApi.getBrands();
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchBrands();
    }, []);
    
    useEffect(() => {
        if (brandId) {
            const fetchModels = async () => {
                try {
                    const response = await modelsApi.getModelsByBrandId(brandId);
                    setModels(response.data);
                } catch (error) {
                    console.error("Error fetching models:", error);
                }
            };
            fetchModels();
        } else {
            setModels([]);
        }
    }, [brandId]);

    const handleAddCar = async () => {
        const result = await carSchema.safeParse({ modelId, brandId, name, color, motor, description, year, price, status: "available" });
        if (price > 1000000000) {
            getError('El precio debe ser menor a 1,000,000,000.00');
            return;
        }
        if (!result.success) {
            getError('Revisa los campos ingresados');
            return;
        }

        if (!image) {
            getError('Por favor selecciona una imagen');
            return;
        }

        try {
            await carsApi.createCar({ modelId, brandId, year, name, price, color, description, motor, image });
            getSuccess('Carro registrado correctamente');
            clearForm();
            setOpen(false);
        } catch (error) {
            getError('Error al registrar el carro');
            console.error(error);
        }
    };

    const clearForm = () => {
        setModelId('');
        setBrandId('');
        setYear('');
        setName('');
        setColor('');
        setDescription('');
        setPrice('');
        setMotor('');
        setImage('');
    }

    return open ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                <h2 className="text-2xl font-bold mb-4">Registrar Carro</h2>
                <p className="text-gray-500 mb-4">Completa los datos para registrar un nuevo carro.</p>
                
                <label className="block text-sm font-medium text-gray-700">Marca</label>
                <select value={brandId} onChange={(e) => setBrandId(e.target.value)} className="p-2 border rounded w-full">
                    <option value="">Selecciona una marca</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                
                <label className="block text-sm font-medium text-gray-700">Modelo</label>
                <select value={modelId} onChange={(e) => setModelId(e.target.value)} className="p-2 border rounded w-full" disabled={!brandId}>
                    <option value="">{brandId ? 'Selecciona un modelo' : 'Elige una marca'}</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                </select>

                <label className="block text-sm font-medium text-gray-700">Año</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded w-full" />

                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded w-full" />
                
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 border rounded w-full" />
                
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <select 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)} 
                    className="p-2 border rounded w-full"
                >
                    <option value="">Selecciona un color</option>
                    {colors.map((colorOption, index) => (
                        <option key={index} value={colorOption}>{colorOption}</option>
                    ))}
                </select>
                
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border rounded w-full" />
                
                <label className="block text-sm font-medium text-gray-700">Motor</label>
                <input type="text" value={motor} onChange={(e) => setMotor(e.target.value)} className="p-2 border rounded w-full" />

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
                
                <button className="btn btn-primary w-full mt-4" onClick={handleAddCar}>Registrar Carro</button>
                <button onClick={() => {
                    setOpen(false)
                    clearForm();    
                }} className="absolute top-2 right-2 cursor-pointer"><Clear /></button>
            </div>
        </div>
    ) : null;
};