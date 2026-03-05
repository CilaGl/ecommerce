import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import CartItem from "../../components/cart/CartItem";
import Button from "../../components/ui/Button";
import Breadcrumbs from "../../components/common/Breadcrumbs";

const CartView = ({
    cart,
    pricing,
    onCheckout,
    onClearCart
}) => {
    const {subtotal, shipping, total} = pricing;
    if(cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs />
                <div className="text-center py-16">
                    <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-gray-300" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Tu carrito está vacío.
                    </h2>
                    <p className="text-gray-500 mb-8">
                        ¡Agrega algunos productos para comenzar!
                    </p>
                    <Link to="/products">
                        <Button variant="primary" size="large">
                        Ir a la tienda
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
    return(
        <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    </div>
                </div>  

                {/* Order Summary */}
                <div className="lg-col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                    <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal: </span>
                        <span className="font-semibold">
                            ${subtotal.toFixed(2)}
                        </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Envío: </span>
                            <span
                                className={`font-semibold ${
                                shipping.hasFreeShipping ? "text-teal-600" : "text-gray-600"
                                }`}
                            >
                                {shipping.hasFreeShipping ? "Gratis" : "Costo Estándar"}
                            </span>
                        </div>
                        <div className="flex justify-between border-t pt-3 font-bold text-lg">
                            <span className="text-lg font-bold">Total: </span>
                            <span className="text-lg font-bold text-green-600">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="success"
                        size="large"
                        className="w-full mb-4"
                        onClick={onCheckout}
                    >
                        Proceder al Pago
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={onClearCart}
                        
                    >
                        Vaciar Carrito
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartView;