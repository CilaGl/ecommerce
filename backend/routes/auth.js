const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { protect } = require("../middleware/auth");

// @route   POST /api/auth/register
// @desc    Registrar un nuevo usuario
// @access  Public

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Validar que todos los campos estén prsesentes
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Por favor, complete todos los campos",
      });
    }

    //Verificar si el usuario ya existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    //Crear nuevo usuario (el password se encripta automáticamente con el hook antes de guardar)
    const user = await User.create({ name, email, password });

    //Generar token JWT
    const token = user.getSignedJwtToken();

    //Obtener usuario sin el password
    const userResponse = user.toSafeObject();
    res.status(201).json({ success: true, token, user: userResponse });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    // Manejo de errores de validación de Sequelize
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  }
});

// @route   POST api/auth/login
// @desc    Iniciar sesión
// @access  Public

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar email y password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Por favor proporciona email y contraseña",
      });
    }

    // Buscar usuario (incluir password para verificar)
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Usuario y/o contraseña inválido",
      });
    }

    // Verificar password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Usuario y/o contraseña inválido",
      });
    }

    // Actualizar último login
    await user.update({ lastlogin: new Date() });

    //Generar Token
    const token = user.getSignedJwtToken();

    // Obtener usuario sin password
    const userResponse = user.toSafeObject();

    res.status(200).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
});

// @route   GET /api/auth/me
// @desc    Obtener usuario actual
// @access  Private

router.get("/me", protect, async (req, res) => {
  try {
    // protect middleware debe agregar req.user
    if (!req.user) {
      return res.status(401).json({
        succes: false,
        message: "No autenticado",
      });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error("❌ Error obteniendo usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
});

// @route   PUT /api/auth/update
// @desc    Actualizar perfil de usuario
// @access  Private

router.put("/update", protect, async (req, res) => {
  try {
    // Extraer los datos y preparar el objeto de actualización
    const { name, email, phone, address } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;
    if (phone !== undefined) fieldsToUpdate.phone = phone;
    if (address) fieldsToUpdate.address = address;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      // Si no se encuentra, detente y envía una respuesta 404
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado para actualizar.",
      });
    }

    // Llamar al método de instancia .update()
    await user.update(fieldsToUpdate);

    res.status(200).json({
      success: true,
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error("❌ Error actualizando usuario:", error);

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(""),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
});

// @route   PUT /api/auth/updatepassword
// @desc    Actualizar contraseña
// @access  Private

router.put("/updatepassword", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Por favor proporciona la contraseña actual y la nueva",
      });
    }

    //Obtener usuario con password
    const user = await User.findByPk(req.user.id);

    //Verificar contraseña actual
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Contraseña actual incorrecta",
      });
    }

    //Actualizar password (se encripta automáticamente en el hook)
    await user.update({ update: newPassword });

    const token = user.getSignedJwtToken();

    res.status(200).json({
      succes: true,
      token,
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error("❌ Error actualizando contraseña:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
});

module.exports = router;
