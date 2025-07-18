import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../Contexts/authContext'; 

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>; 
  }
  

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}