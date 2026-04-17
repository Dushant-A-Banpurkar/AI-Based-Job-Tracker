import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useAuthUser();
  
  return (
    <nav className="fixed top-0 z-50 w-full border-b  backdrop-blur-xl">
      <div className="mx-auto flex h-16 justify-between items-center md:px-16 px-4">
        <span className="text-white text-lg">AI Job Tracker</span>
        <div className="flex flex-row gap-4">
          <div className="hidden items-center gap-4 md:flex">
            {!user ? (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-transparent hover:border hover:text-white text-lg"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                className="text-lg font-semibold bg-blue-700 shadow-2xl shadow-blue-500  hover:shadow-2xl hover:shadow-blue-700 hover:bg-blue-700"
                asChild
              >
                <Link to="/analysis">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-5 w-5"></X>
          ) : (
            <Menu className="h-5 w-5"></Menu>
          )}
        </Button>

        {isOpen ? (
          <div className="absolute top-16 left-0 z-50 w-full bg-black/90 border border-b border-gray-800 p-4 shadow-xl flex flex-col gap-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-transparent hover:border hover:text-white text-lg"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              variant="default"
              className="text-lg font-semibold bg-blue-700 shadow-2xl shadow-blue-500  hover:shadow-2xl hover:shadow-blue-700 hover:bg-blue-700"
              asChild
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
