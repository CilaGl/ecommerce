import api from "./api";

const authService = {
  // Registro
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Obtener usuario actual
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar Perfil
  updateProfile: async (userData) => {
    try {
      const response = await api.put("/auth/update", userData);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar contraseña
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put("/auth/updatePassword", {
        currentPassword,
        newPassword,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verificar si hay sesión activa
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Obtener usuario desde localStorage
  getStoredUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
