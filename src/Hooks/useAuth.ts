import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
  userId: number | undefined;
  sub: string;
  roles?: string[];
  exp: number;
}

const EXPIRATION_THRESHOLD = 5 * 60 * 1000;

export function useAuth() {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    let expirationTimer: NodeJS.Timeout;

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedUser = jwtDecode<UserPayload>(token);
        const expirationTime = decodedUser.exp * 1000; // Converte para milissegundos

        if (Date.now() < expirationTime) {
          setUser(decodedUser);

          expirationTimer = setInterval(() => {
            const timeLeft = expirationTime - Date.now();

            if (timeLeft <= 0) {
              localStorage.removeItem('token');
              setUser(null);
              setIsExpiringSoon(false);
              clearInterval(expirationTimer);
            } else if (timeLeft < EXPIRATION_THRESHOLD) {
              
              setIsExpiringSoon(true);
            }
          }, 60000); 

        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem('token');
      }
    }

    setIsLoading(false);

    return () => {
      if (expirationTimer) {
        clearInterval(expirationTimer);
      }
    };
  }, []); 

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isExpiringSoon,
  };
}