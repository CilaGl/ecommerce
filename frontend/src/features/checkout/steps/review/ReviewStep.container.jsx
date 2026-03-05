import ReviewStepView from "./ReviewStep.view";
import { useCart } from "../../../../context/CartContext";

const ReviewStepContainer = ({ 
    shipping, 
    payment, 
    totals, 
    onPrevious,
    onConfirm,
    loading,
    orderError
}) => {
    
    const { cart } = useCart();

    const handleConfirm = () => {
        onConfirm({
                cart,
                shipping,
                payment,
                totals,
        });
    };

    return (
        <ReviewStepView 
            cart={cart}
            shipping={shipping}
            payment={payment}
            totals={totals}
            onConfirm={handleConfirm}
            onPrev={onPrevious}
            loading={loading}
            orderError={orderError}
        />
    );

};

export default ReviewStepContainer;