import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useAuthUser();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        

        <Link
          to="/"
          className="text-white text-lg sm:text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
          onClick={closeMenu}
        >
          AI Job Tracker
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Button
                variant="ghost"
                className="text-white hover:bg-stone-800/60 hover:text-white"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                asChild 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/20 transition-all"
              asChild
            >
              <Link to="/dashboard">Get Started</Link>
            </Button>
          )}
        </div>


        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-stone-800/60"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden border-b border-stone-800 bg-stone-950/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl flex flex-col gap-3">
          {!user ? (
            <>
              <Button
                variant="ghost"
                className="w-full justify-center text-white hover:bg-stone-800/60 text-base"
                asChild
                onClick={closeMenu}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
                asChild
                onClick={closeMenu}
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <Button
              className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
              asChild
              onClick={closeMenu}
            >
              <Link to="/dashboard">Get Started</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;