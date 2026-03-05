import { productService } from "../services";
import { useState } from "react";
import { useCallback } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  // Cargar categorías desde la API
  const loadCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const response = await productService.getCategories();
      setCategories(response.categories || []);
    } catch (err) {
      console.error("Error al cargar categorías: ", err);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  return {
    categories,
    isLoadingCategories,
    loadCategories,
  };
};
