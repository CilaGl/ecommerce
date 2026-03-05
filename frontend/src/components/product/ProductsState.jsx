import { Search, Filter, X, Loader2 } from "lucide-react";

const ProductsState = ({
    loading,
    error,
    products,
    hasActiveFilters,
    onRetry,
    onClearFilters,
    children,
}) => {

    const safeProducts = Array.isArray(products) ? products : [];
    const isEmpty = !loading && safeProducts.length === 0;

    if (loading) {
        return(
            <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-800 font-medium mb-2">
                    Error al cargar productos
                </p>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                <button
                    onClick={onRetry}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    };

    if(isEmpty) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-yellow-800 font-medium mb-2">
              No se encontraron productos
            </p>
            <p className="text-yellow-700 text-sm mb-4">
              {hasActiveFilters
                ? "Intenta ajustar los filtros de búsqueda"
                : "Aún no hay productos en la tienda"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        );
    }

    return children;

};

export default ProductsState;