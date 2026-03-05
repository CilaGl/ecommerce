const express = require("express");
const router = express.Router();
const { Product, ProductRating, User } = require("../models");
const { Op } = require("sequelize");
const { protect, authorize, protectOptional } = require("../middleware/auth");

// ========================================
// RUTAS PÚBLICAS
// ========================================

// @route   GET /api/products
// @desc    Obtener todos los productos (con filtros y paginación)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      featured,
      size,
      sort = "created_at",
      order = "DESC",
      page = 1,
      limit = 20,
    } = req.query;

    console.log("🔍 GET /api/products - Query params:", req.query);

    // Construir filtros
    const where = { active: true };

    // Filtro por categoria
    if (category) {
      where.category = category;
    }

    // Filtro por por búsqueda (nombre o descripción)
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { tags: { [Op.contains]: [search.toLowerCase()] } },
      ];
    }

    // Filtro por rango de precio
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    // Filtro por productos destacados
    if (featured === "true") {
      where.featured = true;
    }

    // Filtro por talla
    if (size) {
      where.size = size;
    }

    // Paginación
    const offset = (page - 1) * limit;

    // Consulta con paginación
    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order: [[sort, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Formatear la respuesta
    const productsData = products.map((p) => p.toPublicJSON());

    console.log(`✅ Productos encontrados: ${count}`);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      products: productsData,
    });
  } catch (error) {
    console.error("❌ Error obteniendo productos:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  }
});

// @route       GET /api/products/featured
// @desc        Obtener productos destacados
// @access      Public
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        active: true,
        featured: true,
      },
      order: [["created_at", "DESC"]],
      limit: 8,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products: products.map((p) => p.toPublicJSON()),
    });
  } catch (error) {
    console.error("❌ Error obteniendo productos destacados:", error);
    res.status(500).json({
      success: false,
      message: " Error en el servidor ",
      error: error.message,
    });
  }
});

// @route     GET api/products/categories
// @desc      Obtener todas las categorias en conteo
// @access    Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.findAll({
      where: { active: true },
      attributes: [
        "category",
        [Product.sequelize.fn("COUNT", Product.sequelize.col("id")), "count"],
      ],
      group: ["category"],
    });

    res.status(200).json({
      success: true,
      categories: categories.map((c) => ({
        name: c.category,
        count: parseInt(c.dataValues.count),
      })),
    });
  } catch (error) {
    console.error("❌ Error obteniendo categorías:", error);
    res.status(500).json({
      success: false,
      mEessage: "Error en el servidor, error al obtener categorías",
      error: error.message,
    });
  }
});

// @route     GET /api/products/:id
// @desc      Obtener un producto por id
// @access    Public
router.get("/:id", protectOptional, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    const isAdmin = req.user?.role === "admin";

    if (!product || (!product.active && !isAdmin)) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    // Obtener información de ratings
    const ratingInfo = await product.getRatingInfo();

    res.status(200).json({
      success: true,
      product: {
        ...product.toPublicJSON(),
        ratingInfo,
      },
    });
  } catch (error) {
    console.error("❌ Error obteniendo producto:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor al obtener el producto",
      error: error.message,
    });
  }
});

// @route     GET /api/products/:id/ratings
// @desc      Obtener los ratings de un producto
// @access    Public

router.get("/:id/ratings", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: ProductRating,
          as: "ratings",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "avatar"],
            },
          ],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    const ratings = product.ratings.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      created_at: r.created_at,
      user: r.user
        ? {
            id: r.user.id,
            name: r.user.name,
            avatar: r.user.avatar,
          }
        : null,
    }));

    res.status(200).json({
      success: true,
      count: ratings.length,
      ratings,
    });
  } catch (error) {
    console.error("❌ Error obteniendo producto:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor al obtener el producto",
      error: error.message,
    });
  }
});

// @route     GET /api/products/category/:category
// @desc      Obtener productos por categoria
// @access    Public
router.get("/category/:category", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "created_at",
      order = "DESC",
    } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      where: {
        category: req.params.category,
        active: true,
      },
      order: [[sort, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      products: products.map((p) => p.toPublicJSON()),
    });
  } catch (error) {
    console.error("❌ Error obteniendo productos por categoría:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor al obtener productos por categoría",
      error: error.message,
    });
  }
});

// ========================================
// RUTAS DE RATINGS (Públicas y Privadas)
// ========================================

