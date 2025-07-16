import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define theme types
export type ThemeOption = 
  | 'pink'
  | 'blue' 
  | 'green'
  | 'violet'
  | 'peach-lavender'
  | 'mint-sky'
  | 'rainbow-pastel'
  | 'rainbow-animated'
  | 'dark-mode';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get saved theme from localStorage or default to pink
  const [theme, setTheme] = useState<ThemeOption>(() => {
    const savedTheme = localStorage.getItem('mums-space-theme');
    return (savedTheme as ThemeOption) || 'pink';
  });

  // Update localStorage and apply theme when theme changes
  useEffect(() => {
    localStorage.setItem('mums-space-theme', theme);
    
    // Remove all theme classes first
    document.body.classList.remove(
      'theme-pink',
      'theme-blue',
      'theme-green',
      'theme-violet',
      'theme-peach-lavender',
      'theme-mint-sky',
      'theme-rainbow-pastel',
      'theme-rainbow-animated',
      'theme-dark-mode',
      'dark'
    );
    
    // Apply theme class - always use theme- prefix for consistency
    document.body.classList.add(`theme-${theme}`);
    
    // Apply the dark class needed for shadcn components when in dark mode
    if (theme === 'dark-mode') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // Log theme change for debugging
    console.log('Theme changed to:', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to get CSS class for theme
export const getThemeClass = (theme: ThemeOption): string => {
  switch (theme) {
    case 'pink':
      return 'bg-pink-soft';
    case 'blue':
      return 'bg-blue-gentle';
    case 'green':
      return 'bg-green-gentle';
    case 'violet':
      return 'bg-violet-gentle';
    case 'peach-lavender':
      return 'bg-gradient-peach-lavender';
    case 'mint-sky':
      return 'bg-gradient-mint-sky';
    case 'rainbow-pastel':
      return 'bg-gradient-rainbow-pastel';
    case 'rainbow-animated':
      return 'bg-gradient-rainbow-animated';
    case 'dark-mode':
      return 'bg-slate-900';
    default:
      return 'bg-pink-soft';
  }
};

// Mapping of theme names to human-readable display names
export const themeNames: Record<ThemeOption, string> = {
  'pink': 'Soft Pink',
  'blue': 'Gentle Blue',
  'green': 'Mint Green',
  'violet': 'Lavender Purple',
  'peach-lavender': 'Peach & Lavender',
  'mint-sky': 'Mint & Sky',
  'rainbow-pastel': 'Pastel Rainbow',
  'rainbow-animated': 'Animated Rainbow',
  'dark-mode': 'Night Mode'
};