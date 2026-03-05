const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Proteger rutas - verificat JMT
const protect = async (req, res, next) => {
  let token;

  //Verificar si el token está en el header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //Verificar que el token exista
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No autorizado, token no proporcionado",
    });
  }

  try {
    //Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Obtener el usuario del token (sin el password para mayor seguridad)
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "No autorizado, usuario no encontrado",
      });
    }

    next();
  } catch (error) {
    console.error("❌ Error en autenticación:", error);
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

// Verificar roles específicos
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `El rol ${req.user.role} no está autorizado para acceder a esta ruta`,
      });
    }
    next();
  };
};

const protectOptional = async (req, res, next) => {
  let token;

  try {
    // 1️⃣ Buscar token en header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ Si no hay token → continuar
    if (!token) {
      return next();
    }

    // 3️⃣ Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Obtener usuario
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    // 5️⃣ Si existe, setear req.user
    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    // 🚨 IMPORTANTE: no bloquear
    console.warn("⚠️ protectOptional error:", error.message);
    return next();
  }
};

module.exports = {
  protect,
  authorize,
  protectOptional,
};
