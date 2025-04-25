export const TableClients = ({ items, onSee, onEdit, setClient }) => {
    return (
        <table className="min-w-full table-auto border-collapse">
            <thead>
                <tr className="bg-white text-left border-b border-gray-200">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Folio</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Compras</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {items.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.total_cars_purchased}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{`${user.address}, ${user.state}, ${user.municipality}`}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.cellphone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        onSee(true);
                                        setClient(user);
                                    }}
                                    className="bg-blue-800 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                                >
                                    Ver
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit(true);
                                        setClient(user);
                                    }}
                                    className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-500 transition-colors"
                                >
                                    Editar
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}