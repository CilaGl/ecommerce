import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Lock, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/ui/Button";

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🏠 Si el campo pertenece a address (por ejemplo: address.street)
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    }
    // 📞 Si el campo es el teléfono
    else if (name === "phone") {
      // Quita todo lo que no sea número
      let digits = value.replace(/\D/g, "");

      // Asegura que empiece con 52
      if (!digits.startsWith("52")) {
        digits = "52" + digits;
      }

      // Limita la longitud máxima (12 dígitos = +52 + 10 números)
      digits = digits.slice(0, 12);

      // Aplica formato +52 555 555 5555
      let formatted = "+52";
      if (digits.length > 2) formatted += " " + digits.slice(2, 5);
      if (digits.length >= 5) formatted += " " + digits.slice(5, 8);
      if (digits.length >= 8) formatted += " " + digits.slice(8, 12);

      setFormData((prev) => ({ ...prev, [name]: formatted }));
    }
    // 🧩 Para cualquier otro campo
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: {
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        zipCode: user?.address?.zipCode || "",
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-blue-100">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-500 rounded-full text-xs">
                  {user?.role === "admin" ? "👑 Administrador" : "👤 Usuario"}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Información Personal
              </h2>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="primary"
                  size="small"
                >
                  Editar Perfil
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                        ${
                                          !isEditing
                                            ? "bg-gray-50 cursor-not-allowed"
                                            : ""
                                        }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || "+52 "}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="(+52) 55 1082 0502"
                />
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Dirección
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="Calle y número"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                      }`}
                      placeholder="Ciudad"
                    />
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                      }`}
                      placeholder="Estado"
                    />
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                      }`}
                      placeholder="CP"
                    />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}

              {isEditing && (
                <div className="flex space-x-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center"
                  >
                    {isLoading ? (
                      "Guardando..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </form>

            {/* Información adicional */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Seguridad</h3>
              <Button
                variant="outline"
                size="small"
                className="flex items-center"
              >
                <Lock className="h-4 w-4 mr-2" />
                Cambiar Contraseña
              </Button>
            </div>

            {/* Información de cuenta */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Miembro desde:</strong>{" "}
                {new Date(user?.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
