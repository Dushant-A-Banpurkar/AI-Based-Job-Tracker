import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Label } from "@radix-ui/react-label";
import { User2 } from "lucide-react";

const Settings = () => {
  const { data: user } = useAuthUser();
  
  return (
    <div className="flex flex-col px-40 py-8">
      <div className=" flex flex-col text-left gap-4">
        <span className="font-bold text-2xl text-left  text-white">
          Settings
        </span>
        <span className="font-bold text-xl text-left text-gray-600">
          Manage your account preferences
        </span>
      </div>
      <form className="flex flex-col mt-16 w-2xl justify-center gap-16 items-center">
        <Card className="bg-transparent px-4 py-8">
          <CardHeader className="font-bold gap-4">
            <CardTitle className="text-xl flex flex-row items-center gap-2">
              <User2 className="text-blue-500" />{" "}
              <span className="text-white"> Profile</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-col gap-2 w-64">
                <Label className="text-lg text-white">First Name</Label>
                <Input placeholder={user.firstname} className="text-white" />
              </div>
              <div className="flex flex-col gap-2 w-64">
                <Label className="text-lg text-white">Last Name</Label>
                <Input placeholder={user.lastname} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-lg text-white">Email</Label>
              <Input placeholder={user.email} className="text-white" />
            </div>
          </CardContent>
        </Card>
        <Button variant="secondary" className="w-64">
          Save Changes
        </Button>
      </form>
    </div>
  );
};
export default Settings;
