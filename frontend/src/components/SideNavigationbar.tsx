import { cn } from "@/lib/utils";
import {
  History,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Briefcase,
  PlusCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";
import type { ElementType } from "react";
import { useGetAllApplications } from "@/hooks/useGet";

export interface NavItemData {
  id: string;
  label: string;
  icon: ElementType;
  path: string;
  badge: number | string | null;
}

const navItems: { section: string; items: NavItemData[] }[] = [
  {
    section: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        badge: null,
      },
      {
        id: "jobs",
        label: "Job Applications",
        icon: Briefcase,
        path: "/jobapplication",
        badge: 0,
      },
      {
        id: "timeline",
        label: "Timeline",
        icon: History,
        path: "/history",
        badge: null,
      },
    ],
  },
  {
    section: "AI Tools",
    items: [
      {
        id: "resume",
        label: "Resume Analyzer",
        icon: FileSearch,
        path: "/analysis",
        badge: null,
      },
      {
        id: "addjob",
        label: "Add Application",
        icon: PlusCircle,
        path: "/addapplication",
        badge: null,
      },
    ],
  },
];

export default function SideNavbar() {
  
  const location = useLocation();
  const { mutate: logout } = useLogout();

  return (
    <aside className="flex h-screen w-55 shrink-0 flex-col border-r-2 border-[#1a1a1a] bg-[#1a1a1af7] font-mono text-[#f4f1e8]">
      <div className="flex flex-col gap-2 border-b border-white/10 px-4.5 py-5 pb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/45">
          AI Career Portal
        </p>
        <h1 className="font-syne text-[22px] font-extrabold leading-tight tracking-tight text-[#faf8f2]">
          JobTrack AI
        </h1>
        <div className="flex">
          <span className="border border-white/20 px-2 py-0.5 text-[10px] tracking-wide text-white/55">
            v1.0
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map(({ section, items }) => (
          <div key={section} className="mb-4">
            <p className="px-4.5 pb-1 pt-3.5 text-[9px] uppercase tracking-[0.15em] text-white/30">
              {section}
            </p>
            <div className="space-y-0.5">
              {items.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  active={location.pathname === item.path}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Button
          variant="ghost"
          onClick={() => logout()}
          className="w-full justify-start gap-3 rounded-none text-white/60 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  item: NavItemData;
  active: boolean;
}

function NavItem({ item, active }: NavItemProps) {
  const Icon = item.icon;
  const { data: applications } = useGetAllApplications();
  return (
    <Link
      to={item.path}
      className={cn(
        "group flex w-full items-center gap-2.5 border-l-[3px] py-2.5 px-4.5 text-[12px] transition-all duration-150 outline-none",
        active
          ? "border-[#c0392b] bg-[#c0392b1d] text-[#faf8f2]"
          : "border-transparent text-white/60 hover:bg-white/5 hover:text-[#faf8f2]",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
          active ? "bg-[#c0392b]" : "bg-current opacity-40",
        )}
      />

      {/* Label with Icon */}
      <div className="flex flex-1 items-center gap-2">
        <Icon
          className={cn(
            "h-3.5 w-3.5",
            active ? "text-[#c0392b]" : "text-white/40",
          )}
        />
        <span className="flex-1 text-left">{item.label}</span>
      </div>

      {/* Badge */}
      {item.badge !== null && (
        <span className="ml-auto rounded-xs bg-[#c0392b] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white">
          {applications ? applications.length : item.badge}
        </span>
      )}
    </Link>
  );
}
