import {useMemo, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartView from "./Cart.view";
import { calculateShippingCost } from "../../utils/pricing";



const CartContainer = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const subtotal = useMemo(() => getCartTotal(), [getCartTotal]);
     const pricing = useMemo(
    () => calculateShippingCost(subtotal),
    [subtotal]
  );

    

    const handleClearCart = useCallback(() => {
        clearCart();
    }, [clearCart]);

    const handleCheckout = useCallback(() => {
        console.log("Checkout iniciado con carrito: ", cart.length, " items");
        if (cart.length === 0) return;
        navigate("/checkout");
    }, [navigate, cart.length]);

    return (
        <CartView
            cart={cart}
            pricing={pricing}
            onCheckout={handleCheckout}
            onClearCart={handleClearCart}
        />
    );
};

export default CartContainer;