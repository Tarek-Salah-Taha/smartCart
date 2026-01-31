import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "./features/cart/cartSlice";
import { clearFavorites } from "./features/favorites/favoritesSlice";
import supabase from "./services/supabase";

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
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const FAQs = lazy(() => import("./pages/FAQs"));
const TermsAndPolicies = lazy(() => import("./pages/TermsAndPolicies"));
const ContactSupport = lazy(() => import("./pages/ContactSupport"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        queryClient.clear();

        if (event === "SIGNED_OUT") {
          dispatch(clearCart());
          dispatch(clearFavorites());
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

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
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/termsAndPolicies" element={<TermsAndPolicies />} />
            <Route path="/contactSupport" element={<ContactSupport />} />
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
