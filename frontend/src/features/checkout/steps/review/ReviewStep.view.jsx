import  Button  from "../../../../components/ui/Button";

const ReviewStepView = ({ 
    cart, 
    shipping, 
    payment,
    totals,
    onConfirm,
    onPrev,
    loading,
    orderError 
  }) => {
    console.log("ReviewStepView renderizado con totals: ", totals);

    return(
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

            {/* 🛒 Productos */}
            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Productos</h3>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm" >
                      <span>
                          {item.name} x {item.quantity}
                      </span>
                      <span> ${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
              </ul>
            </section>

            {/* 🚚 Envío */}

            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Datos de envío</h3>
                <p className="text-sm">{shipping.fullName}</p>
                <p className="text-sm">
                  {shipping.address}, {shipping.city}, {shipping.zipCode}
                </p>
                <p className="text-sm">{shipping.phone}</p>
            </section>

            {/* 💳 Pago */}
            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Información de pago</h3>
              <p className="text-sm capitalize">
                {payment.method === "card" &&  "Tarjeta" }
                {payment.method === "paypal" && "PayPal"} 
              </p>
            </section>

            {/* 💰 Totales */}

            <section className="border rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>
                  {totals.shippingInfo.shipping.hasFreeShipping
                    ? "Gratis"
                    : `$${totals.shippingInfo.shipping.cost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </section>

            {orderError && (
              <p className="text-red-600 text-sm">{orderError}</p>
            )}
            
            {/* ✅ Acciones */}
            <div className="flex justify-between gap-4">

            <Button variant="outline" onClick={onPrev}>
                Regresar
            </Button>

            <Button variant="success" className="w-full mb-3" onClick={onConfirm}>
                {loading ? "Confirmando..." : "Confirmar pedido"}
            </Button>

            

          </div>
        </div>
    );

};

export default ReviewStepView;