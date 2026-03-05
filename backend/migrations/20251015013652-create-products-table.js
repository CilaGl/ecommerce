"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sku: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true,
      },
      product_image: {
        type: Sequelize.STRING(500),
        allowNull: false,
        defaultValue:
          "https://tonydelfino.com/cdn/shop/files/TRAZOS-TSHIRT-KIDS-001_750x.jpg?v=1747352725",
      },
      product_additional_images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      discount: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
      },
      size: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // indices
    await queryInterface.addIndex("products", ["category"]);
    await queryInterface.addIndex("products", ["active"]);
    await queryInterface.addIndex("products", ["featured"]);
    await queryInterface.addIndex("products", ["name"]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("products");
  },
};
