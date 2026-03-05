import { useEffect, useState } from "react";
import { productService } from "../services";
import { adaptProduct } from "../adapters/productAdapter";

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setLoading(true);
      try {
        const response = await productService.getProductById(id);
        console.log("useProduct - API Response:", response);
        const raw = response.product;
        if (!raw) throw new Error("Producto no encontrado");

        const product = adaptProduct(raw);

        setProduct(product);
        setError(null);
      } catch (err) {
        console.error("useProduct - Error loading product:", err);
        setError("No se pudo cargar el producto.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);
  return { product, loading, error };
};
