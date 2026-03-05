import { useEffect } from "react";
import { useFeaturedProducts } from "../../../hooks/useFeaturedProducts"; 
import { useAuth } from "../../../context/AuthContext";

import FeaturedProductsView from "./FeaturedProducts.view";

const FeaturedProductsContainer = () => {
    const { products, loading, error, loadFeatured } = useFeaturedProducts();
    // Hook de autenticación
      const { isAdmin } = useAuth();
    useEffect(() => {
        loadFeatured();
    },[loadFeatured]);
    console.log("FeaturedProductsContainer render", { products, loading, error });
    return(
        <FeaturedProductsView
            products={products}
            loading={loading}
            error={error}
            isAdmin={isAdmin}
        />
    );
};

export default FeaturedProductsContainer;