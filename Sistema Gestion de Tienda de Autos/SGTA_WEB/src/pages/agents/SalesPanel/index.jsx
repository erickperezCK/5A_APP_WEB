import { useEffect, useState, useMemo } from "react";
import * as salesApi from "../../../api/sales.api";
import { useNotification } from "../../../context/NotificationContext";
import { Loading } from "../../../components/ui/Loading";
import { Sales } from "../../../components/ui/panels/SalesPanel";
import { AddSaleDialog } from "../../../components/ui/dialogs/add/AddSaleDialog";
import { SeeSaleDialog } from "../../../components/ui/dialogs/see/SeeSaleDialog";
import { useAuth } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";

export const SalesPanel = () => {
  const [search, setSearch] = useState("");
  const [buyerSort, setBuyerSort] = useState("");
  const [sellerSort, setSellerSort] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSale, setSelectedSale] = useState(null);
  const { getError } = useNotification();
  const [openAddSale, setOpenAddSale] = useState(false);
  const [openSeeSale, setOpenSeeSale] = useState(false);
  const { user } = useAuth();

  const filteredSales = useMemo(() => {
    return salesData
      .filter(sale => 
        sale.id.toString().includes(search) ||
        sale.client_name.toLowerCase().includes(search.toLowerCase()) ||
        sale.agent_name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (buyerSort) {
          return buyerSort === "asc"
            ? a.client_name.localeCompare(b.client_name)
            : b.client_name.localeCompare(a.client_name);
        }
        if (sellerSort) {
          return sellerSort === "asc"
            ? a.agent_name.localeCompare(b.agent_name)
            : b.agent_name.localeCompare(a.agent_name);
        }
        return 0;
      });
  }, [salesData, search, buyerSort, sellerSort]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await salesApi.getAll();
        console.log(response.data);
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
        switch (error.response?.status) {
          case 500:
            getError("Error al obtener las ventas");
            break;
          default:
            getError("Error desconocido");
            break;
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, [openAddSale]);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Main content */}
        <div className={`${(openSeeSale || openAddSale) ? 'opacity-30 pointer-events-none' : ''}`}>
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
                value={buyerSort}
                onChange={(e) => setBuyerSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Ordenar por comprador</option>
                <option value="asc">Comprador (Ascendente)</option>
                <option value="desc">Comprador (Descendente)</option>
              </select>
              <select
                value={sellerSort}
                onChange={(e) => setSellerSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Ordenar por vendedor</option>
                <option value="asc">Vendedor (Ascendente)</option>
                <option value="desc">Vendedor (Descendente)</option>
              </select>
            </div>
          </div>

          {/* Sales Table */}
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">COMPRADOR</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">VENDEDOR</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">VEHÍCULO</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">FECHA</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 divide-y divide-gray-300 divide-opacity-40">
                    {filteredSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{sale.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.client_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.agent_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sale.car_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(sale.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => {
                                setSelectedSale(sale);
                                setOpenSeeSale(true);
                              }}
                              className="text-gray-800 hover:text-blue-600 transition-colors"
                              title="Ver"
                            >
                              <FontAwesomeIcon icon={faEye} className="fa-lg" />
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
        <AddSaleDialog open={openAddSale} setOpen={setOpenAddSale} />
        {openSeeSale && (
          <SeeSaleDialog 
            open={openSeeSale}
            setOpen={setOpenSeeSale} 
            sale={selectedSale} 
          />
        )}
      </div>
    </div>
  );
};