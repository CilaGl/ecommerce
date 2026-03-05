"use strict";

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

    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Playera Trazos Kids",
          description:
            "Playera 100% algodón con estampado artesanal Trazos para niñxs",
          price: 249,
          sku: "PLA-TRK-MED-001",
          product_image:
            "https://tonydelfino.com/cdn/shop/files/TRAZOS-TSHIRT-KIDS-001_750x.jpg?v=1747352725",
          product_additional_images: null,
          category: "clothes",
          stock: 20,
          featured: false,
          active: true,
          discount: 10,
          size: "M",
          tags: ["kids", "tshirt", "trazos", "cotton"],
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Collar Luna y Sol",
          description: "Collar artesanal con dije de luna y sol en plata",
          price: 999,
          sku: "COL-LYS-UNI-001",
          product_image:
            "https://i.etsystatic.com/6135095/r/il/5ea83d/1101437011/il_794xN.1101437011_q88k.jpg",
          product_additional_images: null,
          category: "jewelry",
          stock: 6,
          featured: true,
          active: true,
          discount: 0,
          size: null,
          tags: ["jewelry", "necklace", "moon", "sun"],
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sticker Pack Vibes",
          description: "Pack de 10 stickers con diseños únicos y coloridos",
          price: 99,
          sku: "STI-SKY-P10-001",
          product_image:
            "https://stickerobot.com/wp-content/uploads/2022/10/day-of-the-dead-stickers-1024x826.png",
          product_additional_images: [
            "https://tse4.mm.bing.net/th/id/OIP.eyw8neDxAezKkKC0dPaiRQHaFK?pid=Api&P=0&h=180",
          ],
          category: "stickers",
          stock: 50,
          featured: false,
          active: true,
          discount: 5,
          size: null,
          tags: ["stickers", "pack", "diademuertos", "art"],
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tote Bag Eco",
          description: "Bolsa de tela ecológica con diseño estampado",
          price: 899,
          sku: "TBG-ECO-UNI-001",
          product_image:
            "https://i.pinimg.com/736x/6a/90/81/6a9081bf53c0fea58ca7e78f9749f0ab.jpg",
          product_additional_images: null,
          category: "accesories",
          stock: 30,
          featured: false,
          active: true,
          discount: 0,
          size: "One Size",
          tags: ["bag", "eco", "tote", "sustainable"],
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Pantalones Estampados",
          description: "Pantalones 100% algodón estampados",
          price: 1490,
          sku: "PTS-EST-MED-001",
          product_image:
            "https://tonydelfino.com/cdn/shop/files/SHORT-001_1_576x.jpg",
          product_additional_images: null,
          category: "clothes",
          stock: 15,
          featured: true,
          active: true,
          discount: 0,
          size: "G",
          tags: ["cotton", "pants", "spooky", "clothes"],
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Anillo Murciélago",
          description: "Anillo en forma de murcielago acero inoxidable",
          price: 229,
          sku: "ANI-MUR-UNI-001",
          product_image:
            "https://2.bp.blogspot.com/-0jA0ZK_MKkE/TnAikkatNqI/AAAAAAAAD8I/6CB6y9U2Znc/s1600/Anillo%2Bmurcie%25CC%2581lago%2Balas%2Bcruzadas%2Bmetal%2Banimal%2Bajustable%2B2%2Bgeek%2Bfriki%2Bgadgets%2Bla%2Bguarida%2Bcosas%2Barturo%2Brosillo%2B.jpg",
          product_additional_images: null,
          category: "jewelry",
          stock: 12,
          featured: false,
          active: true,
          discount: 0,
          size: "U",
          tags: ["jewelry", "bath", "ring", "spooky"],
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
    await queryInterface.bulkDelete("products", null, {});
  },
};
