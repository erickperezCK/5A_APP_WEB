export const Pagination = ({ currentPage, totalPages, goToPage }) => {
    return (
        <>
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-gray-200 rounded-lg ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-300"}`}
                    >
                        Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => goToPage(i + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-gray-200 rounded-lg ${currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-gray-300"}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </>
    )
}