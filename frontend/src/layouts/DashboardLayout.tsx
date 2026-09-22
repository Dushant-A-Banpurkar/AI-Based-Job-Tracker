import GridBackgroundDemo from "@/components/grid-background-demo";
import SideNavigationbar from "@/components/SideNavigationbar";
import MobileSideNavigation from "@/components/MobileSideNavigation";
import TopNavBar from "@/components/TopNavBar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashBoardLayout = () => {
  const { data: user, isLoading } = useAuthUser();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [navigate, user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950 p-4">
        <Button variant="outline" disabled className="border-blue-600 text-white">
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
          Preparing your dashboard...
        </Button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <GridBackgroundDemo>
      <div className="relative flex min-h-screen w-full overflow-x-hidden">
  
        <aside className="hidden md:block fixed inset-y-0 left-0 z-40 w-56 border-r border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
          <SideNavigationbar />
        </aside>

   
        <MobileSideNavigation
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />

      
        <div className="flex flex-1 flex-col min-w-0 md:pl-56">
          <TopNavBar onOpenMobileNav={() => setIsMobileNavOpen(true)} />

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <Outlet />
          </main>
        </div>

      </div>
    </GridBackgroundDemo>
  );
};

export default DashBoardLayout;