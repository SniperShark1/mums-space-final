import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useClerk, useUser, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { User as SelectUser } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

// Modified auth context to work with Clerk
type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  isVerified: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { isLoaded, isSignedIn, getToken } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const [error, setError] = useState<Error | null>(null);
  
  // Check email verification status
  const isEmailVerified = clerkUser?.emailAddresses.some(
    email => email.verification?.status === 'verified'
  ) || false;
  
  // Fetch user data from our API when Clerk authentication is ready
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError
  } = useQuery<SelectUser | null>({
    queryKey: ['/api/clerk-user'],
    queryFn: async () => {
      if (!isLoaded || !isSignedIn || !clerkUser) {
        return null;
      }
      
      try {
        // Create a user object that matches our SelectUser interface
        return {
          id: parseInt(clerkUser.id) || 1, // Convert string ID to number
          username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress || '',
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          displayName: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : (clerkUser.username || ''),
          password: '', // We don't store or use passwords with Clerk
          memberType: 'Member', // Default member type
          bio: clerkUser.publicMetadata?.bio as string || '',
          avatar: clerkUser.imageUrl || null,
          isVerified: isEmailVerified,
        };
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load user data'));
        return null;
      }
    },
    enabled: isLoaded && isSignedIn && !!clerkUser
  });

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading: !isLoaded || isUserLoading,
        error: error || userError || null,
        isVerified: isEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
