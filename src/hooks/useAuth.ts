// Importa el hook useContext de React, necesario para acceder al contexto
import { useContext } from 'react';

// Importa el contexto de autenticación definido en AuthProvider
import { AuthContext } from '../context/AuthContext';

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * Este hook facilita el uso del contexto y centraliza la validación.
 */
export const useAuth = () => {
  // Obtiene el contexto actual de autenticación
  const context = useContext(AuthContext);

  // Si el contexto no está disponible (es undefined),
  // significa que el hook se está usando fuera del AuthProvider.
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  // Devuelve el contexto si todo está correcto
  return context;
};
