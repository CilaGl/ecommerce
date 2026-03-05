import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  UserCircle,
  LogOut,
  Crown,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout, isAdmin, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("🔍 Search ejecutado con término:", searchTerm); // DEBUG
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm(""); // Limpiar búsqueda después de navegar
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Debug - Ver estado de auth
  useEffect(() => {
    console.log("🔐 Header - Auth State:", {
      isAuthenticated,
      user: user?.name,
      role: user?.role,
      isAdmin: isAdmin ? isAdmin() : false,
      loading,
    });
  }, [isAuthenticated, user, isAdmin, loading]);

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold hover:text-blue-400 transition-colors">
              AYÑ Mi Tienda
            </h1>
          </Link>

          {/* Menú de navegación */}
          <nav className="hidden md:flex space-x-6 items-center float-left">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 font-bold"
                  : "hover:text-green-400 hover:font-bold transition-colors"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 font-bold"
                  : "hover:text-green-400 hover:font-bold transition-colors"
              }
            >
              Productos
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 font-bold"
                  : "hover:text-green-400 hover:font-bold transition-colors"
              }
            >
              Sobre Nosotros
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 font-bold"
                  : "hover:text-green-400 hover:font-bold transition-colors"
              }
            >
              Contacto
            </NavLink>
          </nav>

          {/* Barra de búsqueda */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-lg mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Right side - Carrito y Auth */}
          <div className="flex items-center space-x-4">
            {/* Carrito */}
            <Link to="/cart">
              <button className="relative flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Carrito</span>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </Link>

            {/* Auth buttons - Desktop */}
            <div className="hidden md:block">
              {loading ? (
                // Loading state
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="animate-pulse flex items-center space-x-2">
                    <div className="h-5 w-5 bg-gray-600 rounded-full"></div>
                    <div className="h-4 w-20 bg-gray-600 rounded"></div>
                  </div>
                </div>
              ) : isAuthenticated && user ? (
                // Usuario autenticado - Menú desplegable
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    {/* 1. Icono: Crown para Admin, UserCircle para Usuario normal */}
                    {isAdmin && isAdmin() ? (
                      <Crown className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <UserCircle className="h-5 w-5" />
                    )}
                    <div className="flex items-center">
                      {/* 2. Nombre del usuario */}
                      <span className="text-sm max-w-28 truncate">
                        {user?.name || "Usuario"}
                      </span>

                      {/* 3. Etiqueta (Badge) de Admin a la derecha */}
                      {isAdmin && isAdmin() && (
                        <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-400 text-gray-900 whitespace-nowrap">
                          Admin
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                        {isAdmin && isAdmin() && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-400 text-gray-900 mt-1">
                            <Crown className="h-3 w-3 mr-1" />
                            ADMIN
                          </span>
                        )}
                      </div>
                      {/* Menu Items */}x|
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Mi Perfil
                      </Link>
                      {/* Admin Links */}
                      {isAdmin && isAdmin() && (
                        <>
                          <div className="border-t border-gray-200 my-1"></div>
                          <Link
                            to="/admin/products"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                          >
                            <Crown className="h-4 w-4 mr-2" />
                            Panel Admin
                          </Link>
                        </>
                      )}
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Usuario no autenticado
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="outline" size="small">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="small">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Botón menú móvil */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-700 pt-4">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 transition-colors ${
                  isActive ? "text-green-300 font-bold" : "hover:text-blue-400"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 transition-colors ${
                  isActive ? "text-green-300 font-bold" : "hover:text-blue-400"
                }`
              }
            >
              Productos
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 transition-colors ${
                  isActive ? "text-green-300 font-bold" : "hover:text-blue-400"
                }`
              }
            >
              Sobre Nosotros
            </NavLink>

            {/* Auth links mobile */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              {loading ? (
                <div className="py-2 text-gray-400">Cargando... </div>
              ) : isAuthenticated && user ? (
                <>
                  <div className="py-2 border-b border-gray-700 mb-2">
                    <p className="text-sm font-medium">
                      {isAdmin && isAdmin() ? "👑" : "👤"}{" "}
                      {user?.name || "Usuario"}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                    {isAdmin && isAdmin() && (
                      <span className="inline-block mt-1 text-xs bg-yellow-500 text-gray-900 px-2 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-blue-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    👤 Mi Perfil
                  </Link>

                  {isAdmin && isAdmin() && (
                    <Link
                      to="/admin/products"
                      className=""
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      👑 Panel Admin
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-blue-400 transition-colors"
                  >
                    🚪 Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-blue-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🔐 Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 hover:text-blue-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ✨ Registrarse
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
