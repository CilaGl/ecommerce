import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import Button from '../../ui/Button';
import ProductAdminActions from '../ProductAdminActions';

const ProductCardView = ({ 
    product, 
    isAdmin, 
    onAddToCart, 
    onDelete
 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="aspetct-w-1 aspect-h-1">
          <img
            src={product.product_image}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full">
              Destacado
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Agotado</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-orange-300">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onAddToCart}
            variant="success"
            className="w-full flex items-center justify-center space-x-2"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>
              {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
            </span>
          </Button>

          {/* Actions */}
          <Link to={`/products/${product.id}`} className="flex-shrink-0">
            <Button variant="outline">
              <Eye className="h-4 w-4" />
              <span>Ver detalles</span>
            </Button>
          </Link>

          {/* Botones de Admin - Solo visibles para administradores */}
          {isAdmin() && (
            <ProductAdminActions product={product} onDelete={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
};
    
export default ProductCardView;