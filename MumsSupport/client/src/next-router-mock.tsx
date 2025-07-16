// src/next-router-mock.tsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create a context for the router
const RouterContext = createContext(null);

// Router provider component
export function RouterProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Create a router object that mimics Next.js router
  const router = {
    route: location.pathname,
    pathname: location.pathname,
    query: Object.fromEntries(new URLSearchParams(location.search)),
    asPath: location.pathname + location.search,
    push: (url) => {
      console.log(`Router.push called with: ${url}`);
      navigate(url);
      return Promise.resolve(true);
    },
    replace: (url) => {
      console.log(`Router.replace called with: ${url}`);
      navigate(url, { replace: true });
      return Promise.resolve(true);
    },
    reload: () => {
      window.location.reload();
    },
    back: () => {
      navigate(-1);
    },
    prefetch: () => Promise.resolve(),
    beforePopState: () => {},
    events: {
      on: () => {},
      off: () => {},
      emit: () => {}
    },
    isFallback: false,
    isReady: true,
    isPreview: false
  };
  
  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  );
}

// Hook to use the router
export function useRouter() {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error(
      'useRouter must be used within a RouterProvider. ' +
      'Wrap your app with RouterProvider or mock the Next.js router.'
    );
  }
  return router;
}

export default { useRouter, RouterProvider };