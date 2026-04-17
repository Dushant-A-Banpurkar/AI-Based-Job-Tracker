import { cn } from "@/lib/utils";
import {  ArrowLeft, ArrowRight,History, FileSearch, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";


const navItems=[
    {index:1,icon:LayoutDashboard,label:"DashBoard",path:"/dashboard"},
    {index:2,icon:FileSearch,label:"New Analysis",path:"/analysis"},
    {index:3,icon: History,label:"History",path:"/history"},
    {index:4,icon:Settings,label:"Settings",path:"/settings"},
]

const SideNavbar=()=>{
    const location=useLocation();
    const [collapsed,setCollapsed]=useState(false);
    const {mutate:logout} =useLogout();
    return(
        <aside className={cn(`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border transition-all duration-100 ${collapsed ? "w-24" : "w-46"}`)}>
            <div className="h-16 items-center justify-between border border-border px-4 flex flex-row relative">
            <Link to="/dashboard" className="flex items-center gap-2">
                {collapsed?<span className="text-white text-lg">AI Job</span>:<span className="text-white text-lg duration-200 w-auto">AI Job Tracker</span>}
            </Link>
            <Button
            variant="default"
            className="text-white absolute -right-4 top-4 z-50 w-4 h-8"
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
        <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

        <div className="border-t border p-3">
            <Button
            variant="ghost"
            onClick={()=>logout()}
            className={cn("w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
                collapsed && "justify-center p-0"
            )}
            
            ><LogOut className="h-5 w-5 shrink-0"/>
            {!collapsed && <span>Logout</span>}
            </Button>
        </div>
        </aside>

    )
}

export default SideNavbar;