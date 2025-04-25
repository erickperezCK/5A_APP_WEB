import { Link } from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
                <h1 className="text-7xl font-bold text-blue-800">404</h1>

                <h2 className="text-2xl font-semibold text-gray-700 mt-4">
                    ¡Página no encontrada!
                </h2>
                <p className="text-gray-500 mt-2 mb-6">
                    Lo sentimos, la página que buscas no existe o fue movida.
                </p>

                <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};
