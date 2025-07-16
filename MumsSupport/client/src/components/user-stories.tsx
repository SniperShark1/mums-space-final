import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample story users - in a real app these would come from the backend
const sampleStories = [
  { id: 1, name: "Sarah", avatar: "https://images.unsplash.com/photo-1597695202624-8ffcfcbeb5cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 2, name: "Amy", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 3, name: "Jessica", avatar: "https://images.unsplash.com/photo-1617069470302-9b5592c80f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 4, name: "Michelle", avatar: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" }
];

export function UserStories() {
  const { isVerified } = useAuth();
  
  return (
    <div className="mb-6 overflow-x-auto hide-scrollbar">
      <div className="flex space-x-4 pb-2">
        {sampleStories.map(story => (
          <StoryCircle 
            key={story.id} 
            name={story.name} 
            avatar={story.avatar} 
            isLocked={!isVerified}
          />
        ))}
        
        <AddStoryCircle isLocked={!isVerified} />
      </div>
    </div>
  );
}

type StoryCircleProps = {
  name: string;
  avatar: string;
  isLocked?: boolean;
};

function StoryCircle({ name, avatar, isLocked = false }: StoryCircleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center space-y-1">
            <div className={`w-16 h-16 rounded-full p-0.5 ${
              isLocked ? 'bg-gray-300' : 'bg-gradient-to-br from-pink-500 to-blue-gentle'
            }`}>
              <div className="bg-white p-0.5 rounded-full w-full h-full relative">
                <Avatar className="w-full h-full">
                  <AvatarImage src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
                  <AvatarFallback className="bg-pink-soft text-white">
                    {name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                {isLocked && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs font-medium text-gray-600">{name}</span>
          </div>
        </TooltipTrigger>
        {isLocked && (
          <TooltipContent>
            <p>Verify your email to view stories</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

function AddStoryCircle({ isLocked = false }: { isLocked?: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center space-y-1">
            <div className={`w-16 h-16 rounded-full p-0.5 ${
              isLocked ? 'bg-gray-300' : 'bg-gradient-to-br from-pink-500 to-blue-gentle'
            }`}>
              <div className="bg-white p-0.5 rounded-full w-full h-full flex items-center justify-center">
                {isLocked ? (
                  <Lock className="h-6 w-6 text-gray-400" />
                ) : (
                  <Plus className="h-6 w-6 text-pink-soft" />
                )}
              </div>
            </div>
            <span className="text-xs font-medium text-gray-600">Add</span>
          </div>
        </TooltipTrigger>
        {isLocked && (
          <TooltipContent>
            <p>Verify your email to create stories</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
