const CheckoutSummary = ({ cart, subtotal, shippingInfo, total }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">    
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

            <ul className="divide-y mb-4">
                {cart.map((item) => (
                    <li key={item.id} className="py-2 flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}    
            </ul>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Envío:</span>
                    <span className={shippingInfo.cost === 0 ? "text-green-600" : ""}>
                        {shippingInfo.cost === 0 ? "Gratis" : `$${shippingInfo.shipping.cost.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
        )
    };

export default CheckoutSummary;