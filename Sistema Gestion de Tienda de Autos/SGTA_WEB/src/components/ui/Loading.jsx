export const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-xl mb-10">Cargando</p>
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    )
}