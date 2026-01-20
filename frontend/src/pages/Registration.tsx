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
import { Loader2, Mail, Lock, Text, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";


const Registration = () => {
  const [formData, errors, handleInputChange, handleSubmit, mutation] = useSignUp();

  const isLoading=mutation.isPending;

  return (
    <div className="flex flex-col items-center">
      <Toaster />
      <div className="mt-10">
        <span className="text-white text-2xl">AI Job Tracker</span>
      </div>

      <Card className="w-full max-w-lg text-lg bg-transparent text-white mt-6">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">Create an account</CardTitle>
          <CardDescription className="text-xl">
            Get started with your free resume analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="First Name">First Name</Label>
                  <div className="relative">
                    <Text className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="firstname"
                      name="firstname"
                      placeholder="sahil"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                      className="pl-10 text-xl w-56"
                      type="text"
                    />
                    {errors.firstname && (
                      <p className="text-red-500">{errors.firstname}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Last Name">Last Name</Label>
                  <div className="relative">
                    <Text className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder="sharma"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                      className="pl-10 text-xl w-56"
                      type="text"
                    />
                    {errors.lastname && (
                      <p className="text-red-500">{errors.lastname}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Username">Username</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="sahilsharma7"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="pl-10 text-xl"
                    type="text"
                  />
                  {errors.username && (
                      <p className="text-red-500">{errors.username}</p>
                    )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Email">Email</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
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
                <Label htmlFor="Password">Password</Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    name="password"
                    className="pl-10 text-xl"
                  />
                  {errors.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                </div>
              </div>
              <Button
                className="w-full border"
                type="submit"
                variant="ghost"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
          <div className="flex flex-row mt-6 text-center text-md gap-2 ">
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="font-medium text-white hover:underline"
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
