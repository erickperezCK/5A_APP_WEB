import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { EditDialog } from "../../../components/ui/dialogs/EditDialog";
import * as salesApi from "../../../api/sales.api";
import { Loading } from "../../../components/ui/Loading";
import { CarsPurchased } from "../../../components/ui/CarsPurchased";
import { EditPasswordDialog } from "../../../components/ui/dialogs/edit/EditPasswordDialog";

export const ProfilePage = () => {
  const { user, changePassword } = useAuth();
  const [ openEditDialog, setOpenEditDialog ] = useState(false);
  const [ openChangePasswordDialog, setOpenChangePasswordDialog ] = useState(false);
  const [ cars, setCars ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  
  const fetchCars = async () => {
    try {
      const response = await salesApi.getCarsPurchased();
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user || user.role !== "client") return;
    fetchCars();
  }, []);
  
  const handleChangePassword = async (newPassword, oldPassword) => {
    try {
      await changePassword(newPassword, oldPassword);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="my-12 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-800">
          Perfil del Usuario
        </h1>
  
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600 capitalize">
                Rol: {user.role || "No asignado"}
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-semibold">Correo electrónico:</p>
                <p>{user.email || "No disponible"}</p>
              </div>
  
              <div>
                <p className="font-semibold">Dirección:</p>
                <p>{user.address || "No disponible"}</p>
              </div>
  
              <div>
                <p className="font-semibold">Estado:</p>
                <p>{user.state || "No disponible"}</p>
              </div>
  
              <div>
                <p className="font-semibold">Municipio:</p>
                <p>{user.municipality || "No disponible"}</p>
              </div>
  
              <div>
                <p className="font-semibold">Numero de teléfono:</p>
                <p>{user.cellphone || "No disponible"}</p>
              </div>
  
              <div>
                <p className="font-semibold">Miembro desde:</p>
                <p>
                  {user.created_at 
                    ? new Date(user.created_at.replace(" ", "T")).toLocaleDateString("es-MX") 
                    : "No disponible"}
                </p>
              </div>
            </div>
  
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
                onClick={() => setOpenEditDialog(true)}
              >
                Editar Perfil
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
                onClick={() => setOpenChangePasswordDialog(true)}
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
      {openEditDialog && (
        <EditDialog
          userData={user}
          setOpenEditDialog={setOpenEditDialog}
        />
      )}

      {openChangePasswordDialog && (
        <EditPasswordDialog
          open={setOpenChangePasswordDialog}
          onSubmit={handleChangePassword}
        />
      )}
      
      { user.role === "client" && (
      <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mis Autos</h2>
          {loading ? (
            <Loading />
          ) : cars.length === 0 ? (
              <p className="text-gray-500">No has comprado ningún carro.</p>
          ) : (
              <CarsPurchased carList={cars} />
          )}
        </div>
      )}
    </div>
  );
};
