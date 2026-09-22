import { Link, useLocation } from "react-router-dom";
import { Plus, Menu } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "jobs", label: "Job Applications", path: "/jobapplication" },
  { id: "timeline", label: "Timeline", path: "/history" },
  { id: "resume", label: "Resume Analyzer", path: "/analysis" },
];

interface TopNavBarProps {
  onOpenMobileNav?: () => void;
}

export default function TopNavBar({ onOpenMobileNav }: TopNavBarProps) {
  const location = useLocation();

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-stone-800 bg-[#09090b]/80 px-4 sm:px-6 backdrop-blur-md font-mono">

      <div className="flex items-center gap-3 sm:gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenMobileNav}
          className="md:hidden text-zinc-300 hover:text-white hover:bg-stone-800/60 h-8 w-8"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>


        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.id} className="flex items-center gap-2 text-xs">
                <span className="text-[#c0392b]">//</span>
                <Link
                  to={item.path}
                  className={`transition-colors hover:text-white ${
                    isActive ? "font-bold text-white" : "text-zinc-400"
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

  
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="hidden text-[11px] text-zinc-400 lg:block">
          {today}
        </span>
        <Link
          to="/addapplication"
          className="flex h-8 items-center gap-1.5 sm:gap-2 bg-[#c0392b] px-3 sm:px-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#a93226]"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden xs:inline">New Application</span>
          <span className="xs:hidden">Add</span>
        </Link>
      </div>
    </header>
  );
}