import { useState } from "react";
import Button from "../../../../components/ui/Button";

const ShippingStepView = ({ data, errors = {}, onChange, onNext }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!(name in data)) {
          console.warn("Campo no existe en shipping:", name);
        }
        onChange({ [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();  
    }
    return(
        <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">Información de Envío</h2>

              {/* NOMBRE */}
              <div>
                <label
                  className="block text-sm mb-2 font-medium text-gray-700"
                  htmlFor="name"
                >
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={data.fullName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

               {/* EMAIL + TELÉFONO */}
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
                    value={data.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
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
                    value={data.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>


              {/* DIRECCIÓN */}
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
                  value={data.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
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
                    value={data.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
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
                    value={data.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="success"
                size="large"
                className="w-full mt-6"
              >
                Continuar al pago
              </Button>
            </form>
    );
  };

export default ShippingStepView;