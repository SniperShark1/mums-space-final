import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { 
  Bell, 
  Search,
  Settings,
  UserPlus 
} from "lucide-react";
import { ThemeSelector } from "@/components/theme-selector";
import { Button } from "@/components/ui/button";
import logoImage from "../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [_, navigate] = useLocation();
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm fixed top-0 inset-x-0 z-30">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-2" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src={logoImage} alt="Mum's Space Logo" className="h-9 w-auto" />
            <h1 className="text-2xl font-quicksand font-bold text-pink-600">Mum's Space</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-500" />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeSelector />
          
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/auth"
              appearance={{
                elements: {
                  avatarBox: 'h-8 w-8'
                }
              }}
            />
          </SignedIn>
          
          <SignedOut>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/auth?tab=login")}
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-pink-soft hover:bg-pink-600 flex items-center"
                onClick={() => navigate("/auth?tab=register")}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Sign Up
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
