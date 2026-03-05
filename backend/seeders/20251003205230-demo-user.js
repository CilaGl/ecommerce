"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin123!", salt);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Demo user",
          email: "demo@mitienda.com",
          password: hashedPassword,
          role: "user",
          avatar:
            "https://www.creativefabrica.com/wp-content/uploads/2023/09/10/Cute-Ghost-Halloween-Clipart-PNG-Graphics-78929958-1-1-580x387.png",
          phone: "123-456-7890",
          is_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Admin demo",
          email: "admin@mitienda.com",
          password: hashedPassword,
          role: "admin",
          avatar:
            "https://www.creativefabrica.com/wp-content/uploads/2023/09/10/Cute-Ghost-Halloween-Clipart-PNG-Graphics-78929958-1-1-580x387.png",
          is_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
