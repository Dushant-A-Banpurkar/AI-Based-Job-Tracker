import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuthUser } from "@/hooks/useAuthUser";


const DashBoard = () => {
  const { data: user, isLoading, isError } = useAuthUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-xs">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Error loading user. Please log in.</p>
      </div>
    );
  }

  return (
    <div></div>
  );
};

export default DashBoard;
