import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { SOSButton } from "@/components/sos-button";
import { Message, User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Send, Search, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  // Fetch messages
  const { 
    data: messages, 
    isLoading, 
    error 
  } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { receiverId: number; content: string }) => {
      const res = await apiRequest("POST", "/api/messages", messageData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      setMessageText("");
    },
  });

  // Helper function to get unique conversations
  const getUniqueConversations = () => {
    if (!messages || !user) return [];
    
    const userIds = new Set<number>();
    const conversations: { userId: number; lastMessage: Message }[] = [];
    
    messages.forEach(message => {
      const otherId = message.senderId === user.id ? message.receiverId : message.senderId;
      
      if (!userIds.has(otherId)) {
        userIds.add(otherId);
        conversations.push({ userId: otherId, lastMessage: message });
      } else {
        // Update with most recent message
        const convo = conversations.find(c => c.userId === otherId);
        if (convo && new Date(message.createdAt) > new Date(convo.lastMessage.createdAt)) {
          convo.lastMessage = message;
        }
      }
    });
    
    // Sort by most recent message
    return conversations.sort((a, b) => {
      const dateA = a.lastMessage.createdAt ? new Date(a.lastMessage.createdAt) : new Date();
      const dateB = b.lastMessage.createdAt ? new Date(b.lastMessage.createdAt) : new Date();
      return dateB.getTime() - dateA.getTime();
    });
  };

  // Filter conversations by search term
  const filteredConversations = getUniqueConversations().filter(convo => {
    // In a real app, you would have user info to search against
    return searchTerm === "" || convo.userId.toString().includes(searchTerm);
  });

  // Get messages for the active conversation
  const activeConversationMessages = messages?.filter(message => 
    (message.senderId === user?.id && message.receiverId === activeChat) ||
    (message.receiverId === user?.id && message.senderId === activeChat)
  ).sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
    return dateA.getTime() - dateB.getTime();
  });

  // Handle send message
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChat) return;
    
    sendMessageMutation.mutate({
      receiverId: activeChat,
      content: messageText
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16 pb-20 app-background">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-quicksand font-bold text-gray-800 mb-6">Messages</h1>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-220px)]">
              {/* Conversation List */}
              <div className="border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      className="pl-10"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(100vh-280px)]">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin text-pink-soft" />
                    </div>
                  ) : error ? (
                    <div className="text-center py-8 text-red-500">
                      Failed to load messages. Please try again.
                    </div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No messages yet</p>
                    </div>
                  ) : (
                    filteredConversations.map(convo => (
                      <ConversationItem
                        key={convo.userId}
                        userId={convo.userId}
                        lastMessage={convo.lastMessage}
                        isActive={activeChat === convo.userId}
                        onClick={() => setActiveChat(convo.userId)}
                        currentUserId={user?.id || 0}
                      />
                    ))
                  )}
                </ScrollArea>
              </div>

              {/* Message Area */}
              <div className="col-span-2 flex flex-col h-full">
                {!activeChat ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <MessageSquare className="h-16 w-16 text-gray-200 mb-4" />
                    <h3 className="font-quicksand font-semibold text-gray-700 text-lg mb-2">Select a conversation</h3>
                    <p className="text-gray-500 max-w-sm">Choose a conversation from the list or start a new message to connect with other mums</p>
                  </div>
                ) : (
                  <>
                    {/* Conversation Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-pink-soft text-white">
                            {activeChat.toString().substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-quicksand font-semibold">User {activeChat}</h3>
                          <p className="text-xs text-gray-500">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-grow p-4">
                      {activeConversationMessages?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No messages yet. Start the conversation!
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {activeConversationMessages?.map(message => (
                            <MessageBubble
                              key={message.id}
                              message={message}
                              isSentByMe={message.senderId === user?.id}
                            />
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SOSButton />
      <BottomNavigation active="messages" />
    </div>
  );
}

function ConversationItem({ 
  userId, 
  lastMessage, 
  isActive, 
  onClick,
  currentUserId
}: { 
  userId: number; 
  lastMessage: Message; 
  isActive: boolean; 
  onClick: () => void;
  currentUserId: number;
}) {
  const isUnread = !lastMessage.isRead && lastMessage.receiverId === currentUserId;
  
  return (
    <div 
      className={`p-3 hover:bg-gray-50 cursor-pointer border-l-2 ${
        isActive ? 'border-pink-soft bg-gray-50' : 'border-transparent'
      } ${isUnread ? 'font-semibold' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback className="bg-pink-soft text-white">
            {userId.toString().substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex justify-between items-baseline">
            <h4 className="font-quicksand">User {userId}</h4>
            <span className="text-xs text-gray-500">
              {lastMessage.createdAt ? format(new Date(lastMessage.createdAt), 'h:mm a') : ''}
            </span>
          </div>
          <p className={`text-sm truncate ${isUnread ? 'text-gray-900' : 'text-gray-500'}`}>
            {lastMessage.senderId === currentUserId ? 'You: ' : ''}
            {lastMessage.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ 
  message, 
  isSentByMe 
}: { 
  message: Message; 
  isSentByMe: boolean; 
}) {
  return (
    <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[70%] rounded-lg p-3 ${
          isSentByMe ? 'bg-pink-soft text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p>{message.content}</p>
        <div className={`text-xs mt-1 ${isSentByMe ? 'text-white/70' : 'text-gray-500'}`}>
          {message.createdAt ? format(new Date(message.createdAt), 'h:mm a') : ''}
        </div>
      </div>
    </div>
  );
}
