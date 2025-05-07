
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn, Book, Video, User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">EduMarket</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground/60"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/books" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/books") ? "text-primary" : "text-foreground/60"
            }`}
          >
            Books
          </Link>
          <Link 
            to="/courses" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/courses") ? "text-primary" : "text-foreground/60"
            }`}
          >
            Courses
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="hidden md:block">
                <Button variant="ghost" className="gap-2">
                  <User size={16} />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Button 
                onClick={logout} 
                variant="outline"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="text-sm gap-1">
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button className="text-sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
