import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CustomIcon } from "@/components/custom-icon";
import { BottomNavigationBar } from "@/components/bottom-navigation-bar";
import { ArrowLeft, User, Calendar, MapPin, Heart, MessageCircle, Users, Shield, Settings } from "lucide-react";

// Mock data types
interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  isRead: boolean;
}

interface Follower {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
}

interface Activity {
  id: number;
  type: 'post' | 'comment' | 'like' | 'group';
  content: string;
  time: string;
}

export default function ProfilePage() {
  const { user } = useSimpleAuth();
  const [_, setLocation] = useLocation();

  import { useUser } from "@clerk/clerk-react"; // ⬅ already added at the top

const clerk = useUser();

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");

useEffect(() => {
  if (clerk.user) {
    setFullName(clerk.user.fullName || "");
    setEmail(clerk.user.primaryEmailAddress?.emailAddress || "");
    setUsername(clerk.user.username || "");
  }
}, [clerk.user]);

const [messages, setMessages] = useState<Message[]>([
  // your mock message data...
]);
  
  // Mock data
    {
      id: 1,
      senderId: 101,
      senderName: "Sarah J.",
      senderAvatar: "",
      content: "Hey! I saw your post about sleep training. Would love to chat more about it!",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      senderId: 102,
      senderName: "Jessica M.",
      senderAvatar: "",
      content: "Thanks for your advice on the teething remedies! It really helped us.",
      time: "Yesterday",
      isRead: true
    },
    {
      id: 3,
      senderId: 103,
      senderName: "Alicia T.",
      senderAvatar: "",
      content: "I'm organizing a local mums meetup next week. Would you like to join?",
      time: "3 days ago",
      isRead: true
    }
  ]);
  
  const [followers, setFollowers] = useState<Follower[]>([
    { id: 101, name: "Sarah J.", avatar: "", isVerified: true },
    { id: 102, name: "Jessica M.", avatar: "", isVerified: true },
    { id: 103, name: "Alicia T.", avatar: "", isVerified: false },
    { id: 104, name: "Emma R.", avatar: "", isVerified: true },
    { id: 105, name: "Michelle P.", avatar: "", isVerified: true },
    { id: 106, name: "Kate S.", avatar: "", isVerified: false },
    { id: 107, name: "Laura B.", avatar: "", isVerified: true }
  ]);
  
  const [activities, setActivities] = useState<Ac
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CustomIcon } from "@/components/custom-icon";
import { BottomNavigationBar } from "@/components/bottom-navigation-bar";
import { ArrowLeft, User, Calendar, MapPin, Heart, MessageCircle, Users, Shield, Settings } from "lucide-react";

// Mock data types
interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  isRead: boolean;
}

interface Follower {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
}

interface Activity {
  id: number;
  type: 'post' | 'comment' | 'like' | 'group';
  content: string;
  time: string;
}

