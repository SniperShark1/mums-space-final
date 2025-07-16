import { useLocation } from "wouter";
import { Home, Users, MessageSquare, MapPin, Plus, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type BottomNavigationProps = {
  active?: "home" | "groups" | "messages" | "help-map";
  onNewPost?: () => void;
};

export function BottomNavigation({ active, onNewPost }: BottomNavigationProps) {
  const [_, navigate] = useLocation();
  const { isVerified } = useAuth();

  return (
    <nav className="bg-white shadow-lg fixed bottom-0 inset-x-0 z-30 border-t border-gray-200 safe-bottom">
      <div className="flex justify-around items-center h-16">
        <button 
          className={`flex flex-col items-center justify-center w-full h-full ${active === "home" ? "text-pink-600" : "text-gray-500"}`}
          onClick={() => navigate("/home")}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Feed</span>
        </button>
        
        <button 
          className={`flex flex-col items-center justify-center w-full h-full ${active === "groups" ? "text-pink-600" : "text-gray-500"}`}
          onClick={() => navigate("/")}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Circles</span>
        </button>
        
        {onNewPost && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="flex flex-col items-center justify-center w-full h-full"
                  onClick={isVerified ? onNewPost : undefined}
                  disabled={!isVerified}
                >
                  <div className={`rounded-full p-3 -mt-6 mb-1 ${isVerified ? 'bg-pink-soft' : 'bg-gray-300'}`}>
                    {isVerified ? (
                      <Plus className="h-5 w-5 text-white" />
                    ) : (
                      <Lock className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">Post</span>
                </button>
              </TooltipTrigger>
              {!isVerified && (
                <TooltipContent>
                  <p>Verify your email to create posts</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
        
        <button 
          className={`flex flex-col items-center justify-center w-full h-full ${active === "messages" ? "text-pink-600" : "text-gray-500"}`}
          onClick={() => navigate("/messages")}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Messages</span>
        </button>
        
        <button 
          className={`flex flex-col items-center justify-center w-full h-full ${active === "help-map" ? "text-pink-600" : "text-gray-500"}`}
          onClick={() => navigate("/help-map")}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-xs mt-1">Help Map</span>
        </button>
      </div>
    </nav>
  );
}
