export const TableCars = ({ items, onSee, onEdit, setCar }) => {
    return (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                <th className="p-2 border bg-blue-900 text-white">Folio</th>
                <th className="p-2 border bg-blue-900 text-white">Marca</th>
                <th className="p-2 border bg-blue-900 text-white">Modelo</th>
                <th className="p-2 border bg-blue-900 text-white">Año</th>
                <th className="p-2 border bg-blue-900 text-white">Color</th>
                <th className="p-2 border bg-blue-900 text-white">Precio</th>
                <th className="p-2 border bg-blue-900 text-white">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {items.map((car, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="p-2 border bg-white text-black">{car.id}</td>
                        <td className="p-2 border bg-white text-black">{car.brand_name}</td>
                        <td className="p-2 border bg-white text-black">{car.model_name}</td>
                        <td className="p-2 border bg-white text-black">{car.year}</td>
                        <td className="p-2 border bg-white text-black">{car.color}</td>
                        <td className="p-2 border bg-white text-black">{car.price}</td>
                        <td className="p-2 border bg-white text-black">
                        <button
                            onClick={() => {
                                onSee(true);
                                setCar(car);
                            }}
                            className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-lg mr-2 hover:bg-blue-700"
                        >
                            Ver
                        </button>
                        <button
                            onClick={() => {
                                onEdit(true);
                                setCar(car);
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