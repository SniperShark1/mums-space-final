import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CustomIcon } from "@/components/custom-icon";
import { BottomNavigationBar } from "@/components/bottom-navigation-bar";
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  AlertTriangle, 
  Shield,
  User,
  Users,
  MessageCircle
} from "lucide-react";

// Mock data types
interface ChatMessage {
  id: number;
  userId: number | null; // null for AI/system messages
  username: string;
  avatar: string | null;
  content: string;
  timestamp: Date;
  isVerified?: boolean;
  isAI?: boolean;
  isSystem?: boolean;
}

interface ChatRoom {
  id: number;
  name: string;
  description: string;
  participants: number;
  isModerated: boolean;
}

export default function ChatRoomPage() {
  const { user } = useSimpleAuth();
  const [_, setLocation] = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Chat room data
  const [currentRoom, setCurrentRoom] = useState<ChatRoom>({
    id: 1,
    name: "Parenting Support",
    description: "A safe space to discuss parenting challenges and get support",
    participants: 24,
    isModerated: true
  });
  
  // Message state
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      userId: null,
      username: "MumsHelper AI",
      avatar: null,
      content: "Welcome to the Parenting Support chat room! I'm here to help answer questions and ensure our community guidelines are followed. Remember to be respectful and supportive of other parents.",
      timestamp: new Date(Date.now() - 60000 * 20),
      isAI: true
    },
    {
      id: 2,
      userId: 102,
      username: "Jessica M.",
      avatar: null,
      content: "Hi everyone! My 2-year-old is having trouble sleeping through the night. Any suggestions?",
      timestamp: new Date(Date.now() - 60000 * 15),
      isVerified: true
    },
    {
      id: 3,
      userId: 103,
      username: "Sarah J.",
      avatar: null,
      content: "We went through that too! Have you tried a consistent bedtime routine? Reading a book and then playing white noise helped us a lot.",
      timestamp: new Date(Date.now() - 60000 * 10),
      isVerified: true
    },
    {
      id: 4,
      userId: null,
      username: "MumsHelper AI",
      avatar: null,
      content: "Great suggestions, Sarah! Studies show that consistent bedtime routines can help children sleep better. Also, limiting screen time before bed and making sure the room is dark and cool can help.",
      timestamp: new Date(Date.now() - 60000 * 5),
      isAI: true
    }
  ]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleBack = () => {
    setLocation("/");
  };
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      userId: user?.id || 0,
      username: user?.displayName || "Anonymous",
      avatar: user?.avatar || null,
      content: messageInput,
      timestamp: new Date(),
      isVerified: user?.memberType === "verified"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageInput("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      handleAIResponse(messageInput);
    }, 1000);
  };
  
  const handleAIResponse = (userMessage: string) => {
    // Simple rule-based responses - this would be replaced with actual AI integration
    let aiResponse: string;
    
    const lowercaseMsg = userMessage.toLowerCase();
    
    if (lowercaseMsg.includes("hello") || lowercaseMsg.includes("hi ")) {
      aiResponse = "Hello! Welcome to the chat. How can I help with your parenting journey today?";
    } else if (lowercaseMsg.includes("sleep") || lowercaseMsg.includes("nap") || lowercaseMsg.includes("bedtime")) {
      aiResponse = "Sleep challenges are common! Consistent bedtime routines, a comfortable sleep environment, and age-appropriate nap schedules can help. Would you like more specific tips?";
    } else if (lowercaseMsg.includes("feed") || lowercaseMsg.includes("eat") || lowercaseMsg.includes("food")) {
      aiResponse = "Nutrition is so important for growing little ones! For picky eaters, try offering a variety of healthy options and involve them in food preparation. The Australian dietary guidelines recommend 5 serves of vegetables and 2 of fruit daily for most children.";
    } else if (lowercaseMsg.includes("tantrum") || lowercaseMsg.includes("behavior") || lowercaseMsg.includes("discipline")) {
      aiResponse = "Behavioral challenges can be tough. Staying calm, setting clear boundaries, and using positive reinforcement often works well. Remember that tantrums are often a child's way of expressing emotions they don't have words for yet.";
    } else if (lowercaseMsg.includes("thank")) {
      aiResponse = "You're very welcome! I'm here to help anytime you need support or information.";
    } else {
      aiResponse = "Thank you for sharing. Would anyone else in the chat like to offer their experience or suggestions? Remember that what works for one family may not work for everyone.";
    }
    
    const aiMessage: ChatMessage = {
      id: messages.length + 2,
      userId: null,
      username: "MumsHelper AI",
      avatar: null,
      content: aiResponse,
      timestamp: new Date(),
      isAI: true
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };
  
  // Format timestamp to readable format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm py-4 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-pink-600 flex items-center">
              {currentRoom.name}
              {currentRoom.isModerated && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  AI Moderated
                </Badge>
              )}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>{currentRoom.participants} participants</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow overflow-hidden bg-gray-50 flex flex-col">
        <Card className="flex flex-col h-full mx-auto max-w-3xl m-4 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>{currentRoom.name}</CardTitle>
            <CardDescription>{currentRoom.description}</CardDescription>
            <div className="bg-blue-50 border border-blue-100 rounded p-2 text-sm text-blue-700 mt-2 flex items-start">
              <Bot className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">MumsHelper AI is monitoring this chat</p>
                <p>I'm here to answer questions, provide resources, and ensure a supportive environment. All conversations are private among members.</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      {message.isAI ? (
                        <div className="bg-blue-100 h-full w-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-blue-700" />
                        </div>
                      ) : message.isSystem ? (
                        <div className="bg-gray-100 h-full w-full flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-gray-700" />
                        </div>
                      ) : (
                        <AvatarFallback className="bg-pink-100 text-pink-700">
                          {message.username.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium text-sm ${message.isAI ? 'text-blue-700' : message.isSystem ? 'text-gray-700' : 'text-gray-900'}`}>
                          {message.username}
                        </p>
                        {message.isVerified && (
                          <Badge variant="outline" className="h-5 py-0 bg-green-50 text-green-700 border-green-200">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      </div>
                      <div className={`mt-1 text-sm p-2 rounded-lg ${
                        message.isAI 
                          ? 'bg-blue-50 text-blue-900' 
                          : message.isSystem 
                            ? 'bg-gray-100 text-gray-700' 
                            : 'bg-white border border-gray-200 text-gray-800'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="border-t p-3">
            <form 
              className="flex w-full gap-2" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
      
      <BottomNavigationBar activeRoute="/chat" />
    </div>
  );
}