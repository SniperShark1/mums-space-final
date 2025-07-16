import { useLocation } from "wouter";
import { CustomIcon } from "@/components/custom-icon";
import { User, MessageCircle } from "lucide-react";

type BottomNavigationBarProps = {
  activeRoute?: string;
};

export function BottomNavigationBar({ activeRoute = "/" }: BottomNavigationBarProps) {
  const [_, setLocation] = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-around max-w-md mx-auto">
        <button 
          className={`flex flex-col items-center p-2 rounded-md hover:bg-gray-100 transition-colors ${
            activeRoute === "/" ? "text-pink-600" : "text-gray-500"
          }`}
          onClick={() => setLocation("/")}
        >
          <CustomIcon name="home" size="md" className="mb-1" />
          <span className="text-xs">Home</span>
        </button>
        <button 
          className={`flex flex-col items-center p-2 rounded-md hover:bg-gray-100 transition-colors ${
            activeRoute === "/groups" ? "text-pink-600" : "text-gray-500"
          }`}
          onClick={() => setLocation("/groups")}
        >
          <CustomIcon name="groups" size="md" className="mb-1" />
          <span className="text-xs">Groups</span>
        </button>
        <button 
          className="flex flex-col items-center p-2"
          onClick={() => setLocation("/create-story")}
        >
          <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors">
            <span className="text-xl">+</span>
          </div>
        </button>
        <button 
          className={`flex flex-col items-center p-2 rounded-md hover:bg-gray-100 transition-colors ${
            activeRoute === "/chat" ? "text-pink-600" : "text-gray-500"
          }`}
          onClick={() => setLocation("/chat")}
        >
          <MessageCircle className="h-6 w-6 mb-1" />
          <span className="text-xs">Chat</span>
        </button>
        <button 
          className={`flex flex-col items-center p-2 rounded-md hover:bg-gray-100 transition-colors ${
            activeRoute === "/profile" ? "text-pink-600" : "text-gray-500"
          }`}
          onClick={() => setLocation("/profile")}
        >
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
}