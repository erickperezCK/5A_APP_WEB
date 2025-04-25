import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";
import { getCarsByBrandName } from "../../../api/car.api";
import { CarList } from "../../../components/ui/CarList";
import { Loading } from "../../../components/ui/Loading";

export const SelectedBrandPage = () => {
    const [cars, setCars] = useState([]);
    const { brand } = useParams();  
    const { getError } = useNotification();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await getCarsByBrandName(brand);
                setCars(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cars:", error);

                if (error.response?.status === 500) {
                    console.error("Internal server error");
                    getError("Error en el servidor");
                } else {
                    console.error("Error desconocido");
                    getError("Error al obtener los autos");
                }
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, [brand]);


    return (
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Catálogo de {brand}
          </h1>
    
          {loading ? (
            <Loading />
          ) : !cars || cars.length === 0 ? (
            <p className="text-center text-gray-500">No hay autos disponibles</p>
          ) : (
            <CarList carList={cars} />
          )}
        </div>
      );
    };