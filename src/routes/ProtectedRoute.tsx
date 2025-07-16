
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Opcional: para roles específicos
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, token, isLoading } = useAuth();
  const location = useLocation();


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Verificar roles si es necesario
  if (requiredRole && token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("jason parseado", payload)
      const userRole = payload.role;
      
      if (userRole !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
      }
    } catch (error) {
      console.error('Error al verificar rol:', error);
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;