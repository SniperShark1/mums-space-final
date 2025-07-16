import { useState } from "react";
import { User, Group } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { BookOpen, Heart, MessageCircle, Plus, Shield, ThumbsUp, Users } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Mock story data type
interface Story {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
  isVerifiedOnly: boolean;
  likes: number;
  comments: StoryComment[];
}

interface StoryComment {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
}

interface GroupStoriesProps {
  group: Group;
  onBack: () => void;
}

export function GroupStories({ group, onBack }: GroupStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyContent, setStoryContent] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  
  // Mock user data - in a real app, this would come from a database
  const users = {
    0: { id: 0, displayName: "Admin", avatar: null, isVerified: true },
    1: { id: 1, displayName: "Sarah", avatar: null, isVerified: true },
    2: { id: 2, displayName: "Emma", avatar: null, isVerified: true },
    3: { id: 3, displayName: "Jessica", avatar: null, isVerified: false },
    4: { id: 4, displayName: "Ashley", avatar: null, isVerified: true },
    5: { id: 5, displayName: "Rebecca", avatar: null, isVerified: false }
  };
  
  // Mock stories for different age groups
  const mockStories: Record<string, Story[]> = {
    newborn: [
      {
        id: 1,
        userId: 1,
        title: "Sleep regression at 4 months",
        content: "My baby was sleeping 6-hour stretches until we hit the 4-month mark. Now she's waking every hour! I'm exhausted and don't know what to do. Has anyone gone through this and found solutions?",
        createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        isVerifiedOnly: false,
        likes: 13,
        comments: [
          {
            id: 1,
            userId: 2,
            content: "We went through the same thing! It's the 4-month sleep regression and it's awful but temporary. We implemented a solid bedtime routine and used white noise, which helped a bit. Just know it will pass!",
            createdAt: new Date(Date.now() - 86400000 * 1.5)
          },
          {
            id: 2,
            userId: 4,
            content: "Have you considered sleep training? We used the Ferber method and it worked wonders for us after a few challenging nights.",
            createdAt: new Date(Date.now() - 86400000)
          }
        ]
      },
      {
        id: 2,
        userId: 3,
        title: "Struggling with breastfeeding",
        content: "My baby is 3 weeks old and I'm having trouble with breastfeeding. It's painful and I'm not sure if she's getting enough milk. I really want to make it work but I'm starting to feel defeated. Any advice from moms who overcame early breastfeeding challenges?",
        createdAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
        isVerifiedOnly: true,
        likes: 8,
        comments: [
          {
            id: 3,
            userId: 1,
            content: "Please see a lactation consultant if you can! I was struggling similarly and one session made all the difference. They can check your latch and give personalized advice. Hang in there, mama!",
            createdAt: new Date(Date.now() - 86400000 * 0.8)
          }
        ]
      }
    ],
    toddler: [
      {
        id: 3,
        userId: 2,
        title: "Potty training resistance",
        content: "My 3-year-old absolutely refuses to use the potty. We've tried everything - sticker charts, special underwear, books about potty training. Nothing works! He'll sit on it but never actually goes, then asks for a diaper when he needs to go. Any advice?",
        createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
        isVerifiedOnly: false,
        likes: 15,
        comments: [
          {
            id: 4,
            userId: 4,
            content: "My son was the same way! What worked for us was taking a break for a couple of months and trying again. Sometimes they're just not ready yet, and that's okay. When we tried again later, it clicked almost immediately.",
            createdAt: new Date(Date.now() - 86400000 * 2.7)
          }
        ]
      },
      {
        id: 4,
        userId: 4,
        title: "Toddler won't eat vegetables",
        content: "My 2-year-old has suddenly decided she hates all vegetables. She used to eat them, but now she just pushes them away or throws them on the floor. I'm worried about her nutrition. How can I get her to eat veggies again?",
        createdAt: new Date(Date.now() - 86400000 * 0.5), // 12 hours ago
        isVerifiedOnly: true,
        likes: 9,
        comments: [
          {
            id: 5,
            userId: 1,
            content: "Try hiding them in other foods! I blend spinach into smoothies, add grated carrots to pasta sauce, and make zucchini muffins. My toddler has no idea she's eating vegetables!",
            createdAt: new Date(Date.now() - 86400000 * 0.4)
          },
          {
            id: 6,
            userId: 5,
            content: "It helped us to involve our toddler in cooking. She's more likely to try something she helped prepare. Also, keep offering without pressure - sometimes it takes 10-15 exposures before they'll try something new!",
            createdAt: new Date(Date.now() - 86400000 * 0.3)
          }
        ]
      }
    ],
    school: [
      {
        id: 5,
        userId: 5,
        title: "Homework battles every night",
        content: "My 8-year-old fights me on homework every single night. It's becoming a major source of stress in our relationship, and what should take 20 minutes ends up taking over an hour with tears and frustration. How do you handle homework with resistant kids?",
        createdAt: new Date(Date.now() - 86400000 * 4), // 4 days ago
        isVerifiedOnly: false,
        likes: 20,
        comments: [
          {
            id: 7,
            userId: 1,
            content: "We implemented a 'work first, play later' system with clear boundaries. Homework happens right after an after-school snack, before any screen time or playtime. Also, a visual timer helped my son see how much time was left.",
            createdAt: new Date(Date.now() - 86400000 * 3.8)
          }
        ]
      }
    ],
    teen: [
      {
        id: 6, 
        userId: 1,
        title: "Teen constantly on phone",
        content: "My 15-year-old is glued to her phone from the moment she wakes up until bedtime. We've tried setting limits, but it always results in huge arguments. I'm worried about how this is affecting her mental health and social development. How are other parents handling screen time with teens?",
        createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
        isVerifiedOnly: false,
        likes: 32,
        comments: [
          {
            id: 8,
            userId: 2,
            content: "Instead of focusing on time limits, we focused on certain phone-free times and spaces - like during dinner, family activities, and in bedrooms overnight. It worked better than a straight time limit and caused fewer arguments.",
            createdAt: new Date(Date.now() - 86400000 * 4.7)
          }
        ]
      }
    ],
    adult: [
      {
        id: 7,
        userId: 2,
        title: "Empty nest syndrome hitting hard",
        content: "My youngest just left for university, and I'm finding the transition to an empty nest much harder than I expected. The house is so quiet, and I feel a bit lost without the daily routine of parenting. How did other mums cope with this big change?",
        createdAt: new Date(Date.now() - 86400000 * 6), // 6 days ago
        isVerifiedOnly: true,
        likes: 28,
        comments: [
          {
            id: 9,
            userId: 4,
            content: "I went through this last year! I found it helpful to reconnect with old hobbies and friends I hadn't had much time for. Also, planning regular video calls with my kids helped, and visiting them at university occasionally (but not too much!).",
            createdAt: new Date(Date.now() - 86400000 * 5.5)
          }
        ]
      }
    ]
  };
  
  // Get stories for the current group
  const stories = mockStories[group.ageGroup as keyof typeof mockStories] || [];
  
  // Filter stories based on active tab
  const filteredStories = stories.filter(story => {
    if (activeTab === "verified-only") {
      return story.isVerifiedOnly;
    }
    return true;
  });
  
  const handleCreateStory = () => {
    // In a real app, this would save to a database
    console.log("Creating story:", { 
      title: storyTitle,
      content: storyContent,
      isVerifiedOnly
    });
    
    // Reset form
    setStoryTitle("");
    setStoryContent("");
    setIsVerifiedOnly(false);
  };
  
  const handleAddComment = (storyId: number) => {
    if (!commentContent.trim()) return;
    
    console.log("Adding comment to story", storyId, commentContent);
    
    // In a real app, this would save the comment to a database
    // For now, let's just update our local state
    if (selectedStory) {
      const updatedStory = {
        ...selectedStory,
        comments: [
          ...selectedStory.comments,
          {
            id: Math.floor(Math.random() * 1000) + 10, // Random ID for mock
            userId: 0, // Current user
            content: commentContent,
            createdAt: new Date()
          }
        ]
      };
      
      setSelectedStory(updatedStory);
      setCommentContent("");
    }
  };
  
  // Get avatar initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Format the story and comment timestamps
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
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
                <BookOpen className="h-3 w-3 mr-1" />
                <span>Stories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stories Content */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {selectedStory ? (
          // Single Story View with Comments
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStory(null)}
                className="px-2 mb-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><path d="m15 18-6-6 6-6"/></svg>
                Back to stories
              </Button>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-pink-soft text-white text-xs">
                      {getInitials(users[selectedStory.userId as keyof typeof users]?.displayName || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">
                        {users[selectedStory.userId as keyof typeof users]?.displayName || "User"}
                      </span>
                      {users[selectedStory.userId as keyof typeof users]?.isVerified && (
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                          <Shield className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatTimeAgo(selectedStory.createdAt)}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-quicksand font-bold mb-2">{selectedStory.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap mb-4">{selectedStory.content}</p>
                
                <div className="flex items-center text-gray-500 text-sm">
                  <Button variant="ghost" size="sm" className="text-gray-500 flex items-center gap-1 font-normal">
                    <Heart className="h-4 w-4" />
                    {selectedStory.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 flex items-center gap-1 font-normal">
                    <MessageCircle className="h-4 w-4" />
                    {selectedStory.comments.length}
                  </Button>
                  {selectedStory.isVerifiedOnly && (
                    <div className="ml-auto flex items-center">
                      <Shield className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-blue-600 text-xs">Verified mums only</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                <h3 className="font-quicksand font-semibold text-gray-700">Comments ({selectedStory.comments.length})</h3>
                
                {selectedStory.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="bg-pink-soft text-white text-xs">
                          {getInitials(users[comment.userId as keyof typeof users]?.displayName || "User")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-sm">
                            {users[comment.userId as keyof typeof users]?.displayName || "User"}
                          </span>
                          {users[comment.userId as keyof typeof users]?.isVerified && (
                            <Shield className="h-3 w-3 ml-1 text-blue-500" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-pink-soft text-white text-xs">
                    {getInitials("You")}
                  </AvatarFallback>
                </Avatar>
                <Input
                  className="flex-grow mr-2"
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment(selectedStory.id);
                    }
                  }}
                />
                <Button 
                  className="bg-pink-soft hover:bg-pink-600"
                  onClick={() => handleAddComment(selectedStory.id)}
                  disabled={!commentContent.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Stories List View
          <div className="flex flex-col flex-grow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All Stories</TabsTrigger>
                    <TabsTrigger value="verified-only">Verified Mums Only</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-pink-soft hover:bg-pink-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Story
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Story</DialogTitle>
                    <DialogDescription>
                      Share your experience with other mums in this group. Your story will be visible to all members.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Input 
                        placeholder="Story Title" 
                        value={storyTitle}
                        onChange={(e) => setStoryTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Textarea 
                        placeholder="Write your story here..." 
                        className="min-h-[150px]"
                        value={storyContent}
                        onChange={(e) => setStoryContent(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="verified-only"
                        checked={isVerifiedOnly}
                        onChange={(e) => setIsVerifiedOnly(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="verified-only" className="text-sm text-gray-700 flex items-center">
                        <Shield className="h-4 w-4 mr-1 text-blue-500" />
                        Visible to verified mums only
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={handleCreateStory}
                      disabled={!storyTitle.trim() || !storyContent.trim()}
                      className="bg-pink-soft hover:bg-pink-600"
                    >
                      Post Story
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {filteredStories.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p>No stories yet in this category</p>
                    <p className="text-sm">Be the first to share your experience!</p>
                  </div>
                ) : (
                  filteredStories.map(story => (
                    <Card 
                      key={story.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedStory(story)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="bg-pink-soft text-white text-xs">
                                {getInitials(users[story.userId as keyof typeof users]?.displayName || "User")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium text-sm">
                                  {users[story.userId as keyof typeof users]?.displayName || "User"}
                                </span>
                                {users[story.userId as keyof typeof users]?.isVerified && (
                                  <Shield className="h-3 w-3 ml-1 text-blue-500" />
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{formatTimeAgo(story.createdAt)}</span>
                            </div>
                          </div>
                          {story.isVerifiedOnly && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Shield className="h-3 w-3 mr-1" /> Verified
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg mt-2 font-quicksand">{story.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 text-sm line-clamp-3">{story.content}</p>
                      </CardContent>
                      <CardFooter className="pt-0 flex text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <Heart className="h-4 w-4 mr-1" />
                          {story.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {story.comments.length}
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}