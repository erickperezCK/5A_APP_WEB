import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { LoginDialog } from "../../../components/ui/dialogs/LoginDialog";
import { RegisterDialog } from "../../../components/ui/dialogs/RegisterDialog";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";
import * as carsApi from "../../../api/car.api";
import * as brandsApi from "../../../api/brand.api";
import { SlidingCarrousel } from "../../../components/ui/SlidingCarrousel";

export const Home = () => {
    const { user } = useAuth();

    // Dialogs
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loadingCars, setLoadingCars] = useState(true);
    const [loadingBrands, setLoadingBrands] = useState(true);
    
    const { getError } = useNotification();

    // Evitar scroll en el body cuando se abra un dialog
    useEffect(() => {
        if (openRegisterDialog || openLoginDialog) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [openRegisterDialog, openLoginDialog]);

      // Obtener autos populares
    useEffect(() => {
      const fetchCars = async () => {
          try {
              const response = await carsApi.getMostExpensiveCars();
              setCars(response.data);
              setLoadingCars(false);
          } catch (error) {
              console.error("Error fetching cars:", error);
              getError("Error al obtener los autos populares");
              setLoadingCars(false);
          }
      };
      fetchCars();
  }, []);

    // Obtener marcas
    useEffect(() => {
      const fetchBrands = async () => {
          try {
              const response = await brandsApi.getBrands();
              setBrands(response.data);
              setLoadingBrands(false);
          } catch (error) {
              console.error("Error fetching brands:", error);
              getError("Error al obtener las marcas");
              setLoadingBrands(false);
          }
      };
      fetchBrands();
    }, []);

    // flechitas
    const [showArrows, setShowArrows] = useState(true);
    const [arrowPosition, setArrowPosition] = useState(0);

    useEffect(() => {
        const updateArrowPosition = () => {
          const viewportHeight = window.innerHeight;
          setArrowPosition(viewportHeight * 0.9);
        };
      
        updateArrowPosition();
        window.addEventListener("resize", updateArrowPosition);
      
        return () => window.removeEventListener("resize", updateArrowPosition);
      }, []);      

    useEffect(() => {
        const handleScroll = () => {
          setShowArrows(() => {
            if (window.scrollY > 50) {
              return false;
            } else {
              return true;
            }
          });
        };
      
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
      
      
      const scrollToBottom = () => {
        const marcasSection = document.querySelector("#marcas-section");
        if (marcasSection) {
          marcasSection.scrollIntoView({ behavior: "smooth" });
        }
      };

    return (
        <div className="min-h-screen flex flex-col relative">

            {/* Inicio */}
            <div className="min-h-screen font-yaldevi flex flex-col items-center justify-center">
                <h1 className="text-8xl px-8 pb-8 text-center text-black -mt-20">LUXURY MOTORS</h1>
                <p className="text-gray-500 mb-4">Descubre la excelencia en cada detalle. Nuestra colección de vehículos de lujo representa</p>
                <p className="text-gray-500 mb-10">la combinación perfecta entre diseño, tecnología y confort.</p>
                {   user ? 
                        <p>Bienvenido {user.name}</p> 
                    : 
                        <div className="flex flex-col">
                            <button onClick={() => { setOpenRegisterDialog(true) }}
                                className="text-black py-2 px-10 rounded-xl border border-black mt-5 mb-5 text-xl cursor-pointer">
                                    Regístrate
                            </button>
                            <button onClick={() => { setOpenLoginDialog(true) }}
                                className="text-black py-2 px-10 rounded-xl border border-black mb-5 text-xl cursor-pointer">
                                    Inicia sesión
                            </button>
                        </div>
                }
            </div>

            {/* Flechitas */}
            {showArrows && (
                <div
                    className="fixed left-1/2 transform -translate-x-1/2 flex space-x-4 animate-bounce cursor-pointer"
                    style={{ top: `${arrowPosition}px` }}
                >
                    <div onClick={scrollToBottom}>
                        <KeyboardDoubleArrowDownIcon sx={{ fontSize: 40 }} />
                    </div>
                </div>
            )}

            {/* Dialog para Registro */}
            { openRegisterDialog && (
                <RegisterDialog setOpenRegisterDialog={setOpenRegisterDialog} setOpenLoginDialog={setOpenLoginDialog} />
            )}

            {/* Dialog para Login */}
            { openLoginDialog && (
                <LoginDialog setOpenLoginDialog={setOpenLoginDialog} setOpenRegisterDialog={setOpenRegisterDialog} />
            )}

            {/* Marcas */}
            <section
                id="marcas-section"
                className="flex flex-col items-center p-10"
            >
                <h2 className="font-yaldevi text-4xl mb-8">Marcas</h2>
                {loadingBrands ? (
                    <Loading />
                ) : (
                    <div className="w-full max-w-6xl flex items-center justify-center">
                        {brands.length > 0 ? (
                            <SlidingCarrousel items={brands} endpoint="brands" />
                        ) : (
                            <p className="text-xl text-gray-500 h-64">
                                No hay marcas disponibles.
                            </p>
                        )}
                    </div>
                )}
            </section>

            {/* Populares */}
            <section
                id="populares-section"
                className="flex flex-col items-center p-10"
            >
                <h2 className="font-yaldevi text-4xl mb-8">Populares</h2>
                {loadingCars ? (
                    <Loading />
                ) : (
                    <>
                        {cars.length > 0 ? (
                            <div className="w-full max-w-6xl flex items-center justify-center">
                                <SlidingCarrousel items={cars} endpoint="cars" isCar />
                            </div>
                        ) : (
                            <p className="text-xl text-gray-500 h-64">
                                No hay autos populares disponibles.
                            </p>
                        )}
                    </>
                )}
            </section>
        </div>
    )
}