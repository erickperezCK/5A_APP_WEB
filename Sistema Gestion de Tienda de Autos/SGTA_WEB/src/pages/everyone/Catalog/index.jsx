import { useEffect, useMemo, useState } from "react";
import * as carsApi from "../../../api/car.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";
import { CatalogPanel } from "../../../components/ui/CatalogPanel";
import * as brandsApi from "../../../api/brand.api";
import * as modelsApi from "../../../api/models.api";

export const CatalogPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState("");
    const [modelId, setModelId] = useState("");

    const { getError } = useNotification();

    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            const matchBrand = car.brand_id === Number(brandId);
            const matchModel = car.model_id === Number(modelId);
    
            if (!brandId && !modelId) return true;
    
            if (brandId && !modelId) return matchBrand;
    
            if (brandId && modelId) return matchBrand && matchModel;
    
            return true;
        });
    }, [cars, brandId, modelId]);
    
  

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await carsApi.getAvailableCars();
                setCars(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cars:", error);

                if (error.response?.status === 500) {
                    console.error("Internal server error");
                    getError("Error en el servidor");
                } else {
                    console.error("Error desconocido");
                    getError("Error al obtener los carros");
                }
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

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
                        const response = await modelsApi.getModels(brandId);
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

    return (
        
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full px-4 py-6">
                {/* Filtro a la izquierda */}
                <div className="flex-shrink-0">
                <select value={brandId} onChange={(e) => setBrandId(e.target.value)} className="p-2 border rounded w-full">
                    <option value="">Todas las marcas</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                <select value={modelId} onChange={(e) => setModelId(e.target.value)} className="p-2 border rounded w-full" disabled={!brandId}>
                    <option value="">{brandId ? 'Selecciona un modelo' : 'Elige una marca'}</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                </select>
                </div>



                {/* Título centrado */}
                <div className="flex-1 text-center">
                    <h1 className="text-5xl font-yaldevi">Catálogo de Carros</h1>
                </div>

                {/* Espaciador para alinear el título centrado */}
                <div className="flex-shrink-0 w-[200px]"></div>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div className="mt-20 w-full px-4">
                    <CatalogPanel items={filteredCars} />
                </div>
            )}
        </div>
    );
};
