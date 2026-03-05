import ProductListView from "./ProductList.view";
import ProductState from "../ProductsState";

const ProductListContainer = ({ 
    products,
    loading,
    error,
    isAdmin,
    onDeleteProduct,
    onRetry,
    hasActiveFilters,
    onClearFilters,
}) => {

  console.log("🧪 ProductListContainer products:", products);
  console.log("🧪 typeof products:", typeof products);
  const safeProducts = Array.isArray(products) ? products : [];

   return (
    <ProductState
      loading={loading}
      error={error}
      products={products}
      onRetry={onRetry}
      onClearFilters={hasActiveFilters ? onClearFilters : null}
    >
    <ProductListView
      products={products}
      isAdmin={isAdmin}
      onDeleteProduct={onDeleteProduct}
    />
    </ProductState>
   );
};

export default ProductListContainer;