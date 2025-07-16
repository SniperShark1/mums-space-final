import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { SOSButton } from "@/components/sos-button";
import { GroupMessages } from "@/components/group-messages";
import { GroupStories } from "@/components/group-stories";
import { VerificationRequired } from "@/components/verification-required";
import { Group } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Search, MapPin, Baby, ArrowRight, MessageSquare, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("age-groups");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showGroupMessages, setShowGroupMessages] = useState(false);
  const [showGroupStories, setShowGroupStories] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // Fetch groups
  const { 
    data: groups, 
    isLoading, 
    error 
  } = useQuery<Group[]>({
    queryKey: ["/api/groups"],
  });

  // Join group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async (groupId: number) => {
      const res = await apiRequest("POST", `/api/groups/${groupId}/join`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/groups"] });
    },
  });

  // Mock age groups in case the API doesn't return them
  const mockAgeGroups = [
    {
      id: 1,
      name: "Newborn Mums Circle 👶",
      description: "For mothers with newborns and babies (0-2 years). Discussions about sleep training, first foods, and developmental milestones.",
      imageUrl: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Online & Local",
      distance: "Virtual",
      memberCount: 97,
      type: "age-group",
      ageGroup: "newborn",
      emoji: "👶"
    },
    {
      id: 2,
      name: "Toddler Mums Circle 🚼",
      description: "For mothers with toddlers (2-5 years). Share the joys and challenges of the toddler years, from potty training to tantrums and everything in between.",
      imageUrl: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Online",
      distance: "Virtual",
      memberCount: 83,
      type: "age-group",
      ageGroup: "toddler",
      emoji: "🚼"
    },
    {
      id: 3,
      name: "School-age Mums Circle 🎒",
      description: "For mothers with school-age children (5-13 years). Navigate school choices, homework struggles, extracurricular activities, and helping children develop socially.",
      imageUrl: "https://images.unsplash.com/photo-1503676382389-4809596d5290?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Online",
      distance: "Virtual",
      memberCount: 76,
      type: "age-group",
      ageGroup: "school",
      emoji: "🎒"
    },
    {
      id: 4,
      name: "Teen Mums Circle 🎓",
      description: "A safe space for mums raising teenagers (13-18 years) to share experiences, seek advice, and support one another through the teenage years.",
      imageUrl: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Online",
      distance: "Virtual",
      memberCount: 62,
      type: "age-group",
      ageGroup: "teen",
      emoji: "🎓"
    },
    {
      id: 5,
      name: "Adult Children Mums Circle 🏡",
      description: "For mothers with adult children (18+ years). Discuss maintaining relationships with grown children, supporting their independence, and embracing this new chapter.",
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Online",
      distance: "Virtual",
      memberCount: 58,
      type: "age-group",
      ageGroup: "adult",
      emoji: "🏡"
    },
    {
      id: 6,
      name: "Dads Space 👨‍👦",
      description: "A supportive community for dads raising children. Share experiences, get advice, and connect with other fathers on the parenting journey.",
      imageUrl: "https://images.unsplash.com/photo-1450107579224-2d9b2bf1adc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      location: "Online",
      distance: "Virtual",
      memberCount: 42,
      type: "special-group",
      ageGroup: "dads",
      emoji: "👨‍👦"
    }
  ];
  
  // Get all age groups - always use mock data for age groups to ensure they're available
  const ageGroups = mockAgeGroups;
  
  // Get regular groups
  const regularGroups = groups?.filter(group => group.type !== "age-group") || [];

  // Filter groups based on search term, active tab, and selected age group
  const filteredGroups = groups?.filter(group => {
    const matchesSearch = searchTerm === "" || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "age-groups") {
      return matchesSearch && group.type === "age-group";
    }
    
    if (activeTab === "all") {
      return matchesSearch;
    }
    
    if (activeTab === "regular") {
      return matchesSearch && group.type !== "age-group";
    }
    
    if (activeTab === "nearby") {
      return matchesSearch && group.distance && group.distance !== "Virtual";
    }
    
    if (activeTab === "online") {
      return matchesSearch && (!group.distance || group.distance === "Virtual");
    }
    
    if (activeTab === "selected-age-group" && selectedAgeGroup) {
      return group.ageGroup === selectedAgeGroup;
    }
    
    return matchesSearch;
  });

  const handleAgeGroupSelect = (ageGroup: string) => {
    setSelectedAgeGroup(ageGroup);
    setActiveTab("selected-age-group");
    
    // Find the corresponding group
    const group = ageGroups.find(g => g.ageGroup === ageGroup);
    if (group) {
      setSelectedGroup(group);
      setShowGroupMessages(true);
      setShowGroupStories(false);
    } else {
      toast({
        title: "Group not found",
        description: "Sorry, we couldn't find that group.",
        variant: "destructive"
      });
    }
  };
  
  const handleViewChange = (view: 'messages' | 'stories') => {
    if (view === 'messages') {
      setShowGroupMessages(true);
      setShowGroupStories(false);
    } else {
      setShowGroupMessages(false);
      setShowGroupStories(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16 pb-20 app-background">
        <div className="container mx-auto px-4 py-6">
          {activeTab === "selected-age-group" && selectedAgeGroup ? (
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab("age-groups")}
                className="px-0 text-pink-soft hover:text-pink-700 hover:bg-transparent"
              >
                <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
                Back to Circles
              </Button>
              <h1 className="text-2xl font-quicksand font-bold text-gray-800 mt-2">
                {selectedAgeGroup === "newborn" && "Newborn Mums Circle 👶"}
                {selectedAgeGroup === "toddler" && "Toddler Mums Circle 🚼"}
                {selectedAgeGroup === "school" && "School-age Mums Circle 🎒"}
                {selectedAgeGroup === "teen" && "Teen Mums Circle 🎓"}
                {selectedAgeGroup === "adult" && "Adult Children Mums Circle 🏡"}
                {selectedAgeGroup === "dads" && "Dads Space 👨‍👦"}
              </h1>
              <p className="text-gray-600 mt-1">
                {selectedAgeGroup === "newborn" && "For mothers with babies 0-2 years old"}
                {selectedAgeGroup === "toddler" && "For mothers with children 2-5 years old"}
                {selectedAgeGroup === "school" && "For mothers with children 5-13 years old"}
                {selectedAgeGroup === "teen" && "For mothers with teenagers 13-18 years old"}
                {selectedAgeGroup === "adult" && "For mothers with adult children 18+ years old"}
                {selectedAgeGroup === "dads" && "A supportive community for dads raising children of all ages"}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-quicksand font-bold text-gray-800">Mum's Space</h1>
            </div>
          )}

          {activeTab !== "selected-age-group" && (
            <>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10"
                  placeholder="Search groups by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs defaultValue="age-groups" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="age-groups">Parent Circles</TabsTrigger>
                  <TabsTrigger value="all">All Groups</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  <TabsTrigger value="online">Online</TabsTrigger>
                </TabsList>
              </Tabs>
            </>
          )}

          {activeTab === "age-groups" ? (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-quicksand font-semibold text-gray-800 mb-2">Welcome to Mum's Space</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Mum's Space welcomes all parents who lead with love — whether you're a mum, a dad, or a guardian. You belong here.
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto mt-2">
                  Join a circle based on your child's age to connect with others going through similar experiences.
                </p>
              </div>
              
              <VerificationRequired>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ageGroups.map((group) => (
                    <AgeGroupCard
                      key={group.id}
                      group={group}
                      onSelect={() => handleAgeGroupSelect(group.ageGroup || "")}
                    />
                  ))}
                </div>
              </VerificationRequired>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-pink-soft" />
            </div>
          ) : error && activeTab !== "selected-age-group" ? (
            <div className="text-center py-8 text-red-500">
              Failed to load groups. Please try again.
            </div>
          ) : activeTab === "selected-age-group" && selectedGroup ? (
            <>
              {/* Tabs for Message/Stories */}
              <div className="mb-4">
                <Tabs defaultValue="messages" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger 
                      value="messages" 
                      onClick={() => handleViewChange('messages')}
                      className="flex items-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" /> Messages
                    </TabsTrigger>
                    <TabsTrigger 
                      value="stories" 
                      onClick={() => handleViewChange('stories')}
                      className="flex items-center"
                    >
                      <BookOpen className="h-4 w-4 mr-2" /> Stories
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="h-[calc(100vh-300px)]">
                <VerificationRequired>
                  {showGroupMessages ? (
                    <GroupMessages 
                      group={selectedGroup} 
                      onBack={() => {
                        setShowGroupMessages(false);
                        setShowGroupStories(false);
                        setSelectedGroup(null);
                        setActiveTab("age-groups");
                      }} 
                    />
                  ) : showGroupStories ? (
                    <GroupStories
                      group={selectedGroup}
                      onBack={() => {
                        setShowGroupMessages(false);
                        setShowGroupStories(false);
                        setSelectedGroup(null);
                        setActiveTab("age-groups");
                      }}
                    />
                  ) : null}
                </VerificationRequired>
              </div>
            </>
          ) : filteredGroups?.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-quicksand font-medium text-gray-700">No groups found</h3>
              <p className="text-gray-500">Try adjusting your search or check again later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups?.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onJoin={() => joinGroupMutation.mutate(group.id)}
                  isPending={joinGroupMutation.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <SOSButton />
      <BottomNavigation active="groups" />
    </div>
  );
}

function AgeGroupCard({ 
  group, 
  onSelect
}: { 
  group: Group; 
  onSelect: () => void; 
}) {
  const emoji = group.emoji || "👶";
  const ageRanges = {
    newborn: "0-2 years",
    toddler: "2-5 years",
    school: "5-13 years",
    teen: "13-18 years",
    adult: "18+ years"
  };
  
  return (
    <Card 
      className="overflow-hidden border-2 border-pink-soft hover:shadow-md transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <div className="h-40 w-full relative">
        <img 
          src={group.imageUrl || "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
          alt={group.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white">
          <span className="text-4xl">{emoji}</span>
        </div>
        <div className="absolute top-2 right-2 bg-pink-soft text-white px-2 py-1 rounded-full text-xs font-medium">
          {group.ageGroup && ageRanges[group.ageGroup as keyof typeof ageRanges]}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-quicksand text-xl">{group.name}</CardTitle>
        <CardDescription className="flex items-center">
          <Users className="h-3 w-3 mr-1" />
          {group.memberCount} members
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm line-clamp-2">{group.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-pink-soft hover:bg-pink-600"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          View Circle
        </Button>
      </CardFooter>
    </Card>
  );
}

function GroupCard({ 
  group, 
  onJoin, 
  isPending 
}: { 
  group: Group; 
  onJoin: () => void; 
  isPending: boolean;
}) {
  const isCircle = group.type === "age-group";
  
  return (
    <Card className={`overflow-hidden ${isCircle ? 'border-2 border-pink-soft' : ''}`}>
      <div className="h-32 w-full relative">
        <img 
          src={group.imageUrl || "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
          alt={group.name} 
          className="w-full h-full object-cover"
        />
        {isCircle && (
          <div className="absolute top-2 right-2 bg-pink-soft text-white px-2 py-1 rounded-full text-xs font-medium">
            Parent Circle
          </div>
        )}
        {group.emoji && (
          <div className="absolute bottom-2 left-2 text-2xl">
            {group.emoji}
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-quicksand">{group.name}</CardTitle>
            {group.distance && (
              <CardDescription className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {group.distance} • {group.memberCount} members
              </CardDescription>
            )}
          </div>
          <Button 
            className="bg-pink-soft hover:bg-pink-600"
            onClick={onJoin}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">{group.description}</p>
      </CardContent>
    </Card>
  );
}