//  @route    POST /api/products/:id/rating
//  @desc     Agregar o actualizar rating de un producto
//  @access   Private
router.post("/:id/rating", protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product_id = req.params.id;
    const user_id = req.user.id;

    // Validar rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "El rating debe ser entre 1 y 5",
      });
    }

    // Validar que el producto existe
    const product = await Product.findByPk(product_id);

    if (!product || !product.active) {
      return res.status(404).json({
        success: false,
        message: "Producto no disponible para calificar",
      });
    }

    // Buscar si ya existe un rating de este usuario para este producto
    let product_rating = await ProductRating.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });

    let isNew = false;

    if (product_rating) {
      // Actualizar rango existente
      await product_rating.update({ rating, comment });
    } else {
      // Crear nuevo rating
      product_rating = await ProductRating.create({
        user_id,
        product_id,
        rating,
        comment,
      });
      isNew = true;
    }

    const ratingInfo = await product.getRatingInfo();

    res.status(200).json({
      success: true,
      message: isNew ? "Rating agregado" : "Rating actualizado",
      rating: {
        ...product_rating.toPublicJSON(),
        product_id,
        ratingInfo,
      },
    });
  } catch (error) {
    console.error("❌ Error agregando reseña:", error);

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: error.errors.map((e) => e.message).join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error en el servidor al agregar la reseña",
      error: error.message,
    });
  }
});

// @route     DELETE /api/products/:id/rating
// @desc      Eliminar rating de un producto
// @access    Private
router.delete("/:id/rating", protect, async (req, res) => {
  try {
    const product_id = req.params.id;
    const user_id = req.user.id;

    const rating = await ProductRating.findOne({
      where: { user_id, product_id },
    });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "No tienes una reseña para este producto",
      });
    }

    await rating.destroy();

    res.status(200).json({
      success: true,
      message: "Rating eliminado correctamente",
    });
  } catch (error) {
    console.log("❌ Error eliminando rating:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor al eliminar rating",
      error: error.message,
    });
  }
});

// ========================================
// RUTAS DE ADMINISTRACIÓN (Solo Admin)
// ========================================

// @route     POST /api/products
// @desc      Crear nuevo producto (Admin)
// @access    Private / Admin
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    console.log("📦 Dando de alta un producto: ", req.body);

    const product = await Product.create(req.body);

    console.log("✅ Producto registrado exitosamente:", product.id);

    res.status(201).json({
      success: true,
      product: product.toPublicJSON(),
    });
  } catch (error) {
    console.error("❌ Error creando producto:", error);

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "El SKU ya existe",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error en el servidor al dar de alta el producto",
      error: error.message,
    });
  }
});

// @route     PUT /api/products/:id
// @desc      Actualizar producto (Admin)
// @access    Private / Admin
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    console.log("📝 Actualizando producto:", req.params.id);

    await product.update(req.body);

    console.log("✅ Producto actualizado");

    res.status(200).json({
      success: true,
      product: product.toPublicJSON(),
    });
  } catch (error) {
    console.error("❌ Error actualizando producto:", error);

    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error en el servidor al actualizar el producto",
      error: error.message,
    });
  }
});

// @route     DELETE /api/products/:id
// @desc      Eliminar producto - Soft delete (Admin)
// @access    Private / Admin
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    console.log("🗑️ Eliminando producto (soft delete):", req.params.id);

    // Soft delete - solo marcar como inactivo
    await product.update({ active: false });

    console.log("Producto eliminado (soft delete)");

    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error("❌ Error eliminando producto:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor al tratar de eliminar el producto",
      error: error.message,
    });
  }
});

// @route     PATCH /api/products/:id/stock
// @desc      Actualizar stock del producto (Admin)
// @access    Provate / Admin
router.patch("/:id/stock", protect, authorize("admin"), async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock inválido",
      });
    }

    await product.update({ stock: parseInt(stock) });

    res.status(200).json({
      success: true,
      message: "Stock actualizado",
      product: product.toPublicJSON(),
    });
  } catch (error) {
    console.error("❌ Error actualizando stock:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor al actualizar el stock",
      error: error.message,
    });
  }
});

// @route     GET /api/products/admin/all
// @desc      Obtener TODOS los productos incluyendo inactivos (Admin)
// @access    Private / Admin
router.get("/admin/all", protect, authorize("admin"), async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      products: products.map((p) => ({
        ...p.toPublicJSON(),
        active: p.active, // Incluir campo active para admin
        sku: p.sku, // Incluir SKU para admin
        tags: p.tags, // Incluir tags para admin
      })),
    });
  } catch (error) {
    console.error("❌ Error obteniendo todos los productos:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor al obtener todos los productos",
      error: error.message,
    });
  }
});

module.exports = router;
