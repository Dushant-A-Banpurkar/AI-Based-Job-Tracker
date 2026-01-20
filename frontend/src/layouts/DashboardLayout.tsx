import SideNavbar from "@/components/SideNavbar";
import { Outlet } from "react-router-dom";


const DashBoardLayout=()=>{


    return(
        <div className="min-h-screen">
            <div className="hidden md:block">
                <SideNavbar/>
            </div>
            <main className="pb-20 md:ml-64 md:pb-0">
                <Outlet/>
            </main>
        </div>
    )
}

export default DashBoardLayout;