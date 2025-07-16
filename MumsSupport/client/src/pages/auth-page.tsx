import { useState } from "react";
import { useLocation } from "wouter";
import { 
  SignIn, 
  SignUp,
  SignedIn,
  SignedOut
} from "@clerk/clerk-react";
import logoImage from "../assets/logo.png";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Redirect } from "wouter";

export default function AuthPage() {
  // Get the URL's search params
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const tabFromUrl = searchParams.get('tab');
  
  // Set default tab based on URL param (defaulting to register to encourage sign ups)
  const defaultTab = tabFromUrl === 'login' ? 'login' : 'register';
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    const tab = value as "login" | "register";
    setActiveTab(tab);
    
    // Update URL without page reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('tab', tab);
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Check if user is already signed in */}
      <SignedIn>
        <Redirect to="/groups" />
      </SignedIn>
      
      <SignedOut>
        {/* Left side - Authentication Form */}
        <div className="w-full md:w-3/5 flex flex-col justify-center items-center p-6 bg-white">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center justify-center mb-2">
                <img 
                  src={logoImage} 
                  alt="Mum's Space Logo" 
                  className="h-24 mb-2" 
                />
                <p className="text-gray-600 font-quicksand">Safe, Supportive, and Strong</p>
              </div>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login" className="text-base font-medium">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="text-base font-medium">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="border border-gray-200">
                  <CardHeader className="bg-gray-50 rounded-t-lg">
                    <CardTitle className="font-quicksand text-xl">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 max-h-[400px] overflow-y-auto">
                    <SignIn 
                      routing="path" 
                      path="/auth" 
                      appearance={{
                        elements: {
                          card: 'bg-transparent shadow-none p-0',
                          headerTitle: 'hidden',
                          headerSubtitle: 'hidden',
                          footerAction: 'hidden',
                          main: 'gap-1',
                          form: 'gap-1',
                          formFieldRow: 'mb-1'
                        }
                      }}
                    />
                  </CardContent>
                  <CardFooter className="justify-center">
                    <p className="text-sm text-gray-500">
                      Don't have an account yet? <button onClick={() => setActiveTab('register')} className="text-pink-600 font-medium hover:underline">Sign up now</button>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card className="border-2 border-pink-200">
                  <CardHeader className="bg-pink-50 rounded-t-lg">
                    <CardTitle className="font-quicksand text-xl text-pink-600">Create an Account</CardTitle>
                    <CardDescription>Join our supportive community of mothers</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 max-h-[400px] overflow-y-auto">
                    <div className="mb-4 p-3 bg-pink-50 rounded-lg border border-pink-100">
                      <p className="text-sm font-medium text-pink-600">New to Mum's Space?</p>
                      <p className="text-xs text-gray-600">Sign up now to connect with other mums, join groups, and get the support you need.</p>
                    </div>
                    <SignUp 
                      routing="path" 
                      path="/auth" 
                      appearance={{
                        elements: {
                          card: 'bg-transparent shadow-none p-0',
                          headerTitle: 'hidden',
                          headerSubtitle: 'hidden',
                          footerAction: 'hidden',
                          main: 'gap-1',
                          form: 'gap-1',
                          formFieldRow: 'mb-1'
                        }
                      }}
                    />
                  </CardContent>
                  <CardFooter className="justify-center bg-pink-50 rounded-b-lg">
                    <p className="text-sm text-gray-500">
                      By registering, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right side - Hero Image & Text */}
        <div className="w-full md:w-2/5 bg-gradient-pink-blue p-6 flex items-center justify-center">
          <div className="text-white max-w-lg">
            <h2 className="text-3xl font-quicksand font-bold mb-4">Join Our Supportive Community</h2>
            <p className="mb-6 text-lg">
              Mum's Space is a private community built by mums, for mums. A safe, welcoming space where mothers can connect, share advice, and provide emotional support.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-xl">✨</div>
                <p>Connect with other mums instantly and join groups based on your interests</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-xl">✨</div>
                <p>Share advice, struggles, and wins in a judgment-free environment</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-xl">✨</div>
                <p>Get support when you need it most with our SOS feature</p>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
