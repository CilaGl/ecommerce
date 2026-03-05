import { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Comparación shallow para objetos planos
 */

const shallowEqual = (a, b) => {
  if (a === b) return true;
  if (!a || !b) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => a[key] === b[key]);
};

const DEFAULT_FILTERS = {
  category: "",
  minPrice: "",
  maxPrice: "",
  featured: false,
  sort: "created_at",
  order: "DESC",
};

export const useProductFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // ===============================
  // URL → STATE
  // ===============================

  // Sincronizar con URL params (🔁 URL → STATE)
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const newSearchTerm = params.get("search") || "";
    const newFilters = {
      category: params.get("category") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      featured: params.get("featured") === "true",
      sort: params.get("sort") || "created_at",
      order: params.get("order") || "DESC",
    };

    if (process.env.NODE_ENV === "development") {
      console.log("🔍 Products - Syncing URL params to state");
      console.log("🔍 Products.js - URL search params:", location.search);
      console.log("🔍 Products.js - searchQuery extraído:", params);
    }

    setSearchTerm((prev) => (prev !== newSearchTerm ? newSearchTerm : prev));

    setFilters((prev) => (shallowEqual(prev, newFilters) ? prev : newFilters));
  }, [location.search]);

  // Recargar productos cuando cambien los filtros
  // ===============================
  // STATE → QUERY PARAMS (API)
  // ===============================

  const queryParams = useMemo(() => {
    const params = {};

    if (searchTerm) params.search = searchTerm;

    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "" && v !== false) {
        params[k] = v;
      }
    });
    return params;
  }, [searchTerm, filters]);

  // Limpiar todos los filtros

  // ===============================
  // STATE → URL
  // ===============================

  const syncURL = useCallback(
    (nextSearch, nextFilters) => {
      const params = new URLSearchParams();

      if (nextSearch) params.set("search", nextSearch);

      Object.entries(nextFilters).forEach(([key, value]) => {
        if (value !== "" && value !== false) {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      navigate(queryString ? `?${queryString}` : "/products", {
        replace: true,
      });
    },
    [navigate],
  );

  // ===============================
  // HANDLERS (UI usa estos)
  // ===============================

  // Manejar cambio en el input de búsqueda
  const updateSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      syncURL(value, filters);
    },
    [filters, syncURL],
  );

  // Limpiar búsqueda
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    syncURL("", filters);
  }, [filters, syncURL]);

  // Manejar cambio de filtros
  const updateFilter = useCallback(
    (filterName, value) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [filterName]: value };
        syncURL(searchTerm, newFilters);
        return newFilters;
      });
    },
    [searchTerm, syncURL],
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setFilters(DEFAULT_FILTERS);
    navigate("/products", { replace: true });
  }, [navigate]);

  // ===============================
  // DERIVED STATE
  // ===============================

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    return (
      !!searchTerm ||
      filters.category ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.featured
    );
  }, [searchTerm, filters]);

  // ===============================
  // PUBLIC API
  // ===============================

  return {
    // state
    searchTerm,
    filters,

    // api params
    queryParams,

    // flags
    hasActiveFilters,

    // handlers
    updateSearch,
    clearSearch,
    updateFilter,
    clearFilters,
  };
};
