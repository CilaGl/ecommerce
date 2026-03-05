"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: { msg: "El nombre es obligatorio" },
          notEmpty: { msg: "Inserta el nombre" },
          len: {
            args: [3, 200],
            msg: "El nombre debe tener entre 3 y 200 caracteres",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "La descripción es obligatoria" },
          notEmpty: { msg: "Inserta una descripción" },
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "Ingresa el precio" },
          min: {
            args: [0],
            msg: "El precio debe ser mayor a 0",
          },
        },
      },
      sku: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
        comment: "Código Único del Producto",
      },
      product_image: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue:
          "https://tonydelfino.com/cdn/shop/files/TRAZOS-TSHIRT-KIDS-001_750x.jpg?v=1747352725",
      },
      product_additional_images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        comment: "Array de URLs de imágenes adicionales",
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { msg: "Ingresa una categoría" },
          isIn: {
            args: [
              [
                "clothes",
                "jewelry",
                "stickers",
                "accesories",
                "prints",
                "house",
              ],
            ],
            msg: "Categoría no válida",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
            msg: "El stock no puede ser negativo",
          },
        },
      },
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Producto destacado",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Producto activo / visible",
      },
      discount: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
        comment: "Porcentaje de descuento",
      },
      size: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        comment: "Etiquetas para búsqueda",
      },
    },
    {
      tableName: "products",
      timestamps: true,
      underscored: true,
      createdAt: "created_at", // Nombre personalizado
      updatedAt: "updated_at",
      indexes: [
        {
          fields: ["category"],
        },
        {
          fields: ["active"],
        },
        {
          fields: ["featured"],
        },
        {
          fields: ["name"],
          type: "FULLTEXT",
        },
      ],
    }
  );

  // ✅ Métodos de Instancia
  Product.prototype.getPriceWithDiscount = function () {
    if (this.discount > 0) {
      return this.price - this.price * (this.discount / 100);
    }
    return this.price;
  };

  Product.prototype.isInStock = function () {
    return this.stock > 0;
  };

  Product.prototype.toPublicJSON = function () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: parseFloat(this.price),
      priceWithDiscount: parseFloat(this.getPriceWithDiscount()),
      product_image: this.product_image,
      product_additional_images: this.product_additional_images,
      category: this.category,
      stock: this.stock,
      featured: this.featured,
      discount: parseFloat(this.discount),
      size: this.size,
      inStock: this.isInStock(),
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  };

  Product.prototype.getAverageRating = async function () {
    // Usar la asociación en lugar de sequelize.models
    const ratings = await this.getRatings(); //

    //const ratings = await sequelize.models.ProductRating.findAll({
    //  where: {product_id: this.id}
    //});

    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(2);
  };

  Product.prototype.getRatingInfo = async function () {
    const ratings = await this.getRatings();

    if (ratings.length === 0) {
      return {
        average: 0,
        count: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const distribution = ratings.reduce((acc, r) => {
      acc[r.rating] = (acc[r.rating] || 0) + 1;
      return acc;
    }, {});

    return {
      average: (sum / ratings.length).toFixed(2),
      count: ratings.length,
      distribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        ...distribution,
      },
    };
  };

  Product.associate = (models) => {
    Product.hasMany(models.ProductRating, {
      foreignKey: "product_id",
      as: "ratings",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
