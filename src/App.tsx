import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Products from "./pages/Products";
import Product from "./pages/Product";
import AdminProduct from "./admin/AdminProduct";
import PersonalData from "./components/MyAccount/PersonalData";
import UserRoute from "./routes/UserRoute";
import OrderHistory from "./components/MyAccount/OrderHistory";
import MyAccount from "./pages/MyAccount";
import HaveUser from "./routes/HaveUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: (
          <HaveUser>
            <SignUp />
          </HaveUser>
        ),
      },
      {
        path: "/signin",
        element: (
          <HaveUser>
            <SignIn />
          </HaveUser>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <UserRoute>
            <WishList />
          </UserRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <UserRoute>
            <Cart />
          </UserRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <UserRoute>
            <CheckOut />
          </UserRoute>
        ),
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/admin/product",
        element: (
          <UserRoute>
            <AdminProduct />
          </UserRoute>
        ),
      },
      {
        path: "/myaccount",
        element: (
          <UserRoute>
            <MyAccount />
          </UserRoute>
        ),
        children: [
          {
            path: "/myaccount/profile",
            element: <PersonalData />,
          },
          {
            path: "/myaccount/order",
            element: <OrderHistory />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
