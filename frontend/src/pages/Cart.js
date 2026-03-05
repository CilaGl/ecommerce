import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import Button from "../components/ui/Button";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { calculateShippingCost } from "../utils/pricing";

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  const handleClearCart = () => {
    clearCart();
  };

  const subtotal = getCartTotal();
  const shipping = calculateShippingCost(subtotal);
  const total = subtotal + (shipping.hasFreeShipping ? 0 : shipping.cost);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumbs />
      {/*<div className="mb-6">
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la tienda
        </Link>
      </div>*/}

      <h1 className="text-3xl font-bold mb-8 flex items-center">
        Tu Carrito de Compras
      </h1>
      {cart.length === 0 ? (
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
      ) : (
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
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío: </span>
                  <span
                    className={`font-semibold ${
                      shipping === 0 ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {shipping === 0 ? "Gratis" : `USD ${shipping.toFixed(2)}`}
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
                onClick={handleCheckout}
              >
                Proceder al Pago
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleClearCart}
              >
                Vaciar Carrito
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//export default Cart;
