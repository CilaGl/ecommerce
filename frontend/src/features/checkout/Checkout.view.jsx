import CheckoutSteps from "./CheckoutSteps";
import CheckoutSummary from "./CheckoutSummary";
import  Button  from "../../components/ui/Button";

const CheckoutView = ({
    cart,
    subtotal,
    total,
    shippingInfo,
    open,
    toggleOpen,
    checkout,
    onConfirm,
    loading,
    orderError,
}) => {
    if (!checkout || !checkout.data) {
        return <div>Cargando checkout...</div>;
        }
    const { data, step, errors } = checkout;
    const { shipping, payment } = data;
    return(
    
         <div className="container mx-auto max-w-3xl py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* STEPS */}
                <div className="lg:col-span-2">
                    <CheckoutSteps 
                        step={step}
                        shipping={shipping}
                        payment={payment}
                        errors={errors}
                        onUpdateShipping={checkout.updateShipping}
                        onUpdatePayment={checkout.updatePayment}
                        onNext={checkout.nextStep}
                        onPrevious={checkout.previousStep}
                        onConfirm={onConfirm}
                        subtotal={subtotal}
                        total={total}
                        shippingInfo={shippingInfo}
                        loading={loading}
                        orderError={orderError}
                    />
                </div>

                {/*DESKTOP STICKY SUMMARY */}
                <div className="hidden lg:block">
                    <CheckoutSummary
                        cart={cart}
                        subtotal={subtotal}
                        shippingInfo={shippingInfo}
                        total={total}
                    />
                </div>
            </div>

            {/* MOBILE FIXED SUMMARY */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">
                    Total: ${total.toFixed(2)}
                    </span>
                    <Button
                        variant="outline"
                        onClick={toggleOpen}
                    >
                    {open ? "Ocultar" : "Ver resumen"}
                    </Button>
                </div>

                {open && (
                    <div className="mt-4">
                    <CheckoutSummary
                        cart={cart}
                        subtotal={subtotal}
                        shipping={shipping}
                        total={total}
                    />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutView;