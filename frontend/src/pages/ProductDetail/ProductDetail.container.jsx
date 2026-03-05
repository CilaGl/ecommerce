import { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { useProduct } from '../../hooks/useProduct';
import ProductDetailView from './ProductDetail.view';

const ProductDetailContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const { setPageName, clearPageName } = useBreadcrumb();

    const { product, loading, error } = useProduct(id);

    // 🍞 Brea((dcrumbs
    useEffect(() => {
        if (!product) return;

        setPageName(`/products/${id}`, product.name);
        return () => clearPageName(`/products/${id}`);
    }, [product, id, setPageName, clearPageName]);

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleBack = () => {
        navigate("/products");
    };

    return (
        <ProductDetailView
            product={product}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
            onBack={handleBack}
        />
    );

};

export default ProductDetailContainer;