import { Search, Filter, X } from "lucide-react";

const ProductFiltersView = ({
    searchTerm,
    filters,
    categories,
    isLoadingCategories,
    hasActiveFilters,
    showFilters,
    onToggleFilters,
    onSearchChange,
    onFilterChange,
    onClearFilters,
}) => {
    return(
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="text-gray-400 h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Busca productos por nombre o descripción..."
                value={searchTerm}
                onChange={(e)=> onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={onClearFilters}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={onToggleFilters}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors md:w-auto w-full justify-center"
            >
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
              {hasActiveFilters && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      onFilterChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoadingCategories}
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      onFilterChange("minPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio Máximo
                  </label>
                  <input
                    type="number"
                    placeholder="$999999"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      onFilterChange("maxPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={`${filters.sort}-${filters.order}`}
                    onChange={(e) => {
                      const [sort, order] = e.target.value.split("-");
                      onFilterChange("sort", sort);
                      onFilterChange("order", order);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="created_at-DESC">Más recientes</option>
                    <option value="created_at-ASC">Más antiguos</option>
                    <option value="price-ASC">Precio: Menor a mayor</option>
                    <option value="price-DESC">Precio: Mayor a menor</option>
                    <option value="name-ASC">Nombre: A-Z</option>
                    <option value="name-DESC">Nombre: Z-A</option>
                  </select>
                </div>
              </div>

              {/* Featured Filter */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={filters.featured}
                  onChange={(e) =>
                    onClearFilters("featured", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Solo productos destacados
                </label>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <div className="mt-4">
                  <button
                    onClick={onClearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Limpiar todos los filtros
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
    );
};

export default ProductFiltersView;
