import {Link, link} from "react-router-dom";

const ProductAdminActions = ({ product, onDelete }) => {
    return(
        <>
            <Link
                to={`/products/${product.id}/edit`}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 rounded-lg text-sm font-medium"
            > 
                Editar
            </Link>

            <button 
                onClick={() => onDelete(product.id, product.name)}
                className="px-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
                title="Eliminar producto"
            >
                🗑️
            </button>
        </>
    );
};

export default ProductAdminActions;