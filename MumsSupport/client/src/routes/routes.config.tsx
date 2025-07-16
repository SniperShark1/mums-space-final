import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import HomePage from "../routes/home";
import SignInPage from "../routes/sign-in";
import SignUpPage from "../routes/sign-up";
import NotFound from "@/pages/not-found";
import GroupsPage from "@/pages/groups-page";
import MessagesPage from "@/pages/messages-page";
import HelpMapPage from "@/pages/help-map-page";

// Clerk protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut><Navigate to="/sign-in" replace /></SignedOut>
  </>
);

// Define our routes
export const createRouter = (publishableKey: string) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><HomePage /></ProtectedRoute>
    },
    {
      path: "/groups",
      element: <ProtectedRoute><GroupsPage /></ProtectedRoute>
    },
    {
      path: "/messages",
      element: <ProtectedRoute><MessagesPage /></ProtectedRoute>
    },
    {
      path: "/help-map",
      element: <ProtectedRoute><HelpMapPage /></ProtectedRoute>
    },
    {
      path: "/sign-in/*",
      element: (
        <SignedIn>
          <Navigate to="/" replace />
        </SignedIn>
      ),
    },
    {
      path: "/sign-in/*",
      element: <SignInPage />,
    },
    {
      path: "/sign-up/*",
      element: (
        <SignedIn>
          <Navigate to="/" replace />
        </SignedIn>
      ),
    },
    {
      path: "/sign-up/*",
      element: <SignUpPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);
};