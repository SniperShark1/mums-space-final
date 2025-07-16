import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AlertCircle, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface VerificationRequiredProps {
  children: ReactNode;
}

export function VerificationRequired({ children }: VerificationRequiredProps) {
  const { isVerified, isLoading, user } = useAuth();
  const { openUserProfile } = useClerk();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-pink-soft border-t-transparent"></div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="flex justify-center items-center p-4 min-h-[80vh]">
        <Card className="w-full max-w-md border-2 border-pink-100">
          <CardHeader className="text-center">
            <div className="mx-auto bg-pink-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-pink-soft" />
            </div>
            <CardTitle className="text-2xl font-quicksand">Verification Required</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Your account must be verified to access community stories and post your own experiences.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">
                Verification helps keep Mum's Space safe for everyone. 💖
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
              <Mail className="h-4 w-4" />
              <span>Check your email for a verification link</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <ShieldCheck className="h-4 w-4" />
              <span>Only verified members can access stories and community features</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-pink-soft hover:bg-pink-600"
              onClick={() => openUserProfile()}
            >
              Verify My Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}