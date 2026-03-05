import { useState } from "react";
import { productService } from "../services";

export const useProductActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProduct = async (id, productName) => {
    setLoading(true);
    setError(null);

    if (window.confirm(`¿Estás segurx de eliminar "${productName}"?`)) {
      try {
        await productService.deleteProduct(id);
      } catch (err) {
        setError(
          `Error al eliminar ${productName}: ${
            err.message || "Inténtalo de nuevo"
          }`
        );
        throw err;
      } finally {
        setLoading(false);
      }
    }
  };

  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);

    try {
      return await productService.updateProduct(id, productData);
    } catch (err) {
      setError(err.message || "Error al actualizar el producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProduct,
    updateProduct,
    loading,
    error,
  };
};
