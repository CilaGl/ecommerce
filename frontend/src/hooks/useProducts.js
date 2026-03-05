import { useState, useCallback } from "react";
import productService from "../services/productService";
import { useAuth } from "../context/AuthContext";
import { adaptProductList } from "../adapters/productAdapter";

export const useProducts = () => {
  // 1. Obtener la función de verificación del rol
  const { isAdmin } = useAuth(); // 👈 Uso del hook de Auth

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  //  Helpers
  // ==============================

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  // =========================
  // Fetch products
  // =========================

  // Cargar todos los productos
  const loadProducts = useCallback(
    async (params = {}) => {
      startLoading();

      try {
        console.log("📡 Calling API with params:", params);

        // 2. 🚨 Lógica de Validación de Rol 🚨
        const response = isAdmin()
          ? await productService.getAllProductsAdmin(params)
          : await productService.getAllProducts(params);

        console.log("📦 API Response:", response);

        // La API devuelve { success, count, products, totalPages, currentPage }
        // Asegurarnos de que siempre sea un array
        const normalizedProducts = Array.isArray(response?.products)
          ? adaptProductList(response.products)
          : [];

        console.log("✅ Setting products:", normalizedProducts.length, "items");

        setProducts(normalizedProducts);
        return response;
      } catch (error) {
        setError(error.message || "Error al cargar los productos");
        console.error("❌ Error loading products:", error);

        // En caso de error, mantener array vacío
        setProducts([]);
        throw error;
      } finally {
        stopLoading();
      }
    },
    [isAdmin],
  );

  // =========================
  // Mutations
  // =========================

  // Crear productos
  const addProduct = async (productData) => {
    startLoading();

    try {
      const newProduct = await productService.addProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message || "Error al agregar el producto");
      throw err;
    } finally {
      stopLoading();
    }
  };

  // Actualizar producto
  const updateProduct = async (id, productData) => {
    startLoading();

    try {
      const updatedProduct = await productService.updateProduct(
        id,
        productData,
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p)),
      );
      return updatedProduct;
    } catch (err) {
      setError(err.message || "Error al actualizar el producto");
      throw err;
    } finally {
      stopLoading();
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    startLoading();
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Error al eliminar el producto");
      throw err;
    } finally {
      stopLoading();
    }
  };

  // Actualizar stock
  const updateStock = async (id, stock) => {
    startLoading();
    try {
      const result = await productService.updateStock(id, stock);
      // La respuesta viene en result.product
      const updatedProduct = result?.product;

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p)),
      );

      return updatedProduct;
    } catch (err) {
      setError(err.message || "Error al actualizar el stock del producto");
      throw err;
    } finally {
      stopLoading();
    }
  };

  // =========================
  // Ratings (no mutan listado)
  // =========================

  // Agregar rating a un producto
  const addRating = async (productId, rating, comment) => {
    startLoading();
    try {
      return await productService.addRating(productId, rating, comment);
    } catch (err) {
      setError(err.message || "Error al agregar rating");
      throw err;
    } finally {
      stopLoading();
    }
  };

  // Eliminar rating
  const deleteRating = async (productId) => {
    startLoading();

    try {
      await productService.deleteRating(productId);
    } catch (err) {
      setError(err.message || "Error al eliminar el rating");
      throw err;
    } finally {
      stopLoading();
    }
  };

  return {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    addRating,
    deleteRating,
  };
};
