import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap-grid.min.css";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Products from "./Components/Products/Products";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import AuthContextProvider from "./Components/Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Product from "./Components/Product/Product";
import CartContextProvider from "./Components/Context/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Paying from "./Components/Paying/Paying";
import Allorders from "./Components/Allorders/Allorders";
import Categories from "./Components/Categories/Categories";
import Brand from "./Components/Brand/Brand";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistContextProvider from "./Components/Context/WishlistContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      ,
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      ,
      {
        path: "product/:id",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      ,
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:id",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      ,
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "brand/:id",
        element: (
          <ProtectedRoute>
            <Brand />
          </ProtectedRoute>
        ),
      },
      {
        path: "paying",
        element: (
          <ProtectedRoute>
            <Paying />
          </ProtectedRoute>
        ),
      },
      ,
      {
        path: "register",
        element: <Register />,
      },
      ,
      {
        path: "login",
        element: <Login />,
      },
      ,
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      ,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <WishlistContextProvider>
        <CartContextProvider>
          <Toaster />
          <RouterProvider router={router} scrollToTop={"true"} />
        </CartContextProvider>
        </WishlistContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
