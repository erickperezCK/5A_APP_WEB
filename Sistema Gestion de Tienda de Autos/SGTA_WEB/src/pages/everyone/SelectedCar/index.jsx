import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as carsApi from "../../../api/car.api";
import * as salesApi from "../../../api/sales.api";
import * as usersApi from "../../../api/user.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";
import { useAuth } from "../../../context/AuthContext";
import { LoginDialog } from "../../../components/ui/dialogs/LoginDialog";
import { RegisterDialog } from "../../../components/ui/dialogs/RegisterDialog";
import { AddClientDialog } from "../../../components/ui/dialogs/add/AddClientDialog";
import { ServicesDialog } from "../../../components/ui/dialogs/ServicesDialog";
import { AssignClientDialog } from "../../../components/ui/dialogs/AssignClientDialog";
import PurchasePDF from "../../../components/PurchasePDF";
import { pdf } from "@react-pdf/renderer";
import { getImageSource } from "../../../utils/GetImageSource";

export const SelectedCarPage = () => {
    const { carId } = useParams();
    const [car, setCar] = useState(null); 
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openAddClientDialog, setOpenAddClientDialog] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openServices, setOpenServices] = useState(false);

    //Estados para validacion de agente
    const [openAssignClientDialog, setOpenAssignClientDialog] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clients, setClients] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const { getError, getSuccess } = useNotification();

    const fetchClients = async () => {
        try {
          const response = await usersApi.getAllClients() ;
          setClients(response.data);
        } catch (err) {
          console.error("Error loading clients", err);
          getError("Error al cargar clientes");
        }
    };
      

    const fetchCar = async () => {
        try {
            const response = await carsApi.getCar(carId);
            console.log("Car fetched:", response.data);
            setCar(response.data);
            setTotalPrice(response.data.price);
        } catch (error) {
            console.error("Error fetching car:", error);
            getError("Error al obtener los detalles del carro");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (carId) {
            fetchCar();
        }
    }, [carId]);

    const handleOpenServices = () => {
        if (!user) {
          setOpenLoginDialog(true);
          return;
        }
      
        if (user.role === "agent") {
          fetchClients();
          setOpenAssignClientDialog(true);
          return;
        }
      
        setOpenServices(true);
      };

    const handleAssignClient = (clientId) => {
        setSelectedClientId(clientId);
        setOpenAssignClientDialog(false);
        setOpenServices(true);
    };
      

    const handleSale = async ({ additionalServices }) => {
        try {
            console.log(totalPrice);
            console.log({
                car_id: car.id,
                client_id: user.role === "agent" ? selectedClientId : user.id,
                agent_id: user.role === "agent" ? user.id : null,
                total_price: totalPrice,
                services: additionalServices,
            })
            const response = await salesApi.buyCar({
                car_id: car.id,
                client_id: user.role === "agent" ? selectedClientId : user.id,
                agent_id: user.role === "agent" ? user.id : null,
                total_price: totalPrice,
                services: additionalServices,
            });
            console.log("Car sold:", response.data);
            getSuccess("Carro comprado exitosamente");
            fetchCar();

            downloadPDF(additionalServices);

        } catch (error) {
            console.error("Error buying car:", error);
            if (error.response?.status === 500) {
                console.error("Internal server error");
                getError("Error en el servidor");
            }
            else if (error.response?.status === 404) {
                console.error("Car not found");
                getError("Carro no encontrado");
            }
            else if (error.response?.status === 400) {
                console.error("Bad request");
                getError("Error en la solicitud");
            }
            else {
                console.error("Unknown error");
                getError("Error al comprar el carro");
            }
        }
    }

    const downloadPDF = async (additionalServices) => {
        const pdfDoc = <PurchasePDF car={car} user={user} totalPrice={totalPrice} services={additionalServices} imageSrc={getImageSource(car.image)} />;
    
        const blob = await pdf(pdfDoc).toBlob();
    
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = `purchase_${car.name}_${car.model_name}.pdf`;
        document.body.appendChild(link);
        link.click();
    
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    if (loading) {
        return <Loading />;
    }

    if (!car) {
        return (
            <div className="h-screen flex items-center justify-center text-xl text-red-500">
                No se encontró el carro.
            </div>
        );
    }

    return (

        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {car.image ? (
                    <img
                        src={getImageSource(car.image)}
                        alt={car.model_name}
                        className="w-full h-80 object-cover"
                    />
                ) : (
                    <div className="w-full h-80 bg-gray-300 flex items-center justify-center">
                        <p className="text-gray-500">Imagen no disponible</p>
                    </div>
                )}

                <div className="p-6">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">
                        {car.name}
                    </h1>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                        {car.model_name} - {car.color}
                    </h2>
                    <p className="text-gray-700 mb-4">{car.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <span className="text-gray-600 font-semibold">Motor:</span>
                            <p className="text-gray-800">{car.motor}</p>
                        </div>
                        <div>
                            <span className="text-gray-600 font-semibold">Estado:</span>
                            <p
                                className={`text-lg font-semibold ${
                                    car.status === "available"
                                        ? "text-green-500"
                                        : car.status === "pending"
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                }`}
                            >
                                {car.status === "available" 
                                    ? "Disponible" 
                                    : car.status === "pending" 
                                    ? "En espera" 
                                    : "Vendido"}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-600 font-semibold">Precio:</span>
                            <p className="text-gray-800 text-xl font-bold">${car.price}</p>
                        </div>
                    </div>

                    { user.role !== "admin" && (
                        <>
                            { car.status === "sold" || car.status === "pending" ? (
                                <div className="text-red-500 font-semibold mb-4">
                                    Este carro ya ha sido vendido.
                                </div>
                            ) : (
                                <button
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                    onClick={() => handleOpenServices()}
                                >
                                    Comprar Ahora
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {openAddClientDialog && (
                <AddClientDialog open={openAddClientDialog} setOpen={setOpenAddClientDialog} />
            )}
            {openLoginDialog && (
                <LoginDialog setOpenLoginDialog={setOpenLoginDialog} setOpenRegisterDialog={setOpenRegisterDialog} />
            )}
            {openServices && (
                <ServicesDialog setOpenServices={setOpenServices} handleSale={handleSale} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
            )}
            {openAssignClientDialog && (
                <AssignClientDialog 
                    clients={clients} 
                    onClose={() => setOpenAssignClientDialog(false)} 
                    onAssign={handleAssignClient}
                    openRegisterDialog={openRegisterDialog}
                    setOpenAddClientDialog={setOpenAddClientDialog}
/>
            )}

        </div>
    );
};
