import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Send, MessageSquare, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Message, User, Group } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

type GroupMessagesProps = {
  group: Group;
  onBack: () => void;
};

export function GroupMessages({ group, onBack }: GroupMessagesProps) {
  const [messageText, setMessageText] = useState("");
  const { user } = useAuth();

  // In a real app, you would fetch group messages
  // For now, we'll use mock data based on the group
  const messages = [
    {
      id: 1,
      content: `Welcome to the ${group.name}! This is a safe space for mothers to discuss topics related to children ${group.ageGroup === 'newborn' ? '0-2 years' : 
                                            group.ageGroup === 'toddler' ? '2-5 years' : 
                                            group.ageGroup === 'school' ? '5-13 years' : 
                                            group.ageGroup === 'teen' ? '13-18 years' : '18+ years'}.`,
      senderId: 0, // Admin
      receiverId: 0, // Group message
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      isRead: true
    },
    {
      id: 2,
      content: "How do other mums handle sleep schedules? My little one is really struggling with a consistent routine.",
      senderId: 1,
      receiverId: 0,
      createdAt: new Date(Date.now() - 43200000), // 12 hours ago
      isRead: true
    },
    {
      id: 3,
      content: "I found that a warm bath followed by a story and some gentle music works wonders. It's all about consistency!",
      senderId: 2,
      receiverId: 0,
      createdAt: new Date(Date.now() - 39600000), // 11 hours ago
      isRead: true
    },
    {
      id: 4,
      content: "Has anyone tried sleep training? I'm at my wit's end with the 3 am wake-ups.",
      senderId: 3,
      receiverId: 0,
      createdAt: new Date(Date.now() - 21600000), // 6 hours ago
      isRead: true
    }
  ];

  // In a real application, this would be an actual API call
  const sendMessageMutation = {
    mutate: (data: { content: string }) => {
      console.log("Sending message to group:", data.content);
      setMessageText("");
    },
    isPending: false
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    sendMessageMutation.mutate({
      content: messageText
    });
  };

  // Display user names instead of IDs
  const getUserName = (id: number) => {
    if (id === 0) return "Admin";
    if (id === 1) return "Sarah";
    if (id === 2) return "Emma";
    if (id === 3) return "Jessica";
    return `User ${id}`;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Group Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="px-2 mr-2 h-9 w-9"
          >
            <span className="sr-only">Back</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
          </Button>
          <div className="flex items-center flex-grow">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback className="bg-pink-soft text-white">
                {group.emoji || "👪"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-quicksand font-semibold">{group.name}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-3 w-3 mr-1" />
                <span>{group.memberCount || 0} members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-grow p-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className="flex flex-col">
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback className="bg-pink-soft text-white text-xs">
                      {getUserName(message.senderId).substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{getUserName(message.senderId)}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {format(new Date(message.createdAt), 'MMM d, h:mm a')}
                  </span>
                </div>
                <div className="ml-8 bg-gray-100 text-gray-800 rounded-lg p-3">
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Input
            placeholder="Type a message..."
            className="flex-grow mr-2"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="bg-pink-soft hover:bg-pink-600"
            onClick={handleSendMessage}
            disabled={sendMessageMutation.isPending || !messageText.trim()}
          >
            {sendMessageMutation.isPending ? 
              <Loader2 className="h-4 w-4 animate-spin" /> : 
              <Send className="h-4 w-4" />
            }
          </Button>
        </div>
      </div>
    </div>
  );
}