import { ShoppingCart, Star } from "lucide-react";  
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Button from "../../components/ui/Button";
import  ProductRatings from "../../components/product/ProductRatings";

const ProductDetailView = ({ 
    product, 
    loading,
    error,
    onAddToCart,
    onBack 
}) => {
    if(loading){
        return <div className="text-center py-12">Cargando producto...</div>;
    }

    if(error || !product){
         return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">
                {error || "Producto no encontrado"}
                </h2>
                <Button onClick={onBack}>
                Volver a Productos
                </Button>
            </div>
        );
    }

    return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumbs />

      {/*<div className="mb-6">
        <Link
          to="/products"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Productos
        </Link>
      </div>*/}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.product_image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  index < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={index < product.rating ? "currentColor" : "none"}
              />
            ))}

            <span className="ml-2 text-sm text-gray-600">
              {product.rating ?? 0} de {product.ratingsCount} reseñas
            </span>
          </div>

          <p className="text-4xl font-bold text-blue-950 mb-6">
            {product.price !== undefined
              ? ` $${Number(product.price).toFixed(2)}`
              : "Precio no disponible"}
          </p>

          <p className="text-gray-700 mb-6 text-lg">
            {product.description}
        </p>

          <div className="mb-6 ">
            <span className="text-gray-600">Categoría: </span>
            <span className="text-gray-800 font-semibold capitalize">
              {product.category}
            </span>
          </div>

          <div className="mb-8">
            <span className="text-gray-600">Stock disponible: </span>
            <span
              className={`font-semibold ${
                product.stock > 5 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock} unidades
            </span>
          </div>

          <Button
            onClick={onAddToCart}
            variant="success"
            size="large"
            className="w-full md:w-auto flex items-center justify-center"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {product.stock === 0 ? "Agotado" : "Agregar al Carrito"}
          </Button>

          {/* Caracteristicas Adicionales */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-bold mb-4">
              Características Adicionales
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>✓ Garantía de 30 días</li>
              <li>✓ Envío gratis en compras mayores a $999</li>
              <li>✓ Producto 100% original</li>
            </ul>
          </div>
        </div>
      </div>

      <ProductRatings productId={product.id} />
    </div>
  );

    
};

export default ProductDetailView;