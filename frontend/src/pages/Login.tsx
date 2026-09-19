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
import { Link } from "react-router-dom";
import { Toaster } from "sonner";

const Login = () => {
  const [mutation, formData, errors, handleInputChange, handleSubmit] =
    useSignIn();
  const isLoading = mutation.isPending;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <Toaster />
      <div className="mb-6 sm:mb-8 text-center">
        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          AI Job Tracker
        </span>
      </div>

      <Card className="w-full max-w-sm sm:max-w-md bg-transparent text-white border-border/50 shadow-xl backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 px-4 sm:px-6 pt-6">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            Enter Your Email and Password below!
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6 pt-2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-9 sm:pl-10 text-base sm:text-sm h-10 sm:h-11"
                    type="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    to="/forget"
                    className="text-xs sm:text-sm font-light text-muted-foreground hover:text-red-500 hover:underline transition-colors"
                  >
                    Forgot Your Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9 sm:pl-10 text-base sm:text-sm h-10 sm:h-11"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.password && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                className="w-full mt-2 h-10 sm:h-11 text-sm sm:text-base font-medium transition-all"
                type="submit"
                variant="outline"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>

          <div className="flex flex-row items-center justify-center mt-6 text-xs sm:text-sm gap-1.5 text-center">
            <span className="text-muted-foreground">
              Don't have an account?
            </span>
            <Link
              to="/register"
              className="font-medium text-white hover:underline transition-colors"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
