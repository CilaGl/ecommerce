import api from "./api";

const productService = {
  // ==========================================
  // RUTAS PÚBLICAS
  // ==========================================

  // Obtener todos los productos con filtros y paginación
  getAllProducts: async (params = {}) => {
    try {
      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener un producto por id
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener los productos destacados
  getFeaturedProducts: async () => {
    try {
      const response = await api.get("/products/featured");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener todas las categorías con conteo
  getCategories: async () => {
    try {
      const response = await api.get("/products/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener productos por categoría
  getProductsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/products/category/${category}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener ratings de un producto
  getRatingsByProduct: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}/ratings`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ==========================================
  // RUTAS DE RATINGS
  // ==========================================

  // Agregar o actualizar rating
  addRating: async (productId, rating, comment) => {
    console.log("POST rating →", {
      url: `/products/${productId}/rating`,
      rating,
      comment,
    });
    try {
      const response = await api.post(`/products/${productId}/rating`, {
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Eliminar rating
  deleteRating: async (productId) => {
    try {
      const response = await api.delete(`/products/${productId}/rating`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ==========================================
  // RUTAS DE ADMINISTRACIÓN (Requieren Auth)
  // ==========================================

  // Dar de alta un nuevo producto (Admin)
  addProduct: async (productData) => {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar un producto (Admin)
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Eliminar producto - Soft delete (Admin)
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar stock (Admin)
  updateStock: async (id, stock) => {
    try {
      const response = await api.patch(`/products/${id}/stock/`, { stock });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener todos los productos incluyendo inactivos (Admin)
  getAllProductsAdmin: async (params = {}) => {
    try {
      const response = await api.get("/products/admin/all", { params });
      return response.data;
    } catch (error) {
      throw error.response?.error || error;
    }
  },
};

export default productService;
