"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Métodos de instancia

    // 🧩 Método de instancia para comparar contraseñas
    async matchPassword(enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    }

    // 🔐 Método de instancia para generar token JWT
    getSignedJwtToken() {
      return jwt.sign(
        { id: this.id, email: this.email, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
    }

    // 🧹 Método para ocultar la contraseña al devolver el usuario
    toSafeObject() {
      const { password, ...userWithoutPassword } = this.toJSON();
      return userWithoutPassword;
    }

    //Asociaciones
    static associate(models) {
      //User.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
      //User.hasMany(models.ProductReview, {
      // foreignKey: "user_id",
      //as: "reviews",
      //});
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "El nombre no puede estar vacío" },
          notNull: { msg: "El nombre es obligatorio" },
          len: {
            args: [2, 100],
            msg: "El nombre debe tener entre 2 y 100 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          msg: "El email ya está registrado",
          args: true,
        },
        validate: {
          notNull: { msg: "El email es requerido" },
          notEmpty: { msg: "El email no puede estar vacío" },
          isEmail: { msg: "Por favor ingresa un email válido" },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: "La contraseña es requerida" },
          notEmpty: { msg: "La contraseña no puede estar vacía" },
          len: {
            args: [6, 255],
            msg: "La contraseña debe tener al menos 6 caracteres",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      avatar: {
        type: DataTypes.STRING(255),
        defaultValue:
          "https://www.creativefabrica.com/wp-content/uploads/2023/09/10/Cute-Ghost-Halloween-Clipart-PNG-Graphics-78929958-1-1-580x387.png",
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      // Dirección como JSON
      address: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_verified",
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "last_login",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at", // 👈 coincide con la columna
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at", // 👈 coincide con la columna
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", // 👈 Forzamos el nombre exacto
      timestamps: true,
      underscored: true,
      hooks: {
        //  Hook para encriptar password antes de crear
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        // Hook para encriptar password antes de actualizar
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
