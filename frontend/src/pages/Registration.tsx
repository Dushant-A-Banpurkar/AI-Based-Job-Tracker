import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useSignUp}  from "../hooks/useSignUp";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";


const Registration = () => {
  const [formData, errors, handleInputChange, handleSubmit, mutation] = useSignUp();

  const isLoading=mutation.isPending;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <Toaster />


      <div className="mb-6 sm:mb-8 text-center">
        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
          AI Job Tracker
        </span>
      </div>

     
      <Card className="w-full max-w-md sm:max-w-lg bg-transparent text-white border-border/50 shadow-xl backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 px-4 sm:px-6 pt-6">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Get started with your free resume analysis
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 pb-6 pt-2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:gap-5">
              
          
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstname" className="text-sm font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="firstname"
                      name="firstname"
                      placeholder="sahil"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      className="pl-9 sm:pl-10 text-base sm:text-sm h-10 sm:h-11 w-full"
                      type="text"
                    />
                  </div>
                  {errors.firstname && (
                    <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.firstname}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastname" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder="sharma"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                      className="pl-9 sm:pl-10 text-base sm:text-sm h-10 sm:h-11 w-full"
                      type="text"
                    />
                  </div>
                  {errors.lastname && (
                    <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.lastname}</p>
                  )}
                </div>
              </div>


              <div className="grid gap-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="sahilsharma7"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="pl-9 sm:pl-10 text-base sm:text-sm h-10 sm:h-11 w-full"
                    type="text"
                  />
                </div>
                {errors.username && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.username}</p>
                )}
              </div>

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
                    className="pl-9 sm:pl-10 text-base sm:text-sm h-10 sm:h-11 w-full"
                    type="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

          
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-9 sm:pl-10 text-base sm:text-sm h-10 sm:h-11 w-full"
                  />
                </div>
                {errors.password && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.password}</p>
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>

          <div className="flex flex-row items-center justify-center mt-6 text-xs sm:text-sm gap-1.5 text-center">
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="font-medium text-white hover:underline transition-colors"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
};

export default Registration;
