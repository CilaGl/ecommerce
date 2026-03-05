import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import { useProductFilters } from "../hooks/useProductFilters";
import { useCategories } from "../hooks/useCategories";

// Componentes
import ProductList from "../components/product/ProductList";
import ProductAdminGlobals from "../components/product/ProductAdminGlobals";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ProductFiltersContainer from "../components/product/ProductFilters/ProductFilters.container";
import ProductsState from "../components/product/ProductsState";
import ProductsHeader from "../components/product/ProductsHeader";

const Products = () => {
  // ===============================
  // HOOKS
  // ===============================

  // Hook personalizado para productos
  const { products, loading, error, loadProducts, deleteProduct } =
    useProducts();

  // Hook de autenticación
  const { isAdmin, loading: authLoading } = useAuth();

  // Hook personalizado para filtros de productos
  const {
    searchTerm,
    filters,
    queryParams,
    hasActiveFilters,
    updateSearch,
    updateFilter,
    clearFilters,
  } = useProductFilters();

  // Hook para categorías
  const { categories, loadCategories, isLoadingCategories } = useCategories();

  // ==========================================
  // EFFECTS
  // ==========================================

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Cargar productos solo cuando cambien los valores reales
  useEffect(() => {
    loadProducts(queryParams).catch((err) =>
      console.error("Error al cargar los productos:", err),
    );
  }, [queryParams, loadProducts]);

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <div className="w-full py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />

        <ProductsHeader
          searchTerm={searchTerm}
          isAdmin={isAdmin}
          AdminActions={<ProductAdminGlobals />}
        />

        <ProductFiltersContainer
          searchTerm={searchTerm}
          filters={filters}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={updateSearch}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        <ProductsState
          loading={loading}
          error={error}
          products={products}
          hasActiveFilters={hasActiveFilters}
          onRetry={() => loadProducts(queryParams)}
          onClearFilters={clearFilters}
        >
          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            Mostrando {products.length} producto
            {products.length !== 1 ? "s" : ""}
          </div>

          {/* Products Grid */}
          <ProductList
            products={products}
            isAdmin={isAdmin}
            onDeleteProduct={deleteProduct}
          />
        </ProductsState>
      </div>
    </div>
  );
};

export default Products;
