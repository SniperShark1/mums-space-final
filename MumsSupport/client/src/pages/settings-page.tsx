import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { useTheme, ThemeOption, themeNames } from "@/hooks/use-theme";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Shield, 
  Moon, 
  Palette, 
  User, 
  LogOut,
  Smartphone,
  CheckCircle
} from "lucide-react";
import { CustomIcon } from "@/components/custom-icon";

export default function SettingsPage() {
  const { user, logout } = useSimpleAuth();
  const { theme, setTheme } = useTheme();
  const [_, setLocation] = useLocation();
  
  // Settings state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('mumsNotifications');
    return saved ? JSON.parse(saved) : {
      newMessages: true,
      commentReplies: true,
      postLikes: false,
      communityUpdates: true
    };
  });
  
  const [privacySettings, setPrivacySettings] = useState(() => {
    const saved = localStorage.getItem('mumsPrivacySettings');
    return saved ? JSON.parse(saved) : {
      shareLocation: false,
      broadcastSOS: false,
      visibleProfile: true,
      publicComments: true
    };
  });
  
  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('mumsNotifications', JSON.stringify(notifications));
  }, [notifications]);
  
  useEffect(() => {
    localStorage.setItem('mumsPrivacySettings', JSON.stringify(privacySettings));
  }, [privacySettings]);
  
  // Toggle handlers
  const toggleNotification = (key: string) => {
    setNotifications((prev: Record<string, boolean>) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const togglePrivacy = (key: string) => {
    setPrivacySettings((prev: Record<string, boolean>) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleBack = () => {
    setLocation("/");
  };
  
  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
  };
  
  const handleLogout = () => {
    logout();
    setLocation("/auth");
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
          <h1 className="text-xl font-bold text-pink-600">Settings</h1>
        </div>
      </header>
      
      <main className="flex-grow pt-6 pb-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Account Section */}
          <Card>
            <CardHeader className="bg-pink-50 rounded-t-lg pb-2">
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account
              </CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Information</p>
                  <p className="text-sm text-gray-500">Your display name, email and profile photo</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert("This would open profile edit")}>
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-gray-500">Change your login password</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert("This would open password change")}>
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Privacy & Safety Section */}
          <Card>
            <CardHeader className="bg-pink-50 rounded-t-lg pb-2">
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy & Safety
              </CardTitle>
              <CardDescription>
                Control your privacy settings and safety features
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-sm text-gray-500">Make your profile visible to other members</p>
                </div>
                <Switch 
                  checked={privacySettings.visibleProfile}
                  onCheckedChange={() => togglePrivacy('visibleProfile')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Comments</p>
                  <p className="text-sm text-gray-500">Allow others to see your comments on posts</p>
                </div>
                <Switch 
                  checked={privacySettings.publicComments}
                  onCheckedChange={() => togglePrivacy('publicComments')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share Location</p>
                  <p className="text-sm text-gray-500">Allow the app to use your location for nearby services</p>
                </div>
                <Switch 
                  checked={privacySettings.shareLocation}
                  onCheckedChange={() => togglePrivacy('shareLocation')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium flex items-center">
                    <CustomIcon name="flower" size="sm" className="mr-1" />
                    Highlighted Post Location
                  </p>
                  <p className="text-sm text-gray-500">Share your approximate location with highlighted flower posts</p>
                </div>
                <Switch 
                  checked={privacySettings.broadcastSOS}
                  onCheckedChange={() => togglePrivacy('broadcastSOS')}
                />
              </div>
              
              <div className="p-3 bg-pink-50 border border-pink-200 rounded-md text-sm">
                <p className="font-medium mb-1 flex items-center">
                  <CustomIcon name="flower" size="sm" className="mr-1" />
                  Safety Feature: Disguised SOS
                </p>
                <p>The flower icon is a <strong>disguised emergency SOS button</strong> for your safety. It looks innocent to others but alerts our community when you need help.</p>
                <p className="mt-1">When enabled and used, it shares your general area with nearby trusted members who can provide support, while appearing as a regular "highlighted" post to anyone looking over your shoulder.</p>
                <p className="mt-1">Your exact address is never shared. This feature was designed to help members in potentially unsafe situations get help discreetly.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Notifications Section */}
          <Card>
            <CardHeader className="bg-pink-50 rounded-t-lg pb-2">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Messages</p>
                  <p className="text-sm text-gray-500">Get notified when you receive a new message</p>
                </div>
                <Switch 
                  checked={notifications.newMessages}
                  onCheckedChange={() => toggleNotification('newMessages')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Comment Replies</p>
                  <p className="text-sm text-gray-500">Get notified when someone replies to your comment</p>
                </div>
                <Switch 
                  checked={notifications.commentReplies}
                  onCheckedChange={() => toggleNotification('commentReplies')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Post Likes</p>
                  <p className="text-sm text-gray-500">Get notified when someone likes your post</p>
                </div>
                <Switch 
                  checked={notifications.postLikes}
                  onCheckedChange={() => toggleNotification('postLikes')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Community Updates</p>
                  <p className="text-sm text-gray-500">Get notified about community news and events</p>
                </div>
                <Switch 
                  checked={notifications.communityUpdates}
                  onCheckedChange={() => toggleNotification('communityUpdates')}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Appearance Section */}
          <Card>
            <CardHeader className="bg-pink-50 rounded-t-lg pb-2">
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the app looks
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={(value) => handleThemeChange(value as ThemeOption)}>
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themeNames).map(([key, name]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Enable dark mode for night time viewing</p>
                </div>
                <Switch 
                  checked={theme === 'dark-mode'}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // Store current theme before switching to dark mode
                      const previousTheme = theme === 'dark-mode' ? 'pink' : theme;
                      localStorage.setItem('previous-theme', previousTheme);
                      setTheme('dark-mode');
                    } else {
                      // Return to previous theme if stored, otherwise default to pink
                      const previousTheme = localStorage.getItem('previous-theme') || 'pink';
                      setTheme(previousTheme as ThemeOption);
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Logout & Support */}
          <div className="pt-6 space-y-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full flex items-center justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              <p>Need help? <a href="#" className="text-pink-600 hover:underline">Contact Support</a></p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button 
            className="flex flex-col items-center text-gray-500 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setLocation("/")}
          >
            <CustomIcon name="home" size="md" className="mb-1" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            className="flex flex-col items-center text-gray-500 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => alert("Groups would open here")}
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
            className="flex flex-col items-center text-gray-500 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => alert("Messages would open here")}
          >
            <CustomIcon name="messages" size="md" className="mb-1" />
            <span className="text-xs">Messages</span>
          </button>
          <button 
            className="flex flex-col items-center text-pink-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setLocation("/settings")}
          >
            <CustomIcon name="settings" size="md" className="mb-1" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}