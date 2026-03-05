import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

// ==========================================
// PROTECTED ROUTE (Requiere estar logueado)
// ==========================================

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// ==========================================
// ADMIN ROUTE (Solo para administradores)
// ==========================================

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir a login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    // Si está autenticado pero no es admin, mostrar página de acceso denegado
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-red-800 mb-2">
            Acceso Denegado
          </h1>
          <p className="text-red-600 mb-6">
            No tienes permisos de administrador para acceder a esta página.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Regresar
          </button>
        </div>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
