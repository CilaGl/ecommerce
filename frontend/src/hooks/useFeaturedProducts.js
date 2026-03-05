import { useState, useCallback } from "react";
import productService from "../services/productService";
import { adaptProductList } from "../adapters/productAdapter";

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos destacados
  const loadFeatured = useCallback(async () => {
    setLoading(true);
    setError(null);

    console.log("📡 Calling API to get Featured Products");
    try {
      const response = await productService.getFeaturedProducts();
      // La API devuelve { success, count, products, totalPages, currentPage }
      // Asegurarnos de que siempre sea un array
      const productsData = Array.isArray(response.products)
        ? adaptProductList(response.products)
        : [];
      console.log(
        "✅ Setting featured products:",
        productsData.length,
        "items",
      );
      setProducts(productsData);
      return response;
    } catch (error) {
      setError(error.message || "Error al cargar los productos destacados");
      console.error("❌ Error loading featured products:", error);
      // En caso de error, mantener array vacío
      setProducts([]);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error, loadFeatured };
};
