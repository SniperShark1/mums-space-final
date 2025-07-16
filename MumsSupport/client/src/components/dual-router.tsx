import { ReactNode, useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "../routes/routes.config";
import { Switch, Route, Redirect } from "wouter";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import GroupsPage from "@/pages/groups-page";
import MessagesPage from "@/pages/messages-page";
import HelpMapPage from "@/pages/help-map-page";
import NotFound from "@/pages/not-found";

// New Clerk ProtectedRoute component for Wouter
function ClerkProtectedRoute({ 
  component: Component,
  ...rest
}: { 
  component: React.ComponentType;
  path?: string;
}) {
  return (
    <Route {...rest}>
      <SignedIn>
        <Component />
      </SignedIn>
      <SignedOut>
        <Redirect to="/auth" />
      </SignedOut>
    </Route>
  );
}

// Wouter router implementation
function WouterRouter() {
  return (
    <Switch>
      <ClerkProtectedRoute path="/" component={HomePage} />
      <ClerkProtectedRoute path="/groups" component={GroupsPage} />
      <ClerkProtectedRoute path="/messages" component={MessagesPage} />
      <ClerkProtectedRoute path="/help-map" component={HelpMapPage} />
      <Route path="/auth">
        <SignedIn>
          <Redirect to="/" />
        </SignedIn>
        <SignedOut>
          <AuthPage />
        </SignedOut>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

// Props for the DualRouter component
interface DualRouterProps {
  publishableKey: string;
  routerType: "react-router" | "wouter";
  children?: ReactNode;
}

// Component that can switch between React Router and Wouter
export default function DualRouter({ 
  publishableKey, 
  routerType, 
  children 
}: DualRouterProps) {
  // For React Router, we create the router instance
  const [reactRouter, setReactRouter] = useState<any>(null);

  useEffect(() => {
    if (routerType === "react-router") {
      try {
        const router = createRouter(publishableKey);
        setReactRouter(router);
      } catch (error) {
        console.error("Error creating React Router:", error);
      }
    }
  }, [publishableKey, routerType]);

  // Render based on the selected router type
  if (routerType === "react-router") {
    if (reactRouter) {
      return <RouterProvider router={reactRouter} />;
    } else {
      // Show loading state while React Router is initializing
      return <div>Loading...</div>;
    }
  } else {
    // Default to Wouter
    return <WouterRouter />;
  }
}