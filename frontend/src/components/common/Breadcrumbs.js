import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const Breadcrumbs = () => {
  const location = useLocation();
  const { customNames } = useBreadcrumb();

  console.log("🍞 Breadcrumbs - customNames:", customNames);
  console.log("🍞 Breadcrumbs - location:", location.pathname);

  //Dividir la ruta en segmentos
  const pathnames = location.pathname.split("/").filter((x) => x);

  //Mapeo de rutas a nombres legibles
  const routeNames = {
    products: "Productos",
    cart: "Carrito",
    checkout: "Checkout",
    about: "Nosotros",
    // Añade más rutas y nombres según sea necesario
  };

  // Función para obtener el nombre a mostrar
  const getDisplayName = (value, fullPath) => {
    // Primero revisar si hay un nombre personalizado para esta ruta completa
    if (customNames && customNames[fullPath]) {
      return customNames[fullPath];
    }

    // Si existe en routeNames, usar ese nombre
    if (routeNames[value]) {
      return routeNames[value];
    }

    // Si es un número, no mostrarlo
    if (!isNaN(value)) {
      return null;
    }

    // Capitalizar la primera letra como fallback
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  if (pathnames.length === 0) return null; // No mostrar breadcrumbs en la página de inicio

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Link to="/" className="hover:text-blue-600 flex items-center">
        <Home className="w-4 h-4 mr-1" />
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getDisplayName(value, to);

        // Si displayName es null (por ejemplo, es un ID numérico), no renderizar nada
        if (!displayName) return null;

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-gray-900 font-medium">{displayName}</span>
            ) : (
              <Link to={to} className="hover:text-blue-600">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
