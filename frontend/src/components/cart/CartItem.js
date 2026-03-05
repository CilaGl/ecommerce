import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Button from "../ui/Button";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };
  console.log("CartItem render:", item);
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <img
        src={item.product_image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="small"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <Minus className="h-3 w-3"></Minus>
        </Button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <Button
          variable="outline"
          size="small"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <Plus className="h-3 w-3"></Plus>
        </Button>
      </div>

      <div className="text-right">
        <p className="font-medium text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <Button
          variant="danger"
          size="small"
          onClick={() => removeFromCart(item.id)}
          className="mt-1"
        >
          <Trash2 className="h-3 w-3"></Trash2>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
