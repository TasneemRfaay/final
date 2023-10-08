import "./App.css";
import Home from "./components/home/Home";
import Layout from "./components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./components/products/Products";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Cart from "./components/carts/Cart";
import Notdound from "./components/notfound/Notdound";
import UserContext from "./components/context/userToken";
import Logout from "./components/logout/Logout";
// import { useEffect } from "react";
import Protected from "./components/protectedRouter/Protected";
import ProdDetalis from "./components/ProdDetails/ProdDetalis";
import { CartContextProvider } from "./components/context/cartContext";
import { Toaster } from "react-hot-toast";
import CashPayment from "./components/CashPayment/CashPayment";
import AllOrders from "./components/AllOrders/AllOrders";
import ForgotPass from "./components/forgoPassword/ForgotPass";
import ReasetPass from "./components/ResetPass/ReasetPass";
import WishList from "./components/wishList/WishList";
import { WishListContextProvider } from "./components/context/wishList";
import Categories from "./components/Category/Categories";
import Brands from "./components/brands/Brands";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "home",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "products",
        element: (
          <Protected>
            <Products />
          </Protected>
        ),
      },
      {
        path: "prodDetails/:id",
        element: (
          <Protected>
            <ProdDetalis />
          </Protected>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgotPass",
        element: <ForgotPass />,
      },
      {
        path: "resetPass",
        element: <ReasetPass />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "wishList",
        element: (
          <Protected>
            <WishList />
          </Protected>
        ),
      },
      {
        path: "cash",
        element: (
          <Protected>
            <CashPayment />
          </Protected>
        ),
      },
      {
        path: "allorders",
        element: (
          <Protected>
            <AllOrders />
          </Protected>
        ),
      },
      {
        path: "cateogry",
        element: (
          <Protected>
            <Categories />
          </Protected>
        ),
      },
      {
        path: "brands",
        element: (
          <Protected>
            <Brands />
          </Protected>
        ),
      },

      { path: "logout", element: <Logout /> },
      {
        path: "*",
        element: <Notdound />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <WishListContextProvider>
        <CartContextProvider>
          <UserContext>
            <RouterProvider router={router} />
          </UserContext>
          <Toaster />
        </CartContextProvider>
      </WishListContextProvider>
    </div>
  );
}

export default App;
