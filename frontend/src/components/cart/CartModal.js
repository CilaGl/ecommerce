import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartItem from "../cart/CartItem";
import Button from "../ui/Button";

const CartModal = ({ onClose }) => {
  const { cart, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    alert(`¡Gracias por tu compra! Total: $${getCartTotal().toFixed(2)} `);
    clearCart();
    onClose();
  };

  // 🔄 Cerrar modal automáticamente si el carrito queda vacío
  useEffect(() => {
    if (cart.length === 0) {
      //Agregamos un pequeño delay para que se vea la animación
      const timer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cart.length, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Tu Carrito</h2>
          <Button variant="outline" size="small" onClick={onClose}>
            <X className="h-4 w-4"></X>
          </Button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-96 p-6">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold">
                Total: ${getCartTotal().toFixed(2)}
              </span>
              <Button variant="secondary" onClick={clearCart}>
                Vaciar Carrito
              </Button>
            </div>

            <Button
              variant="success"
              onClick={handleCheckout}
              className="w-full"
            >
              Proceder al Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
