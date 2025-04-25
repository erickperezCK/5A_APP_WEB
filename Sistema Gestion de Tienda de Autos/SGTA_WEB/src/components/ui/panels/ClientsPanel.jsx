import { useState } from "react";
import { Pagination } from "../Pagination";
import { TableClients } from "../Tables/TableClients";

export const Clients = ({ clientsData, onSee, onEdit, setClient }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = clientsData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(clientsData.length / itemsPerPage);
    const goToPage = (page) => setCurrentPage(page);

    const [openInfo, setOpenInfo] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenInfo = (sale) => {
        setOpenInfo(true);
    }

    const handleOpenEdit = (sale) => {
        setOpenEdit(true);
    }

    return (
        <>
            {paginatedItems.length === 0 ? (
                <div className="flex justify-center items-center mt-5">
                    <p className="text-xl text-gray-500">No hay clientes disponibles.</p>
                </div>
            ) :
                <div className="bg-white rounded-lg shadow-sm p-6 mx-auto max-w-7xl">
                    <div className="overflow-x-auto">
                        <TableClients items={paginatedItems} onSee={onSee} onEdit={onEdit} setClient={setClient} />
                    </div>
    
                    <div className="mt-6">
                        <Pagination currentPage={currentPage} goToPage={goToPage} totalPages={totalPages} />
                    </div>
                </div>
            }
        </>
    )
}