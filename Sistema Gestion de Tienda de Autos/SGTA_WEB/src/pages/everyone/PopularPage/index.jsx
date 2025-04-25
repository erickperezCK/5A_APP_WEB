import { useEffect, useState } from "react";
import { SlidingCarrousel } from "../../../components/ui/SlidingCarrousel"
import * as carsApi from "../../../api/car.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";

export const PopularPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getError } = useNotification();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await carsApi.getMostExpensiveCars();
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
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);


    return (
        <div className="flex flex-col items-center mb-12">
            <h1 className="text-5xl font-yaldevi text-center my-8">Los más populares</h1>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {cars.length > 0 ? (
                    <div className="mt-20 flex-1">
                        <SlidingCarrousel items={cars} endpoint="cars" isCar />
                    </div>
                    ) : (
                        <p className="text-xl text-gray-500 h-64">
                            No hay autos populares disponibles.
                        </p>
                    )}
                </>
            )}
        </div>
    )
}