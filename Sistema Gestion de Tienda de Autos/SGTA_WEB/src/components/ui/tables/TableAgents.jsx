export const TableAgents = ({ items,  onSee, onEdit, setAgent }) => {

    return (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                <th className="p-2 border bg-blue-900 text-white">Folio</th>
                <th className="p-2 border bg-blue-900 text-white">Nombre</th>
                <th className="p-2 border bg-blue-900 text-white">Ventas</th>
                <th className="p-2 border bg-blue-900 text-white">Ingresos</th>
                <th className="p-2 border bg-blue-900 text-white">Teléfono</th>
                <th className="p-2 border bg-blue-900 text-white">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map((agent, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="p-2 border bg-white text-black">{agent.id}</td>
                        <td className="p-2 border bg-white text-black">{agent.name}</td>
                        <td className="p-2 border bg-white text-black">{agent.total_cars_sold}</td>
                        <td className="p-2 border bg-white text-black">{`${agent.total_revenue}`}</td>
                        <td className="p-2 border bg-white text-black">{agent.cellphone}</td>
                        <td className="p-2 border bg-white text-black">
                        <button
                            onClick={() => {
                                onSee(true);
                                setAgent(agent);
                            }}
                            className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-lg mr-2 hover:bg-blue-700"
                        >
                            Ver
                        </button>
                        <button
                            onClick={() => {
                                onEdit(true);
                                setAgent(agent);
                            }}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-500"
                        >
                            Editar
                        </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}