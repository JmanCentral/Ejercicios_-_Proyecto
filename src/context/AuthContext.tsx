// src/context/AuthProvider.tsx
import { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          if (payload.exp * 1000 > Date.now()) {
            setTokenState(storedToken);
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const setToken = (newToken: string | null) => {
    try {
      if (newToken) {
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('token');
      }
      setTokenState(newToken);
    } catch (error) {
      console.error('Error al manejar el token:', error);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      token,
      setToken,
      isAuthenticated: !!token,
      isLoading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
