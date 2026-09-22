import { cn } from "@/lib/utils";
import {
  History,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Briefcase,
  PlusCircle,
  X,
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
  showBadge?: boolean;
}

const navSections: { section: string; items: NavItemData[] }[] = [
  {
    section: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        id: "jobs",
        label: "Job Applications",
        icon: Briefcase,
        path: "/jobapplication",
        showBadge: true,
      },
      {
        id: "timeline",
        label: "Timeline",
        icon: History,
        path: "/history",
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
        path: "/analyzer",
      },
      {
        id: "addjob",
        label: "Add Application",
        icon: PlusCircle,
        path: "/addapplication",
      },
    ],
  },
];

interface MobileSideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSideNavigation({
  isOpen,
  onClose,
}: MobileSideNavigationProps) {
  const location = useLocation();
  const { mutate: logout } = useLogout();
  const { data: applications } = useGetAllApplications();

  const applicationCount = applications?.length ?? 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="relative z-10 flex h-full w-64 shrink-0 flex-col border-r border-stone-800 bg-[#1a1a1af7] font-mono text-[#f4f1e8] shadow-2xl transition-transform">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/45">
              AI Career Portal
            </p>
            <h1 className="font-syne text-[20px] font-extrabold leading-tight tracking-tight text-[#faf8f2]">
              JobTrack AI
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {navSections.map(({ section, items }) => (
            <div key={section} className="mb-4">
              <p className="px-4 pb-1 pt-3 text-[9px] uppercase tracking-[0.15em] text-white/30">
                {section}
              </p>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={onClose}
                      className={cn(
                        "group flex w-full items-center gap-2.5 border-l-[3px] py-2.5 px-4 text-[12px] transition-all duration-150 outline-none",
                        isActive
                          ? "border-[#c0392b] bg-[#c0392b1d] text-[#faf8f2]"
                          : "border-transparent text-white/60 hover:bg-white/5 hover:text-[#faf8f2]",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                          isActive ? "bg-[#c0392b]" : "bg-current opacity-40",
                        )}
                      />

                      <div className="flex flex-1 items-center gap-2">
                        <Icon
                          className={cn(
                            "h-3.5 w-3.5",
                            isActive ? "text-[#c0392b]" : "text-white/40",
                          )}
                        />
                        <span className="flex-1 text-left">{item.label}</span>
                      </div>

                      {item.showBadge && (
                        <span className="ml-auto rounded-xs bg-[#c0392b] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white">
                          {applicationCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Button
            variant="ghost"
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full justify-start gap-3 rounded-none text-white/60 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="text-xs">Logout</span>
          </Button>
        </div>
      </aside>
    </div>
  );
}
