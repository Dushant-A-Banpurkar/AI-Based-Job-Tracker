import { cn } from "@/lib/utils";
import {  ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";


const SideNavbar=()=>{
    const location=useLocation();
    const [collapsed,setCollapsed]=useState(false);
    return(
        <aside className={cn(`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border transition-all duration-300 ${collapsed ? "w-40" : "w-64"}`)}>
            <div className="h-16 items-center justify-between border border-border px-4 flex flex-row">
            <Link to="/dashboard" className="flex items-center gap-2">
                {collapsed?<span className="text-white text-lg">AI Job</span>:<span className="text-white text-lg">AI Job Tracker</span>}
            </Link>
            <Button
            variant="ghost"
            className="text-white hover:text-black"
            onClick={()=>setCollapsed(!collapsed)}
            >
                {
                    collapsed?
                    <ArrowRight className=" w-4 h-4"/>
                    :
                    <ArrowLeft className="w-4 h-4"/>
                }
            </Button>
        </div>
        </aside>
    )
}

export default SideNavbar;