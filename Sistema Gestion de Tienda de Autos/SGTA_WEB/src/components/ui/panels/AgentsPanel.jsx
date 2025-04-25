import { useState } from "react";
import { Pagination } from "../Pagination";
import { TableAgents } from "../Tables/TableAgents";

export const Agents = ({ agentsData,  onSee, onEdit, setAgent }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = agentsData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(agentsData.length / itemsPerPage);
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
                    <p className="text-xl text-gray-500">No hay agentes disponibles.</p>
                </div>
            ) :
                <div>
                    <div className="overflow-x-auto p-4">
                        <TableAgents items={paginatedItems} onSee={onSee} onEdit={onEdit} setAgent={setAgent}  />
                    </div>
    
                    <>
                        <Pagination currentPage={currentPage} goToPage={goToPage} totalPages={totalPages} />
                    </>
                </div>
            }
        </>
    )
}