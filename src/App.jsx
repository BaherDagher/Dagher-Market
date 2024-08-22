
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Error from './components/Error/Error';
import Cart from './components/Cart/Cart';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout/Checkout';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import PasswordReset from './components/PasswordReset/PasswordReset';
import VerifyProtectedRoute from './components/VerifyProtectedRoute/VerifyProtectedRoute';
import ResetProtectedRoute from './components/ResetProtectedRoute/ResetProtectedRoute';
import MyOrders from './components/MyOrders/MyOrders';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistContextProvider from './context/WishlistContext';
import SpecificCategoryProducts from './components/SpecificCategoryProducts/SpecificCategoryProducts';
import SpecificBrandProducts from './components/SpecificBrandProducts/SpecificBrandProducts';

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/checkout",
          element:
            (
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            )
        },
        {
          path: "/products",
          element:
            (
                <Products />
            )
        },
        {
          path: "/cart",
          element:
            (
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            )
        },
        {
          path: "/wishlist",
          element:
            (
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            )
        },
        {
          path: "/allorders",
          element:
            (
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            )
        },
        {
          path: "/brands",
          element:
            (
                <Brands />
            )
        },
        {
          path: "/categories",
          element:
            (
                <Categories />
            )
        },
        {
          path: "/product-details/:id/:category",
          element:
            (

              <ProductDetails />

            )
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/",
          element: <Home />
        },
        // {
        //   path: "/Dagher-Market/",
        //   element: <Home />
        // },
        // {
        //   path: "/Dagher-Market",
        //   element: <Home />
        // },
        {
          path: "/forget-password",
          element: <ForgetPassword />
        },
        {
          path: "/verify-code",
          element:
            <VerifyProtectedRoute>
              <VerifyCode />
            </VerifyProtectedRoute>
        },
        {
          path: "/password-reset",
          element:
            <ResetProtectedRoute>
              <PasswordReset />

            </ResetProtectedRoute>
        },
        {
          path: "/specific-categoury-products/:category",
          element:
              <SpecificCategoryProducts />
        },
        {
          path: "/specific-brand-products/:brand",
          element:
              <SpecificBrandProducts />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ],
  {
    basename: "/Dagher-Market/", // Add this line to set the base path
  }
  );

  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>


    </>
  )
}

export default App
