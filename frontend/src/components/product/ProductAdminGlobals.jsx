import { Link } from "react-router-dom";
import { Plus as PlusIcon } from "lucide-react";

const ProductAdminGlobals = () => {
    return(
        <Link
            to="/products/new"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden sm:inline"> Agregar Producto</span>
        </Link>
        
    );
};

export default ProductAdminGlobals;