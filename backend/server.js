const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");

//Cargar variables de entorno
dotenv.config();

const app = express();

// ==========================================
// MIDDLEWARE GLOBAL
// ==========================================

// CORS - DEBE IR ANTES de las rutas
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ==========================================
// RUTAS - SIN PROTECCIÓN GLOBAL
// ==========================================

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

// Rutas de prueba
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API de E-commerce con PostgreSQL funcionando correctamente",
    version: "1.0.0",
    database: "PostgreSQL",
    endpoints: {
      auth: "/api/auth",
      products: "/api/products",
    },
  });
});

// Ruta de health check
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "OK",
      database: "Conectado",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: "Desconectado",
      error: error.message,
    });
  }
});

// ==========================================
// ERROR HANDLERS
// ==========================================

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// Manejo de errores global
app.use((req, res) => {
  console.error("❌ Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Error en el servidor",
  });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos y luego iniciar el servidor
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conexión a PostgreSQL establecida correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📝 Modo: ${process.env.NODE_ENV}`);
      console.log(`🗄️  Base de datos: ${process.env.DB_NAME}`);
      console.log(`📡 API disponible en: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ No se pudo conectar a la base de datos:", err);
    process.exit(1);
  });
