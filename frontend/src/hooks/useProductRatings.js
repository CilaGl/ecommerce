import { useState, useEffect, useCallback, useMemo } from "react";
import productService from "../services/productService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export const useProductRatings = (productId) => {
  const { user: currentUser, isAuthenticated } = useAuth();

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  //  Nomalize API Response
  // ==============================

  const normalizeRating = (rating) => ({
    ...rating,
    user: rating.user ?? { id: rating.user_id },
  });

  // =========================
  // LOAD RATINGS
  // =========================

  const loadRatings = useCallback(async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await productService.getRatingsByProduct(productId);
      setRatings(
        Array.isArray(response.ratings)
          ? response.ratings.map(normalizeRating)
          : [],
      );
    } catch (err) {
      console.error("Error loading product ratings:", err);
      setError(err.message || "Error al cargar ratings");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // =========================
  // AUTO LOAD
  // =========================

  useEffect(() => {
    setRatings([]); // 👈 limpia al cambiar producto
    loadRatings();
  }, [productId, loadRatings]);

  // =========================
  // TU RESEÑA (DERIVADO)
  // =========================

  const userRating = useMemo(() => {
    if (!isAuthenticated || !currentUser) return null;
    const rating = ratings.find((r) => r.user?.id === currentUser?.id) || null;
    return rating;
  }, [ratings, isAuthenticated, currentUser]);

  // =========================
  // ADD / UPDATE (OPTIMISTIC)
  // =========================
  const addRating = async (rating, comment) => {
    if (!isAuthenticated) return;

    const previousRatings = ratings;

    const optimisticRating = {
      id: "temp",
      rating,
      comment,
      user: currentUser,
      created_at: new Date().toISOString(),
      optimistic: true,
    };

    // ⭐ Optimistic UI

    setRatings((prev) => [
      // si ya existe, reemplaza
      normalizeRating(optimisticRating),
      ...prev.filter((r) => r.user?.id !== currentUser.id),
    ]);

    try {
      const res = await productService.addRating(productId, rating, comment);
      // reemplazar optimistic por real
      setRatings((prev) =>
        prev.map((r) => (r.id === "temp" ? normalizeRating(res.rating) : r)),
      );

      // ✅ CONFIRMACIÓN
      toast.success("Reseña guardada correctamente");
    } catch (error) {
      // 🔙 Rollback
      setRatings(previousRatings);
      throw error;
    }
  };

  // =========================
  // DELETE (OPTIMISTIC)
  // =========================
  const deleteRating = async () => {
    console.log("deleteRating called");
    console.log("userRating:", userRating);
    console.log("currentUser:", currentUser);
    console.log("ratings:", ratings);
    if (!userRating) return;

    const backup = ratings;

    setRatings((prev) => prev.filter((r) => r.user?.id !== currentUser.id));

    try {
      console.log("Calling API delete rating with productId:", productId);
      const response = await productService.deleteRating(productId);
      console.log("Delete rating response:", response);
    } catch (error) {
      console.error("Error deleting rating:", error);
      setRatings(backup); // 🔙 Rollback
      throw error;
    }
  };

  return {
    ratings,
    userRating,
    loading,
    error,
    addRating,
    deleteRating,
    reloadRatings: loadRatings,
  };
};
