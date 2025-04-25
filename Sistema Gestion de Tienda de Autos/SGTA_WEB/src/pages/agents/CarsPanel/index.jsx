import { useEffect, useState, useMemo } from "react";
import * as carsApi from "../../../api/car.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";
import { AddCarDialog } from "../../../components/ui/dialogs/add/AddCarDialog";
import { SeeCarDialog } from "../../../components/ui/dialogs/see/SeeCarDialog";
import { EditCarDialog } from "../../../components/ui/dialogs/edit/EditCarDialog";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AddModelDialog } from "../../../components/ui/dialogs/add/AddModelDialog";
import { AddBrandDialog } from "../../../components/ui/dialogs/add/AddBrandDialog";
import { ChangeStatusDialog } from "../../../components/ui/dialogs/ChangeStatusDialog";

export const CarsPanel = () => {
  const [search, setSearch] = useState("");
  const [modelSort, setModelSort] = useState("asc");
  const [brandSort, setBrandSort] = useState("asc");
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getError } = useNotification();
  const [openAddCar, setOpenAddCar] = useState(false);
  const [openSeeCar, setOpenSeeCar] = useState(false);
  const [openEditCar, setOpenEditCar] = useState(false);
  const [openChangeStatusCar, setOpenChangeStatusCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const { user } = useAuth();
  const [onlyPending, setOnlyPending] = useState(false);

  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [openAddBrand, setOpenAddBrand] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);

  const filteredCars = useMemo(() => {
    console.log(onlyPending);
    return carsData
      .filter(car => 
        car.id.toString().includes(search)
      )
      .filter(car =>
        onlyPending ? car.status === "pending" : true
      )
      .sort((a, b) => {
        if (modelSort) {
          return modelSort === "asc"
            ? a.model_name.localeCompare(b.model_name)
            : b.model_name.localeCompare(a.model_name);
        }
        if (brandSort) {
          return brandSort === "asc"
            ? a.brand_name.localeCompare(b.brand_name)
            : b.brand_name.localeCompare(a.brand_name);
        }
        return 0;
      });
  }, [carsData, search, modelSort, brandSort, onlyPending]);

  const fetchCars = async () => {
    try {
      const response = await carsApi.getCars();
      setCarsData(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      getError(error.response?.status === 500 
        ? "Error al obtener los vehículos" 
        : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [openEditCar, openAddCar]);

  useEffect(() => {
    fetchCars();
  }, [selectedCar]);

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Main content */}
        <div className={`${(openSeeCar || openEditCar || openAddCar) ? 'opacity-30 pointer-events-none' : ''}`}>
          {/* Header with filters */}
          <div className="flex flex-col md:flex-row flex-shrink items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Buscar por folio"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={brandSort}
                onChange={(e) => setBrandSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Marca (Ascendente)</option>
                <option value="desc">Marca (Descendente)</option>
              </select>
              <select
                value={modelSort}
                onChange={(e) => setModelSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Modelo (Ascendente)</option>
                <option value="desc">Modelo (Descendente)</option>
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onlyPending}
                  onChange={(e) => setOnlyPending(e.target.checked)}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Solo pendientes</span>
              </label>
            </div>

            {user.role === "admin" && (
              
              <ul className="flex space-x-5">
                <li className="relative">
                  <div 
                      className="flex items-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setShowAddDropdown(!showAddDropdown)}
                  >
                      <span>Agregar</span>
                      <ArrowDropDownIcon />
                  </div>
                
                {showAddDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 text-gray-800">
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenAddBrand(true);
                                setShowAddDropdown(false);
                            }}
                        >
                            <span>Agregar marca</span>
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenAddModel(true);
                                setShowAddDropdown(false);
                            }}
                        >
                            <span>Agregar modelo</span>
                        </div>
                        <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenAddCar(true);
                                setShowAddDropdown(false);
                            }}
                        >
                            <span>Agregar auto</span>
                        </div>
                    </div>
                )}
            </li>
          </ul>
            )}
          </div>

          {/* Cars Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loading />
            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300 divide-opacity-60">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">FOLIO</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">MARCA</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">MODELO</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">AÑO</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">PRECIO</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">ESTADO</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 divide-y divide-gray-300 divide-opacity-40">
                    {filteredCars.map((car) => (
                      <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{car.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{car.brand_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{car.model_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{car.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${car.price.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {
                            car.status==="available" 
                          ? "Disponible" 
                          : car.status === "sold" 
                          ? "Vendido"
                          : "Pendiente"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => {
                                setSelectedCar(car);
                                setOpenSeeCar(true);
                              }}
                              className="text-gray-800 hover:text-blue-600 transition-colors cursor-pointer"
                              title="Ver"
                            >
                              <FontAwesomeIcon icon={faEye} className="fa-lg" />
                            </button>
                            {user.role === "admin" && (
                              <button
                                onClick={() => {
                                  setSelectedCar(car);
                                  setOpenEditCar(true);
                                }}
                                className="text-gray-800 hover:text-green-600 transition-colors cursor-pointer"
                                title="Editar"
                              >
                                <FontAwesomeIcon icon={faPenToSquare} className="fa-lg" />
                              </button>
                            )}

                            {car.status === "pending" && (
                              <button
                                onClick={() => {
                                  setSelectedCar(car);
                                  setOpenChangeStatusCar(true);
                                }}
                                className="text-green-800 transition-colors cursor-pointer"
                                title="Liberar Venta"
                              >
                                <FontAwesomeIcon icon={faCheck} className="fa-lg" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Dialogs */}
        <AddCarDialog open={openAddCar} setOpen={setOpenAddCar} />
        {openSeeCar && (
          <SeeCarDialog 
            open={openSeeCar}
            setOpen={setOpenSeeCar} 
            car={selectedCar} 
          />
        )}
        {openEditCar && (
          <EditCarDialog 
            open={openEditCar}
            setOpen={setOpenEditCar} 
            car={selectedCar} 
          />
        )}
        {openAddBrand && (
          <AddBrandDialog 
            open={openAddBrand} 
            setOpen={setOpenAddBrand} 
          />
        )}
        {openAddModel && (
          <AddModelDialog
            open={openAddModel} 
            setOpen={setOpenAddModel} 
          />
        )}
        {openChangeStatusCar && (
          <ChangeStatusDialog 
            setOpen={setOpenChangeStatusCar} 
            car={selectedCar}
            setCar={setSelectedCar} /> 
        )}
      </div>
    </div>
  );
};