import { useState } from "react";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { SOSButton } from "@/components/sos-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Globe, Sparkles, Search, Loader2, MapPinOff, Building, HeartPulse, Brain, Users, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalResources, LocalResource } from "@/hooks/use-local-resources";
import { useToast } from "@/hooks/use-toast";

export default function HelpMapPage() {
  const [locationInput, setLocationInput] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  const {
    resources,
    isLoading,
    error,
    needsApiKey,
    location,
    handleSearch,
    resetSearch
  } = useLocalResources();

  const handleSearchClick = () => {
    if (!locationInput.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location to search for resources",
        variant: "destructive"
      });
      return;
    }
    
    handleSearch(locationInput);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Filter resources by type based on active tab
  const filteredResources = resources.filter(resource => {
    if (activeTab === 'all') return true;
    return resource.type === activeTab;
  });

  // Get resource icon based on type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'childcare':
        return <Building className="h-5 w-5" />;
      case 'healthcare':
        return <HeartPulse className="h-5 w-5" />;
      case 'mental-health':
        return <Brain className="h-5 w-5" />;
      case 'support':
        return <Users className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16 pb-20 app-background">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-gradient-pink-blue rounded-xl p-5 mb-6 text-white">
            <h1 className="text-2xl font-quicksand font-bold mb-2">Help Map</h1>
            <p className="font-quicksand">Find local resources and support for mothers in your community</p>
          </div>

          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  className="pl-10" 
                  placeholder="Enter your location in Australia (e.g., Sydney NSW, Melbourne, Brisbane 4000)" 
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex-shrink-0">
                <Button 
                  className="w-full md:w-auto bg-pink-soft hover:bg-pink-600 flex items-center"
                  onClick={handleSearchClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Find Resources
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {needsApiKey ? (
            <div className="mb-6">
              <Card className="border-yellow-300 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-10 w-10 text-yellow-500" />
                    <div>
                      <h3 className="font-quicksand font-bold text-lg">API Key Required</h3>
                      <p className="text-gray-600">
                        To enable AI-powered local resource search, the administrator needs to set up a Perplexity API key.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : error && !needsApiKey && resources.length === 0 ? (
            <div className="mb-6">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                    <div>
                      <h3 className="font-quicksand font-bold text-lg">Error Finding Resources</h3>
                      <p className="text-gray-600">
                        We had trouble finding resources for that location. Please try again with a different location.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : resources.length > 0 ? (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-quicksand text-xl font-bold text-gray-800">
                  Local Resources in {location}
                </h2>
                <Button 
                  variant="outline"
                  onClick={resetSearch}
                  className="text-sm"
                >
                  New Search
                </Button>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="childcare">Childcare</TabsTrigger>
                  <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                  <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map((resource, index) => (
                  <AIResourceCard 
                    key={index}
                    resource={resource}
                    icon={getResourceIcon(resource.type)}
                  />
                ))}
              </div>
              
              <div className="text-center text-gray-500 text-sm mt-4">
                <p>Powered by Perplexity AI - Results may vary and should be verified.</p>
              </div>
            </div>
          ) : !isLoading && !location ? (
            <div className="mb-6">
              <h2 className="font-quicksand text-xl font-bold text-gray-800 mb-3">AI-Powered Local Resource Search</h2>
              <Card className="bg-gradient-to-br from-pink-50 to-blue-50 border-pink-100">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 mx-auto text-pink-soft mb-4" />
                    <h3 className="font-quicksand font-bold text-lg mb-2">Find Resources Near You</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-4">
                      Enter your location above to discover local maternal and child support resources powered by AI, including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-pink-soft mb-2">👶</div>
                        <h4 className="font-quicksand font-semibold">Childcare Services</h4>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-pink-soft mb-2">🏥</div>
                        <h4 className="font-quicksand font-semibold">Healthcare Facilities</h4>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-pink-soft mb-2">👪</div>
                        <h4 className="font-quicksand font-semibold">Support Groups</h4>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : null}

          <div className="mb-6">
            <h2 className="font-quicksand text-xl font-bold text-gray-800 mb-3">Australian National Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard 
                title="PANDA - Perinatal Anxiety & Depression Australia"
                description="Support for women and families affected by perinatal mental health issues"
                phone="1300 726 306"
                website="https://www.panda.org.au"
                hours="Mon-Fri 9am-7:30pm AEST"
              />
              <ResourceCard 
                title="Australian Breastfeeding Association"
                description="Breastfeeding information and support for Australian mothers"
                phone="1800 686 268"
                website="https://www.breastfeeding.asn.au"
                hours="24/7 Helpline"
              />
              <ResourceCard 
                title="Pregnancy, Birth and Baby"
                description="Guidance from pregnancy to preschool for Australian parents"
                phone="1800 882 436"
                website="https://www.pregnancybirthbaby.org.au"
                hours="7am-midnight, 7 days"
              />
              <ResourceCard 
                title="Lifeline Australia"
                description="Crisis support and suicide prevention services"
                phone="13 11 14"
                website="https://www.lifeline.org.au"
                hours="24/7 Support"
              />
              <ResourceCard 
                title="Beyond Blue"
                description="Support for anxiety, depression and suicide prevention"
                phone="1300 22 4636"
                website="https://www.beyondblue.org.au"
                hours="24/7 Support"
              />
              <ResourceCard 
                title="Parentline"
                description="Counselling and support for parents and carers"
                phone="1300 30 1300"
                website="https://parentline.com.au"
                hours="8am-10pm, 7 days (QLD & NT)"
              />
            </div>
          </div>
        </div>
      </main>

      <SOSButton />
      <BottomNavigation active="help-map" />
    </div>
  );
}

function ResourceCard({ 
  title, 
  description, 
  phone, 
  website,
  hours
}: { 
  title: string; 
  description: string; 
  phone: string; 
  website: string;
  hours: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="font-quicksand">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-pink-soft" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2 text-pink-soft" />
            <a href={website} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {website.replace('https://', '')}
            </a>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-pink-soft" />
            <span className="text-sm">{hours}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component to display AI-powered local resources
function AIResourceCard({
  resource,
  icon
}: {
  resource: LocalResource;
  icon: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <div className="p-2 rounded-full bg-pink-soft/10 text-pink-soft">
              {icon}
            </div>
            <div>
              <CardTitle className="font-quicksand text-lg">{resource.title}</CardTitle>
              <Badge 
                className={`
                  ${resource.type === 'childcare' ? 'bg-blue-100 text-blue-800' : ''}
                  ${resource.type === 'healthcare' ? 'bg-green-100 text-green-800' : ''}
                  ${resource.type === 'mental-health' ? 'bg-purple-100 text-purple-800' : ''}
                  ${resource.type === 'support' ? 'bg-pink-100 text-pink-800' : ''}
                  ${resource.type === 'other' ? 'bg-gray-100 text-gray-800' : ''}
                `}
              >
                {resource.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm mb-4">{resource.description}</p>
        <div className="space-y-2 text-sm">
          {resource.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-pink-soft" />
              <span>{resource.phone}</span>
            </div>
          )}
          {resource.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-pink-soft" />
              <a href={resource.website.startsWith('http') ? resource.website : `https://${resource.website}`} 
                className="text-blue-600 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {resource.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {resource.hours && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-pink-soft" />
              <span>{resource.hours}</span>
            </div>
          )}
          {resource.address && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-pink-soft" />
              <span>{resource.address}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}