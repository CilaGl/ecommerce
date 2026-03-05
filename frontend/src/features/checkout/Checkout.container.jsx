import { useState, useMemo, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import CheckoutView from "./Checkout.view";
import { useCheckoutState } from "./state/useCheckoutState";
import { canAccessStep } from "./guards/checkoutGuards";
import { CHECKOUT_STEPS } from "./state/constants";
import { useNavigate } from "react-router-dom";
import orderService from "../../services/orderService";
import toast from "react-hot-toast";
import { calculateShippingCost } from "../../utils/pricing";

//const STEPS= ["shipping", "payment", "review"];

const CheckoutContainer = () => {

    const navigate = useNavigate();
    const checkout = useCheckoutState();
    const { cart, getCartTotal, clearCart } = useCart();

    const [confirming, setConfirming] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(canAccessStep(checkout.step, checkout.completedSteps)) return;
        
        const fallback = checkout.completedSteps.at(-1) ?? CHECKOUT_STEPS.SHIPPING;
        navigate(`/checkout/${fallback}`);
        
    }, [checkout.step, checkout.completedSteps, navigate]);


    const subtotal = getCartTotal();

    const shippingInfo = useMemo(
        () => calculateShippingCost(subtotal),
        [subtotal]
    );

    const total = useMemo(
        () => subtotal + (shippingInfo.hasFreeShipping ? 0 : shippingInfo.shipping.cost),
        [subtotal, shippingInfo]
    );

    const confirmOrder = async () => {
        try{
            setConfirming(true);
            setOrderError(null);

            const orderPayload = {
                items: cart,
                subtotal,
                shippingInfo,
                total,
                shippingData: checkout.data.shipping,
                paymentData: checkout.data.payment,
            };

            const order = await orderService.createOrder(orderPayload);

            toast.success("Pedido confirmado! 🎉")
            clearCart();
            checkout.reset(); // reducer RESET
            navigate(`/order-success/${order.id}`);
        } catch (err) {
            console.error("Error confirming order:", err);
            setOrderError("Hubo un error al confirmar tu pedido. Por favor, intenta nuevamente.");
            toast.error("Error al confirmar el pedido. 😞");
        } finally{
            setConfirming(false);
        }
    };
    console.log("CheckoutContainer renderizado con shippingInfo: ", shippingInfo);
    return (
        <CheckoutView
            cart={cart} 
            subtotal={subtotal}
            total={total}
            shippingInfo={shippingInfo}
            open={open}
            toggleOpen={() => setOpen((prev) => !prev)}

            // checkout state 
            checkout={checkout}
            onConfirm={confirmOrder}
            confirming={confirming}
            orderError={orderError}
        />
    );
};

export default CheckoutContainer;