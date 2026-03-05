import api from "./api";

const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },
};

export default orderService;
