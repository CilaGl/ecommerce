import React from "react";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="primary"
              size="large"
              className="flex items-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Volver al Inicio
            </Button>
          </Link>

          <Link to="/products">
            <Button
              variant="outline"
              size="large"
              className="flex items-center"
            >
              <Search className="h-5 w-5 mr-2" />
              <span>Explorar Productos</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
