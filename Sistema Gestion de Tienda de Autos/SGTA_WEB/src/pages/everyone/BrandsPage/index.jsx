import { useEffect, useState } from "react";
import { SlidingCarrousel } from "../../../components/ui/SlidingCarrousel"
import * as brandsApi from "../../../api/brand.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";

export const BrandsPage = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getError} = useNotification();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await brandsApi.getBrands();
                setBrands(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching brands:", error);

                if (error.response?.status === 500) {
                    console.error("Internal server error");
                    getError("Error en el servidor");
                } else {
                    console.error("Error desconocido");
                    getError("Error al obtener las marcas");
                }
                setLoading(false);
                
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);


    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-yaldevi text-center my-8">Mira nuestras marcas</h1>
            {loading ? (
                <Loading />
            ) : (
                <div className="mt-20 flex-1">
                    { brands && brands.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <p className="text-xl text-gray-500">No hay autos disponibles.</p>
                        </div>
                    ) : (
                        <SlidingCarrousel items={brands} endpoint="brands" />
                    )}
                </div>
            )}
        </div> 
    )
}