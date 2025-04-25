import { useEffect, useState, useMemo } from "react";
import * as agentsApi from "../../../api/user.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";
import { AddAgentDialog } from "../../../components/ui/dialogs/add/AddAgentDialog";
import { SeeAgentDialog } from "../../../components/ui/dialogs/see/SeeAgentDialog";
import { EditAgentDialog } from "../../../components/ui/dialogs/edit/EditAgentDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const AgentsPanel = () => {
  const [search, setSearch] = useState("");
  const [saleSort, setSaleSort] = useState("asc");
  const [incomeSort, setIncomeSort] = useState("asc");
  const [agentsData, setAgentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getError } = useNotification();
  const [openAddAgent, setOpenAddAgent] = useState(false);
  const [openSeeAgent, setOpenSeeAgent] = useState(false);
  const [openEditAgent, setOpenEditAgent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const filteredAgents = useMemo(() => {
    return agentsData
      .filter(agent => 
        agent.id.toString().includes(search) ||
        agent.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (saleSort) {
          return saleSort === "asc"
            ? a.total_cars_sold - b.total_cars_sold
            : b.total_cars_sold - a.total_cars_sold;
        }
        if (incomeSort) {
          return incomeSort === "asc"
            ? a.total_revenue - b.total_revenue
            : b.total_revenue - a.total_revenue;
        }
        return 0;
      });
  }, [agentsData, search, saleSort, incomeSort]);

  const fetchAgents = async () => {
    try {
      const response = await agentsApi.getAllAgents();
      setAgentsData(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
      getError(error.response?.status === 500 
        ? "Error al obtener los agentes" 
        : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [openEditAgent, openAddAgent]);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Main content */}
        <div className={`${(openSeeAgent || openEditAgent || openAddAgent) ? 'opacity-30 pointer-events-none' : ''}`}>
          {/* Header with filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Buscar por nombre o folio"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={saleSort}
                onChange={(e) => setSaleSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Ventas (Ascendente)</option>
                <option value="desc">Ventas (Descendente)</option>
              </select>
              <select
                value={incomeSort}
                onChange={(e) => setIncomeSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="asc">Ingresos (Ascendente)</option>
                <option value="desc">Ingresos (Descendente)</option>
              </select>
            </div>

            <button 
              className="bg-[#737373] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full md:w-auto shadow-sm flex items-center gap-2"
              onClick={() => setOpenAddAgent(true)}
            >
              <FontAwesomeIcon icon={faUserPlus} className="fa-xl" />
              <span>Registrar personal</span>
            </button>
          </div>

          {/* Agents Table */}
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">EMAIL</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">VENTAS</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">INGRESOS</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 divide-y divide-gray-300 divide-opacity-40">
                    {filteredAgents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{agent.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{agent.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{agent.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{agent.total_cars_sold}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${agent.total_revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => {
                                setSelectedAgent(agent);
                                setOpenSeeAgent(true);
                              }}
                              className="text-gray-800 hover:text-blue-600 transition-colors"
                              title="Ver"
                            >
                              <FontAwesomeIcon icon={faEye} className="fa-lg" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAgent(agent);
                                setOpenEditAgent(true);
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
        <AddAgentDialog open={openAddAgent} setOpen={setOpenAddAgent} />
        {openSeeAgent && (
          <SeeAgentDialog 
            open={openSeeAgent}
            setOpen={setOpenSeeAgent} 
            agent={selectedAgent} 
          />
        )}
        {openEditAgent && (
          <EditAgentDialog 
            open={openEditAgent}
            setOpen={setOpenEditAgent} 
            agent={selectedAgent} 
          />
        )}
      </div>
    </div>
  );
};