import { useState } from "react";
import { TableCars } from "../tables/TableCars";
import { Pagination } from "../Pagination";

export const Cars = ({ carsData, onSee, onEdit, setCar }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = carsData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(carsData.length / itemsPerPage);
    const goToPage = (page) => setCurrentPage(page);

    return (
        <>
            {paginatedItems.length === 0 ? (
                <div className="flex justify-center items-center mt-5">
                    <p className="text-xl text-gray-500">No hay ventas disponibles.</p>
                </div>
            ) :
                <div>
                    <div className="overflow-x-auto p-4">
                        <TableCars items={paginatedItems} onSee={onSee} onEdit={onEdit} setCar={setCar} />
                    </div>
    
                    <>
                        <Pagination currentPage={currentPage} goToPage={goToPage} totalPages={totalPages} />
                    </>
                </div>
            }
        </>
    )
}