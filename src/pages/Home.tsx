import FeaturedBrands from "../components/FeaturedBrands";
import ProductsOnSale from "../components/ProductsOnSale";
import SaleBanner from "../components/SaleBanner";
import PopularCategories from "../components/PopularCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import NewsletterSignup from "../components/NewsletterSignup";

function Home() {
  return (
    <div className="mx-auto mb-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-8 md:space-y-12">
        <SaleBanner />
        <PopularCategories />
        <FeaturedBrands />
        <ProductsOnSale />
        <WhyChooseUs />
        <Testimonials />
        <NewsletterSignup />
      </div>
    </div>
  );
}

export default Home;
