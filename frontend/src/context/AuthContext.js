import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import authService from "../services/authService";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ==========================================
  // INITIALIZE AUTH STATE
  // ==========================================

  const initializeAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = authService.getToken();
      const storedUser = authService.getStoredUser();

      if (token && storedUser) {
        // Validar token con el backend
        try {
          const response = await authService.getCurrentUser();
          setUser(response.user);
          setIsAuthenticated(true);
        } catch (err) {
          // Token inválido o expirado
          console.error("Token inválido: ", err);
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error("Error al inicializar auth: ", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // ==========================================
  // AUTH ACTIONS
  // ==========================================

  // Login
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success(`¡Bienvenidx ${data.user.name}!`);
      console.log("✅ Login exitoso:", data.user);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al iniciar sesión";
      toast.error(message);
      console.error("❌ Error en login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Registro
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("¡Cuenta creada exitosamente!");
      console.log("✅ Registro exitoso:", data.user);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al hacer el registro";
      toast.error(message);
      console.error("❌ Error en registro:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    toast.success("👋 Logout exitoso");
    console.log("Sesión cerrada exitosamente");
  }, []);

  // Actualizar Perfil
  const updateProfile = useCallback(async (updatedData) => {
    setIsLoading(true);
    try {
      const data = await authService.updateProfile(updatedData);
      setUser(data.user);
      toast.success("✅ Perfil actualizado");
      console.log("Perfil actualizado correctamente");
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "❌ Error al actualizar el usuario";
      toast.error(message);
      console.error("Error actualizando perfil:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  const isAdmin = useCallback(() => {
    return user?.role === "admin";
  }, [user]);

  const isUser = useCallback(() => {
    return user?.role === "user";
  }, [user]);

  const hasRole = useCallback(
    (role) => {
      return user?.role === role;
    },
    [user]
  );

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    // State

    user,
    isLoading,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateProfile,

    // Utilities
    isAdmin,
    isUser,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
