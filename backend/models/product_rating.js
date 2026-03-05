"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProductRating = sequelize.define(
    "ProductRating",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Inserte una calificación" },
          min: {
            args: [1],
            msg: "La calificación mínima es 1",
          },
          max: {
            args: [5],
            msg: "La calificación máxima es 5",
          },
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 1000],
            msg: "El comentario no puede exceder 1000 caracteres",
          },
        },
      },
    },
    {
      tableName: "product_ratings",
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "product_id"], // Evita calificaciones duplicadas del mismo usuario,
          name: "unique_user_product_rating",
        },
        {
          fields: ["product_id"],
        },
        {
          fields: ["user_id"],
        },
      ],
    }
  );

  // ✅ Métodos de instancia

  ProductRating.prototype.toPublicJSON = function () {
    return {
      id: this.id,
      user_id: this.user_id,
      product_id: this.product_id,
      rating: this.rating,
      comment: this.comment,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  };

  // ✅ Asociaciones
  ProductRating.associate = (models) => {
    ProductRating.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    ProductRating.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return ProductRating;
};
