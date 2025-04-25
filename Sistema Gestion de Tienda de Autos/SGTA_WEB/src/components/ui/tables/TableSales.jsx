export const TableSales = ({ items, onSee, setSale }) => {
    return (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                <th className="p-2 border bg-blue-900 text-white">Folio</th>
                <th className="p-2 border bg-blue-900 text-white">Fecha</th>
                <th className="p-2 border bg-blue-900 text-white">Comprador</th>
                <th className="p-2 border bg-blue-900 text-white">Vendedor</th>
                <th className="p-2 border bg-blue-900 text-white">Precio Final</th>
                <th className="p-2 border bg-blue-900 text-white">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map((sale, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="p-2 border bg-white text-black">{sale.id}</td>
                        <td className="p-2 border bg-white text-black">{sale.created_at}</td>
                        <td className="p-2 border bg-white text-black">{sale.client_name}</td>
                        <td className="p-2 border bg-white text-black">{sale.agent_name || "Sin vendedor"}</td>
                        <td className="p-2 border bg-white text-black">{sale.total_price}</td>
                        <td className="p-2 border bg-white text-black">
                            <button
                                onClick={() => {
                                    onSee(true)
                                    setSale(sale)
                                }}
                                className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-lg mr-2 hover:bg-blue-700"
                            >
                                Ver
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}