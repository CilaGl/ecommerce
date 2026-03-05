import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1 Acerca De */}
          <div>
            <h3 className="text-xl font-bold mb-4">AYÑ Mi Tienda</h3>
            <p className="text-gray-400 mb-4">Spooky Season never goes away</p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ayntienda/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://twitter.com/ayntienda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención al Cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Preguntas Frecuentes</li>
              <li>Política de Envíos</li>
              <li>Política de Devoluciones</li>
              <li>Términos y Condiciones</li>
              <li>Política de Privacidad</li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@mitienda.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AYÑ Mi Tienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
