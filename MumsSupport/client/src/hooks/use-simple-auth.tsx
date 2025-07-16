import { createContext, ReactNode, useContext, useState } from "react";
import { User as SelectUser } from "@shared/schema";

// Simple auth context for testing routing
type SimpleAuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  isVerified: boolean;
  login: () => void;
  logout: () => void;
};

export const SimpleAuthContext = createContext<SimpleAuthContextType | null>(null);

export function SimpleAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SelectUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Simple mock login for testing
  const login = () => {
    setUser({
      id: 1,
      username: "test_user",
      email: "test@example.com",
      displayName: "Test User",
      password: "", // We don't store passwords in the frontend
      memberType: "Member",
      bio: "Test user bio",
      avatar: null,
      isVerified: true,
    });
  };
  
  // Simple logout
  const logout = () => {
    setUser(null);
  };

  return (
    <SimpleAuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isVerified: user?.isVerified || false,
        login,
        logout
      }}
    >
      {children}
    </SimpleAuthContext.Provider>
  );
}

export function useSimpleAuth() {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error("useSimpleAuth must be used within a SimpleAuthProvider");
  }
  return context;
}