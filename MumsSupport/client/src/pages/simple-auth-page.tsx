import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSimpleAuth } from "@/hooks/use-simple-auth";
import logoImage from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SimpleAuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [_, setLocation] = useLocation();
  const { login, user } = useSimpleAuth();
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    setLocation("/");
  };
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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

          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
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
                <CardContent className="pt-6">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="hello@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">Sign In</Button>
                    </div>
                  </form>
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
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-pink-50 rounded-lg border border-pink-100">
                    <p className="text-sm font-medium text-pink-600">New to Mum's Space?</p>
                    <p className="text-xs text-gray-600">Sign up now to connect with other mums, join groups, and get the support you need.</p>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="hello@example.com" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input 
                          id="register-password" 
                          type="password" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="Your Name" 
                        />
                      </div>
                      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">Create Account</Button>
                    </div>
                  </form>
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
    </div>
  );
}