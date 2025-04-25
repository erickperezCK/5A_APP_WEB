import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const HeaderAndFooterLayout = () => {
    return (
        <div className="">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}