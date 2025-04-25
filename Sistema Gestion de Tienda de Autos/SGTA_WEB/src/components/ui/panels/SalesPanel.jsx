import { useState } from "react";
import { TableSales } from "../tables/TableSales";
import { Pagination } from "../Pagination";

export const Sales = ({ salesData, onSee, setSale }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = salesData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(salesData.length / itemsPerPage);
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
                        <TableSales items={paginatedItems} onSee={onSee} setSale={setSale} />
                    </div>
    
                    <>
                        <Pagination currentPage={currentPage} goToPage={goToPage} totalPages={totalPages} />
                    </>
                </div>
            }
        </>
    )
}