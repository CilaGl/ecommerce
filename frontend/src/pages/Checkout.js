import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  // Cargar datos del usuario cuando esté loggeado
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address.street || "",
        city: user.address.city || "",
        zipCode: user.address.zipCode || "",
      }));
    }
  }, [user]);

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación simple
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode
    ) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    // Proceso de envío del formulario
    // Aquí podrías enviar los datos a un servidor o procesarlos según tus necesidades
    // Por ahora, solo mostraremos una alerta y limpiaremos el carrito
    toast.success("¡Compra realizada exitosamente!");
    clearCart();

    setTimeout(() => {
      navigate("/");
    }, 3000); // Espera 3 segundos antes de redirigir
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {/* Formulario de datos del cliente */}
        <div className="lg:col-span-2 md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Información de Envío</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm mb-2 font-medium text-gray-700"
                  htmlFor="name"
                >
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm text-gray-700 mb-2 font-medium"
                    htmlFor="email"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="phone"
                  >
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm text-gray-700 mb-2 font-medium"
                  htmlFor="address"
                >
                  Dirección *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm text-gray-700 mb-2 font-medium"
                    htmlFor="city"
                  >
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm text-gray-700 mb-2 font-medium"
                    htmlFor="zipCode"
                  >
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="success"
                size="large"
                className="w-full mt-6"
              >
                Confirmar Compra
              </Button>
            </form>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1 md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {item.name} x {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} c/u
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Subtotal:</p>
                <p className="font-bold text-lg">
                  ${getCartTotal().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Envío:</p>
                <p className="font-bold text-lg">
                  $
                  {getCartTotal().toFixed(2) > 999
                    ? "Gratis"
                    : "Consto Estándar"}
                </p>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <p className="font-extrabold text-xl">Total:</p>
                <p className="font-extrabold text-xl text-green-600">
                  ${getCartTotal().toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
