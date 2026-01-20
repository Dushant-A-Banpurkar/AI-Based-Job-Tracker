import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSignIn } from "../hooks/useLogin";
import { Label } from "@radix-ui/react-label";
import { Loader2, Lock, Mail } from "lucide-react";
import { Link} from "react-router-dom";
import { Toaster } from "sonner";

const Login = () => {
  const[mutation,formData,errors,handleInputChange,handleSubmit]=useSignIn();
  const isLoading=mutation.isPending;
  return (
    <div className="flex flex-col items-center">
      <Toaster/>
      <div className="mt-20">
        <span className="text-white text-2xl">AI Job Tracker</span>
      </div>

      <Card className="w-full max-w-md text-lg bg-transparent text-white mt-10">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">Welcome Back</CardTitle>
          <CardDescription className="text-xl">
            Enter Your Email and Password below!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="Email">Email</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>
                  <Input
                  id="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 text-xl"
                  type="email"
                />
                {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex flex-row justify-between">
                  <Label htmlFor="Password">
                  Password
                </Label>
                <Link to="/forget" className="font-light hover:underline hover:text-red-600 text-sm">
                Forget Your Password ?
                </Link>
                </div>
                <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>
                <Input
                id="password"
                placeholder="••••••••"
                name="password"
                className="pl-10 text-xl"
                value={formData.password}
                onChange={handleInputChange}
                required
                />
                {errors.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                </div>
              </div>
              <Button className="w-full border"
              type="submit"
              variant="ghost"
              disabled={isLoading}

              >
                {isLoading?(
               <>
               <Loader2 className=""/>
               Signing in...
               </> )
              :("Login")
              }
              </Button>
            </div>
          </form>
          <div className="flex flex-row mt-6 text-center text-md gap-2 ">
            <span className="text-muted-foreground">Don't have an account?</span>
            <Link to="/register" className="font-medium text-white hover:underline">
            Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
