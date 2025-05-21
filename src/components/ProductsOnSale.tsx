import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { fetchProducts } from "../services/productsApi";
import Errors from "./Errors";
import ProductCard from "./ProductCard";
import { DISCOUNT_THRESHOLD } from "../utils/constants";
import { Product } from "../types/types";

function ProductsOnSale() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const productsOnSale = products.filter(
    (p) => p.discount > DISCOUNT_THRESHOLD
  );

  if (isLoading) return <Spinner />;
  if (error) return <Errors message="Failed to fetch products" />;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        Best Offers of the Moment!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {productsOnSale.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductsOnSale;
