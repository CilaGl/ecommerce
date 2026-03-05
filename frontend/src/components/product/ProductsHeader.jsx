import Products from "../../pages/Products";

const ProductsHeader = ({searchTerm, isAdmin, AdminActions }) => {
    return (
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
                Productos
            </h1>

            {searchTerm && (
              <p className="text-gray-600">
                Resultados para:{" "}
                <span className="font-semibold">{searchTerm}</span>
              </p>
            )}
          </div>
          {/* Add Product Button - Solo para administradores */}
          {isAdmin() && AdminActions}
        </div>
    );
};

export default ProductsHeader;