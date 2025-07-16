import { useState } from "react";
import { useLocation } from "wouter";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, CheckCircle, Image, Smile, Upload } from "lucide-react";
import { CustomIcon, IconName } from "@/components/custom-icon";

export default function CreateStoryPage() {
  const { user } = useSimpleAuth();
  const [_, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [storyType, setStoryType] = useState<"regular" | "moment" | "question">("regular");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [isSOS, setIsSOS] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  
  const feelings: Array<{name: IconName, displayName: string}> = [
    { name: "happy", displayName: "Happy" },
    { name: "tired", displayName: "Tired" },
    { name: "sad", displayName: "Sad" },
    { name: "frustrated", displayName: "Frustrated" },
    { name: "relieved", displayName: "Relieved" },
    { name: "loved", displayName: "Loved" },
    { name: "exhausted", displayName: "Exhausted" },
    { name: "confused", displayName: "Confused" },
    { name: "amused", displayName: "Amused" },
    { name: "proud", displayName: "Proud" },
    { name: "overwhelmed", displayName: "Overwhelmed" },
    { name: "anxious", displayName: "Anxious" },
  ];
  
  const handleBack = () => {
    setLocation("/");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStory = {
      title: title,
      content: content,
      feeling: feeling,
      storyType: storyType,
      isAnonymous: isAnonymous,
      isVerifiedOnly: isVerifiedOnly,
      isSOS: isSOS
    };
    
    // Use the global addNewPost function we defined in simple-home-page.tsx
    // @ts-ignore
    if (typeof window.addNewPost === 'function') {
      // @ts-ignore
      window.addNewPost(newStory);
      
      // Show a success toast
      alert(`${storyType === "regular" ? "Story" : storyType === "moment" ? "Moment" : "Question"} posted successfully!`);
      
      // Navigate back to home
      setLocation("/");
    } else {
      alert("Error: Could not add post. Please try again.");
    }
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
          <h1 className="text-xl font-bold text-pink-600">Create Story</h1>
        </div>
      </header>
    
      <main className="flex-grow pt-6 pb-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Tabs defaultValue="regular" onValueChange={(value) => setStoryType(value as any)}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="regular" className="text-sm">
                Story
              </TabsTrigger>
              <TabsTrigger value="moment" className="text-sm">
                Quick Moment
              </TabsTrigger>
              <TabsTrigger value="question" className="text-sm">
                Ask a Question
              </TabsTrigger>
            </TabsList>
          
            <Card className="border-2 border-pink-100">
              <CardHeader className="bg-pink-50 rounded-t-lg pb-2">
                <CardTitle className="font-quicksand text-xl">
                  {storyType === "regular" && "Share Your Story"}
                  {storyType === "moment" && "Share a Quick Moment"}
                  {storyType === "question" && "Ask the Community"}
                </CardTitle>
                <CardDescription>
                  {storyType === "regular" && "Share your experiences with other parents"}
                  {storyType === "moment" && "Quickly share what's happening right now"}
                  {storyType === "question" && "Get advice and support from the community"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title" 
                        placeholder={
                          storyType === "regular" ? "My Journey as a New Mom" : 
                          storyType === "moment" ? "Caught my baby's first smile today!" : 
                          "Any tips for managing toddler tantrums?"
                        }
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea 
                        id="content" 
                        placeholder="Share your story or question here..."
                        className="min-h-[150px]"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-6 pt-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="anonymous" 
                          checked={isAnonymous}
                          onCheckedChange={setIsAnonymous}
                        />
                        <Label htmlFor="anonymous" className="cursor-pointer">Post Anonymously</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="verified-only" 
                          checked={isVerifiedOnly}
                          onCheckedChange={setIsVerifiedOnly}
                        />
                        <Label htmlFor="verified-only" className="cursor-pointer">Verified Members Only</Label>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4 border-t border-gray-100 pt-4">
                      {/* Display selected feeling if one is chosen */}
                      {feeling && (
                        <div className="flex items-center bg-pink-50 rounded-full px-3 py-1 text-sm text-pink-600 border border-pink-200">
                          <CustomIcon 
                            name={feeling.split(":")[0] as IconName} 
                            size="sm" 
                            className="mr-1"
                          />
                          <span>{feeling.split(":")[1]}</span>
                          <button 
                            className="ml-2 text-pink-400 hover:text-pink-600"
                            onClick={() => setFeeling(null)}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    
                      <Button type="button" variant="outline" size="sm" className="flex items-center">
                        <Image className="mr-1 h-4 w-4" />
                        Add Photo
                      </Button>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            type="button" 
                            variant={feeling ? "default" : "outline"} 
                            size="sm" 
                            className={`flex items-center ${feeling ? "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200" : ""}`}
                          >
                            <Smile className="mr-1 h-4 w-4" />
                            {feeling ? "Change Feeling" : "Add Feeling"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-2">
                          <div className="text-sm font-medium mb-2 text-pink-700">How are you feeling?</div>
                          <div className="grid grid-cols-4 gap-2">
                            {feelings.map((item, index) => (
                              <button
                                key={index}
                                className="flex flex-col items-center justify-center p-2 rounded hover:bg-pink-50 transition-colors"
                                onClick={() => {
                                  setFeeling(`${item.name}:${item.displayName}`);
                                }}
                              >
                                <CustomIcon name={item.name} size="md" className="mb-1" />
                                <span className="text-xs">{item.displayName}</span>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      {storyType === "regular" && (
                        <Button 
                          type="button" 
                          variant={isSOS ? "default" : "outline"} 
                          size="sm" 
                          className={`flex items-center ${isSOS ? "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200" : ""}`}
                          onClick={() => setIsSOS(!isSOS)}
                        >
                          <CustomIcon name="flower" size="sm" className="mr-1" />
                          {isSOS ? "Remove Highlight" : "Highlight Post"}
                        </Button>
                      )}
                      
                      {isSOS && (
                        <div className="w-full mt-2 p-3 bg-pink-50 border border-pink-200 rounded-md text-sm text-pink-800">
                          <p className="font-medium mb-1 flex items-center">
                            <CustomIcon name="flower" size="sm" className="mr-1" /> 
                            Highlighted Post Notice
                          </p>
                          <p>Your post will receive special attention from community members in your area who can offer support.</p>
                          
                          {!hasConsented ? (
                            <>
                              <p className="mt-1">Do you allow us to share your general location with trusted parents nearby?</p>
                              <div className="flex space-x-3 mt-2">
                                <Button 
                                  type="button"
                                  variant="outline" 
                                  size="sm"
                                  className="bg-white text-pink-700 border-pink-300 hover:bg-pink-50 flex-1"
                                  onClick={() => setIsSOS(false)}
                                >
                                  No, cancel
                                </Button>
                                <Button 
                                  type="button"
                                  variant="default" 
                                  size="sm"
                                  className="bg-pink-600 hover:bg-pink-700 text-white flex-1"
                                  onClick={() => setHasConsented(true)}
                                >
                                  Yes, I consent
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center mt-2 text-green-600">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              <p>Thank you for your consent. Your general location will be shared with trusted parents.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-pink-500 hover:bg-pink-600"
                      >
                        {storyType === "regular" ? "Share Story" : 
                         storyType === "moment" ? "Share Moment" : 
                         "Ask Question"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="bg-pink-50 rounded-b-lg flex-col items-start pt-3 pb-5">
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Your post will be reviewed by our community guidelines.</p>
                  <p>Remember to be respectful and supportive of other parents.</p>
                  {isVerifiedOnly && (
                    <p className="text-pink-600 font-medium">
                      Only verified members will be able to see and respond to this post.
                    </p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </Tabs>
        </div>
      </main>
    </div>
  );
}