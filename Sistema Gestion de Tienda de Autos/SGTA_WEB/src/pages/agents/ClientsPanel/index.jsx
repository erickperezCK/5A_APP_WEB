import { useEffect, useState, useMemo } from "react";
import * as clientsApi from "../../../api/user.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";
import { AddClientDialog } from "../../../components/ui/dialogs/add/AddClientDialog";
import { SeeClientDialog } from "../../../components/ui/dialogs/see/SeeClientDialog";
import { EditClientDialog } from "../../../components/ui/dialogs/edit/EditClientDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const ClientsPanel = () => {
  const [search, setSearch] = useState("");
  const [buysSort, setBuysSort] = useState("asc");
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getError } = useNotification();
  const [openAddClient, setOpenAddClient] = useState(false);
  const [openSeeClient, setOpenSeeClient] = useState(false);
  const [openEditClient, setOpenEditClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const filteredClients = useMemo(() => {
    return clientsData
      .filter(client => 
        client.id.toString().includes(search) ||
        client.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (buysSort) {
          return buysSort === "asc"
            ? a.total_cars_purchased - b.total_cars_purchased
            : b.total_cars_purchased - a.total_cars_purchased;
        }
        return 0;
      });
  }, [clientsData, search, buysSort]);

  const fetchClients = async () => {
    try {
      const response = await clientsApi.getAllClients();
      setClientsData(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      getError(error.response?.status === 500 
        ? "Error al obtener los clientes" 
        : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [openEditClient]);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Main content */}
        <div className={`${(openSeeClient || openEditClient || openAddClient) ? 'opacity-30 pointer-events-none' : ''}`}>
          {/* Header with filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={buysSort}
                onChange={(e) => setBuysSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Comprador (Ascendente)</option>
                <option value="desc">Comprador (Descendente)</option>
              </select>
            </div>

            <button 
              className="bg-[#737373] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full md:w-auto shadow-sm flex items-center gap-2"
              onClick={() => setOpenAddClient(true)}
            >
              <FontAwesomeIcon icon={faUserPlus} className="fa-xl" />
              <span>Registrar cliente</span>
            </button>
          </div>

          {/* Clients Table */}
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">NOMBRE</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">TELÉFONO</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">AUTOS COMPRADOS</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 divide-y divide-gray-300 divide-opacity-40">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{client.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.cellphone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.total_cars_purchased}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => {
                                setSelectedClient(client);
                                setOpenSeeClient(true);
                              }}
                              className="text-gray-800 hover:text-blue-600 transition-colors"
                              title="Ver"
                            >
                              <FontAwesomeIcon icon={faEye} className="fa-lg" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedClient(client);
                                setOpenEditClient(true);
                              }}
                              className="text-gray-800 hover:text-green-600 transition-colors"
                              title="Editar"
                            >
                              <FontAwesomeIcon icon={faPenToSquare} className="fa-lg" />
                            </button>
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
        <AddClientDialog open={openAddClient} setOpen={setOpenAddClient} />
        {openSeeClient && (
          <SeeClientDialog 
            open={openSeeClient}
            setOpen={setOpenSeeClient} 
            client={selectedClient} 
          />
        )}
        {openEditClient && (
          <EditClientDialog 
            open={openEditClient}
            setOpen={setOpenEditClient} 
            client={selectedClient} 
          />
        )}
      </div>
    </div>
  );
};