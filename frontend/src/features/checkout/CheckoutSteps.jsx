import ShippingStepContainer from "../checkout/steps/shipping/ShippingStep.container";
import PaymentStepContainer from "../checkout/steps/payment/PaymentStep.container";
import ReviewStepContainer from "../checkout/steps/review/ReviewStep.container";

const CheckoutSteps = ({
    step,
    shipping,
    payment,
    errors,
    onUpdateShipping,
    onUpdatePayment,
    onNext,
    onPrevious,
    onConfirm,
    subtotal,
    total,
    shippingInfo,
    loading,
    orderError
}) => {
    console.log("CheckoutSteps renderizado con shippingInfo: ", shippingInfo);
    switch(step) {
        case "shipping":
            return <ShippingStepContainer 
                shipping={shipping} 
                errors={errors}
                onUpdateShipping={onUpdateShipping}
                onNext={onNext}
            />;
        case "payment":
            return <PaymentStepContainer 
                data={payment}
                errors={errors}
                onChange={onUpdatePayment}
                onNext={onNext}
                onPrevious={onPrevious}
            />;
        case "review":
            return <ReviewStepContainer 
                    shipping={shipping}
                    payment={payment}
                    totals= {{subtotal ,total, shippingInfo}}
                    onPrevious={onPrevious}
                    onConfirm={onConfirm} 
                    loading={loading}
                    orderError={orderError}
                    />
        default:
            return null;
    }
};

export default CheckoutSteps;