import { useState } from "react";
import ProductFiltersView from "./ProductFilters.view";

const ProductFiltersContainer = ({
    searchTerm,
    filters,
    categories,
    isLoadingCategories,
    hasActiveFilters,
    onSearchChange,
    onFilterChange,
    onClearFilters,
}) => {

    const [showFilters, setShowFilters] = useState(false);

    return (
        <ProductFiltersView
            searchTerm={searchTerm}
            filters={filters}
            categories={categories} 
            isLoadingCategories={isLoadingCategories}
            hasActiveFilters={hasActiveFilters}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters((prev) => !prev)}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
        />
    );
};

export default ProductFiltersContainer;