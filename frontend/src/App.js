// src/App.js
import React, { useState, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Contact } from "lucide-react";

// Contexts
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";

// Páginas
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/cart/";
import Checkout from "./features/checkout/";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

//Componentes
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Protected Routes
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RequireCartRoute from "./components/common/RequireCartRoute";

import "./styles/globals.css";

// Páginas de autenticación
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Profile = lazy(() => import("./pages/auth/Profile"));

function App() {
  console.log("🚀 App renderizado");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    console.log("🔍 App recibió busqueda: ", term);
    setSearchTerm(term);
  };

  return (
    <AuthProvider>
      <BreadcrumbProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-100 flex flex-col">
              <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: "#10b981",
                      secondary: "#fff",
                    },
                  },
                }}
              />
              <Header onSearch={handleSearch} />
              <main className="flex-1">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Rutas de autenticación */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rutas protegidas  - Solo autenticación */}

                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />

                    {/* Rutas protegidas - Autenticación + Carrito */}

                    <Route
                      path="/checkout"
                      element={
                        <RequireCartRoute>
                          <Checkout />
                        </RequireCartRoute>
                      }
                    />
                    <Route path="about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                    {/*<ProductList searchTerm={searchTerm} />*/}
                  </Routes>
                </Suspense>
              </main>
              {/*<footer className="bg-gray-800 text-white text-center py-4 mt-12">
              <p>&copy; 2025 AYÑ Mi Tienda. Todos los derechos reservados. </p>
            </footer>*/}
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </BreadcrumbProvider>
    </AuthProvider>
  );
}

export default App;
