import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "jobs", label: "Job Applications", path: "/jobapplication" },
  { id: "timeline", label: "Timeline", path: "/history" },
  { id: "resume", label: "Resume Analyzer", path: "/analysis" },
];

export default function TopNavBar() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-center border-b border-[#1a1a1a] bg-[#faf8f2] px-6 backdrop-blur-md dark:bg-[#09090b]/80 gap-10">
      <nav className="flex items-center gap-6">
        {navItems.map((items)=>(
            <div key={items.id} className="flex items-center gap-2 text-[12px] font-mono text-zinc-500">
          <span className="text-[#c0392b]">//</span>
          <Link to={items.path} className="hover:text-zinc-800 cursor-pointer">
            {items.label}
          </Link>
        </div>
        ))}
      </nav>
      <div className="flex items-center gap-4 font-mono">
        <span className="hidden text-[11px] text-zinc-400 lg:block">
            {today}
        </span>
        <Link to="./add" className="h-8 gap-2 rounded-none bg-[#c0392b] px-4 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#a93226] flex flex-row items-center">
            <Plus className="h-3.5 w-3.5"/>
            New Application
        </Link>
      </div>
    </header>
  );
}
