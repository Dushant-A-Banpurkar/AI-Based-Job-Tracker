import SideNavbar from "@/components/SideNavbar";
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
      <div className="flex h-screen w-full items-center justify-center ">
        <div className="flex items-center gap-4">
          <Button variant="outline" disabled size="sm">
            <Spinner data-icon="inline-start" className="mr-2 h-5 w-5 animate-spin" />
            Preparing your dashboard...
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="hidden md:block">
        <SideNavbar />
      </div>
      <main className="pb-20 md:ml-64 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
