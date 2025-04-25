import { Outlet } from "react-router-dom"
import { ListHeader } from "./ListHeader"

export const ListLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ListHeader />
            <main className="flex-1 bg-[#737373]">
                <Outlet />
            </main>
            <div className="">

            </div>
        </div>
    )
}