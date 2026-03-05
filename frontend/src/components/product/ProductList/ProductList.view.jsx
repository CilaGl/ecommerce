import ProductCard from "../ProductCard/";

const ProductListView = ({ products = [], isAdmin, onDeleteProduct }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAdmin={isAdmin}
          onDelete={onDeleteProduct}
        ></ProductCard>
      ))}
    </div>
  );
};

export default ProductListView;