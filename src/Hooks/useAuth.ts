import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
  userId:number;
  sub: string; 
  roles?: string[];
  exp: number; 
}

export function useAuth() {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedUser = jwtDecode<UserPayload>(token);
        
        if (decodedUser.exp && Date.now() < decodedUser.exp * 1000) {
          setUser(decodedUser); 
        } else {
          localStorage.removeItem('token'); 
        }
      } catch (error) {
        console.error("Token inválido:", error);
      }
    }
    
    setIsLoading(false);
  }, []);

  return { 
    user, 
    isAuthenticated: !!user,
    isLoading 
  };
}