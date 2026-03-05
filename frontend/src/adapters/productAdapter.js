const DEFAULT_IMAGE = "https://desarrollo.cedae.com.mx/images/no_product.png";

export const adaptProduct = (rawProduct) => {
  if (!rawProduct) return null;

  return {
    id: rawProduct.id,
    name: rawProduct.name ?? "",
    description: rawProduct.description ?? "",
    category: rawProduct.category ?? "",
    featured: Boolean(rawProduct.featured),

    // 🔢 Números normalizados
    price:
      rawProduct.price !== undefined && rawProduct.price !== null
        ? Number(rawProduct.price)
        : null,

    priceWithDiscount:
      rawProduct.priceWithDiscount !== undefined &&
      rawProduct.priceWithDiscount !== null
        ? Number(rawProduct.priceWithDiscount)
        : null,

    stock: rawProduct.stock ?? 0,

    // ⭐ Rating
    rating: rawProduct.ratingInfo?.average ?? rawProduct.rating ?? 0,
    ratingsCount: rawProduct.ratingInfo?.count ?? 0,

    // 🖼️ Imágenes
    product_image: rawProduct.product_image || DEFAULT_IMAGE,
    product_additional_images: Array.isArray(
      rawProduct.product_additional_images
    )
      ? rawProduct.product_additional_images
      : [],

    // Otros campos útiles
    size: rawProduct.size ?? null,
    discount: rawProduct.discount ?? 0,
    inStock: rawProduct.inStock ?? rawProduct.stock > 0,

    // Mantener referencia cruda (opcional, útil para debug)
    _raw: rawProduct,
  };
};

export const adaptProductList = (rawProducts = []) => {
  if (!Array.isArray(rawProducts)) return [];
  return rawProducts.map(adaptProduct).filter(Boolean);
};
