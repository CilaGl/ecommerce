import ProductListView from "../ProductList/ProductList.view";
import ProductsState from "../ProductsState";

const FeaturedProductsView = ({ products, loading, error, isAdmin }) => {
   return ( 
      <section id="featuredSection" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Productos Destacados
          </h2>
          <ProductsState loading={loading} error={error} products={products}>
            <ProductListView products={products} isAdmin={isAdmin} />
          </ProductsState>
        </div>
      </section>
  );
};

export default FeaturedProductsView;