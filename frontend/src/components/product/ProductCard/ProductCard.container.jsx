import { useCart } from "../../../context/CartContext";
import ProductCardView from "./ProductCard.view";

const ProductCartContainer = ({ product, isAdmin, onDelete }) => {
    const { addToCart } = useCart();
    
      const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to product details
        e.stopPropagation(); // Stop event bubbling
        addToCart(product);
      };

      const handleDelete = () => {
        onDelete(product.id, product.name);
    };

    return(
        <ProductCardView
            product={product}
            isAdmin={isAdmin}
            onAddToCart={handleAddToCart}
            onDelete={handleDelete}
        />  
    );
};

export default ProductCartContainer;