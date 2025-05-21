import FeaturedBrands from "../components/FeaturedBrands";
import ProductsOnSale from "../components/ProductsOnSale";
import SaleBanner from "../components/SaleBanner";
import PopularCategories from "../components/PopularCategories";

function Home() {
  return (
    <div className="container mx-auto mb-10">
      <SaleBanner />
      <PopularCategories />
      <FeaturedBrands />
      <ProductsOnSale />
    </div>
  );
}

export default Home;
