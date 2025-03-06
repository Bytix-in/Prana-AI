import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  colors: {
    background: string;
    surface: string;
    text: string;
    subtext: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    error: string;
    gradients: {
      primary: string[];
      secondary: string[];
      surface: string[];
      error: string[];
    };
  };
}

const lightColors = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  subtext: '#666666',
  primary: '#4A3AFF',
  secondary: '#6C63FF',
  accent: '#8C7CFF',
  border: '#E0E0E0',
  error: '#FF3B30',
  gradients: {
    primary: ['#4A3AFF', '#8C7CFF'],
    secondary: ['#6C63FF', '#A594FF'],
    surface: ['#FFFFFF', '#F8F9FA'],
    error: ['#FF3B30', '#FF6B6B'],
  },
};

const darkColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  subtext: '#A0A0A0',
  primary: '#6C63FF',
  secondary: '#8C7CFF',
  accent: '#A594FF',
  border: '#2C2C2C',
  error: '#FF453A',
  gradients: {
    primary: ['#6C63FF', '#A594FF'],
    secondary: ['#8C7CFF', '#BFB2FF'],
    surface: ['#1E1E1E', '#2C2C2C'],
    error: ['#FF453A', '#FF6B6B'],
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme || 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}