export function calculateShippingCost(subtotal) {
  const FREE_SHIPPING_THRESHOLD = 999;
  const STANDARD_SHIPPING_COST = 99;

  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = hasFreeShipping ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shippingCost;
  return {
    subtotal,
    shipping: {
      hasFreeShipping,
      cost: shippingCost,
    },
    total,
  };
}