export default function ProfilePage() {
  const { user } = useSimpleAuth();
  const [_, setLocation] = useLocation();
  
  // Mock data
    {
      id: 1,
      senderId: 101,
      senderName: "Sarah J.",
      senderAvatar: "",
      content: "Hey! I saw your post about sleep training. Would love to chat more about it!",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      senderId: 102,
      senderName: "Jessica M.",
      senderAvatar: "",
      content: "Thanks for your advice on the teething remedies! It really helped us.",
      time: "Yesterday",
      isRead: true
    },
    {
      id: 3,
      senderId: 103,
      senderName: "Alicia T.",
      senderAvatar: "",
      content: "I'm organizing a local mums meetup next week. Would you like to join?",
      time: "3 days ago",
      isRead: true
    }
  ]);
  
  const [followers, setFollowers] = useState<Follower[]>([
    { id: 101, name: "Sarah J.", avatar: "", isVerified: true },
    { id: 102, name: "Jessica M.", avatar: "", isVerified: true },
    { id: 103, name: "Alicia T.", avatar: "", isVerified: false },
    { id: 104, name: "Emma R.", avatar: "", isVerified: true },
    { id: 105, name: "Michelle P.", avatar: "", isVerified: true },
    { id: 106, name: "Kate S.", avatar: "", isVerified: false },
    { id: 107, name: "Laura B.", avatar: "", isVerified: true }
  ]);
  
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, type: 'post', content: "Shared a story about first steps", time: "2 days ago" },
    { id: 2, type: 'comment', content: "Commented on \"Managing work and motherhood\"", time: "4 days ago" },
    { id: 3, type: 'like', content: "Liked \"Tips for healthy baby snacks\"", time: "5 days ago" },
    { id: 4, type: 'group', content: "Joined the \"Toddler Activities\" group", time: "1 week ago" }
  ]);
  
  // Stats
  const stats = {
    posts: 12,
    followers: followers.length,
    following: 23,
    likes: 47,
    joined: "March 2023"
  };
  
  const handleBack = () => {
    setLocation("/");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-pink-600">My Profile</h1>
        </div>
      </header>
      
      <main className="flex-grow pt-6 pb-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-2 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-28 bg-gradient-to-r from-pink-200 to-pink-300 rounded-t-lg"></div>
                <div className="absolute -bottom-12 left-6">
                  <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage src={user?.avatar || ""} alt={user?.displayName} />
                    <AvatarFallback className="bg-pink-200 text-pink-700 text-xl">
                      {user?.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute top-4 right-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white"
                    onClick={() => setLocation("/settings")}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="pt-14 px-6 pb-6">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold">{user?.displayName}</h2>
                    {user?.memberType === "verified" && (
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-500">@{user?.username}</p>
                  
                  <p className="mt-3 text-gray-700">
                    Proud mum of two little ones. Passionate about creating a supportive community for parents.
                  </p>
                  
                  <div className="flex items-center text-gray-500 text-sm mt-3 space-x-4">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Sydney, Australia
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {stats.joined}
                    </span>
                  </div>
                  
                  <div className="flex space-x-6 mt-4">
                    <div>
                      <p className="font-bold">{stats.posts}</p>
                      <p className="text-gray-500 text-sm">Posts</p>
                    </div>
                    <div>
                      <p className="font-bold">{stats.followers}</p>
                      <p className="text-gray-500 text-sm">Followers</p>
                    </div>
                    <div>
                      <p className="font-bold">{stats.following}</p>
                      <p className="text-gray-500 text-sm">Following</p>
                    </div>
                    <div>
                      <p className="font-bold">{stats.likes}</p>
                      <p className="text-gray-500 text-sm">Likes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs */}
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>
                    Messages from other members in the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-3 rounded-lg ${message.isRead ? 'bg-white' : 'bg-pink-50'} border border-gray-200 hover:shadow-sm transition-shadow`}
                      >
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-pink-200 text-pink-700">
                              {message.senderName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{message.senderName}</h4>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">{message.content}</p>
                            <div className="mt-2 flex gap-2">
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Reply
                              </Button>
                              {!message.isRead && (
                                <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No messages yet</p>
                      <p className="text-xs text-gray-400 mt-1">When someone messages you, they'll appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Followers Tab */}
            <TabsContent value="followers">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Your Followers</CardTitle>
                  <CardDescription>
                    People who follow your posts and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {followers.map((follower) => (
                      <div key={follower.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-blue-200 text-blue-700">
                            {follower.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">{follower.name}</h4>
                            {follower.isVerified && (
                              <Badge variant="outline" className="ml-2 py-0 h-5 bg-green-50 text-green-700 border-green-200">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent interactions in the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-0">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full mr-3 ${
                            activity.type === 'post' ? 'bg-blue-100 text-blue-600' : 
                            activity.type === 'comment' ? 'bg-purple-100 text-purple-600' : 
                            activity.type === 'like' ? 'bg-red-100 text-red-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {activity.type === 'post' ? <MessageCircle className="h-4 w-4" /> : 
                             activity.type === 'comment' ? <MessageCircle className="h-4 w-4" /> : 
                             activity.type === 'like' ? <Heart className="h-4 w-4" /> :
                             <Users className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm">{activity.content}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <BottomNavigationBar activeRoute="/profile" />
    </div>
  );
}