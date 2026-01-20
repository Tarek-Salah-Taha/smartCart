import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryProducts from "./components/CategoryProducts";
import BrandProducts from "./components/BrandProducts";
import Spinner from "./components/Spinner";

// Lazy load the page components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Categories = lazy(() => import("./pages/Categories"));
const Brands = lazy(() => import("./pages/Brands"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const FAQs = lazy(() => import("./pages/FAQs"));
const TermsAndPolicies = lazy(() => import("./pages/TermsAndPolicies"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        {/* Suspense fallback will show while lazy components load */}
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="allProducts" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route
              path="/categories/:category"
              element={<CategoryProducts />}
            />
            <Route path="brands" element={<Brands />} />
            <Route path="brands/:brand" element={<BrandProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/termsAndPolicies" element={<TermsAndPolicies />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#1f2937",
            color: "#f9fafb",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
