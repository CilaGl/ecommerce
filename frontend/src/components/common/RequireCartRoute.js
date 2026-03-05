import React from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const RequireCartRoute = ({ children }) => {
  const { cart } = useCart();

  // Si el carrito está vacío, redirigir al carrito
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return children;
};

export default RequireCartRoute;
