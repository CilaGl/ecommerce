import React, { Children, createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import toast from "react-hot-toast";

const CartContext = createContext();

const cartReducer = (state, action) => {
  console.log("🔄 Reducer recibió:", action.type, action.payload); // <-- DEBUGGEO
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      console.log("🧹 Limpiando carrito..."); // <-- DEBUGGEO
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", []);
  const [cart, dispatch] = useReducer(cartReducer, cartItems);

  React.useEffect(() => {
    setCartItems(cart);
  }, [cart, setCartItems]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    dispatch({ type: "ADD_TO_CART", payload: product });
    // 🎉 NOTIFICACIÓN TOAST
    if (existingItem) {
      toast.success(`Cantidad actualizada: ${product.name}`, {
        icon: "➕",
      });
    } else {
      toast.success(`${product.name} agregado al carrito`, {
        icon: "🛒",
      });
    }
  };

  const removeFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId);
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

    // 🗑️ NOTIFICACIÓN AL ELIMINAR
    if (product) {
      toast.error(`${product.name} eliminado del carrito`, {
        icon: "🗑️",
      });
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      });
    }
  };

  const clearCart = () => {
    console.log("🗑️ clearCart llamado"); // <-- DEBUGGEO
    console.log("📦 Carrito antes:", cart); // <-- DEBUGGEO

    dispatch({ type: "CLEAR_CART" });

    console.log("✅ Dispatch ejecutado"); // <-- DEBUGGEO

    toast.success("Carrito vaciado", {
      icon: "🧹",
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
