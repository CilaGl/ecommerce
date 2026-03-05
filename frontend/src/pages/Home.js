import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Truck, Shield, HeadphonesIcon } from "lucide-react";
import Button from "../components/ui/Button";
import FeaturedProductsContainer from "../components/product/FeaturedProducts/FeaturedProducts.container";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AYÑ Mi Tiendita
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              La Spooky Season llegó para quedarse 🎃👻
            </p>
            <Link to="/products">
              <Button variant="success" size="large">
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Envío Grati</h3>
              <p className="text-gray-600">En compras mayores a $999</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compra Segura</h3>
              <p className="text-gray-600">Protección al comprador</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Soporte</h3>
              <p className="text-gray-600">
                Escribenos y resolveremos tus dudas
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Devoluciones</h3>
              <p className="text-gray-600">30 días después de tu compra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}

      <FeaturedProductsContainer />
    </div>
  );
};

export default Home;
