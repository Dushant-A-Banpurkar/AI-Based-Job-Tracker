import GridBackgroundDemo from "@/components/grid-background-demo";
import SideNavigationbar from "@/components/SideNavigationbar";
import TopNavBar from "@/components/TopNavBar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashBoardLayout = () => {
  const { data: user, isLoading } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [navigate, user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
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
      {/* IMPORTANT: We add a flex container here. 
          The Sidebar is fixed/sticky, and the main area scrolls.
      */}
      <div className="flex min-h-screen w-full">
        
        {/* Sidebar - Desktop Only */}
        <div className="hidden md:block fixed">
          <SideNavigationbar />
        </div>

        {/* Main Content Area */}
        {/* ml-[220px] matches your sidebar width exactly. 
            flex-1 makes it take up the remaining screen width.
        */}
        <main className="flex-1 ml-55 md:pb-0">
          <TopNavBar/>
          <div className="container mx-auto py-6 w-full">
             <Outlet />
          </div>
        </main>
      </div>
    </GridBackgroundDemo>
  );
};

export default DashBoardLayout;