

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

type Props = {
  children: React.ReactNode;
  rolesPermitidos?: ('admin' | 'usuario')[];
};

function ProtectedRoute({ children, rolesPermitidos }: Props) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/" />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol!)) {
    return <Navigate to="/no-autorizado" />;
  }

  return children;
}

export default ProtectedRoute;
