import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";

// As props deste componente incluirão um array de roles permitidas
type RoleBasedRouteProps = {
  allowedRoles: string[];
};

export function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Verificando permissões...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = user?.roles?.some((role) =>
    allowedRoles.includes(role)
  );

  return hasRequiredRole ? (
    <Outlet />
  ) : (
    <Navigate to="/acesso-negado" replace />
  );
}
