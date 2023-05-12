import { useEffect, useState } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "app/context/AuthContext";
import LoginD from "components/LoginD";
import RegisterPage from "components/RegisterPage";
import SignUp from "components/Register";
import SignIn from "components/SignIn";
import PersonalLogin from "components/PersonalLogin";
import SignOut from "components/SignOut";
import Home from "pages/Home";
import PageNotFound from "pages/PageNotFound";
import ProfileScreen from "components/ProfileScreen";
import ChatHomeScreen from "features/chatDS/screens/ChatHomeScreen";
import GetTopicFeed from "features/chatDS/screens/GetTopicFeed";
import Main from "features/commerce/Pages/Main";
import Cart from "features/commerce/Pages/Cart";
import OrderList from "features/commerce/Pages/OrderList";
import Checkout from "features/commerce/Pages/Checkout";
import Success from "features/commerce/Pages/Success";
import MyAccount from "features/commerce/Pages/MyAccount";
import Search from "features/commerce/Pages/Search";
import Profile from "features/commerce/Pages/Profile";
import ShippingAddress from "features/commerce/Pages/ShippingAddress";
import Product from "features/commerce/Pages/Product";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const helmetContext = {};

  const [message, setMessage] = useState("");

  return (
    <div className="">
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={client}>
          <ToastContainer />
          <Router>
            <AuthProvider>
              <Routes>
                <Route>
                  <Route path="/login" element={<LoginD />} />
                  <Route path="/" element={<ChatHomeScreen />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/registerme" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/psignin/:slug?" element={<PersonalLogin />} />
                  <Route path="/signout" element={<SignOut />} />
                  <Route path="*" element={<PageNotFound />} />

                  <Route path="/profile" element={<ProfileScreen />} />

                  <Route path="/">
                    <Route index element={<ChatHomeScreen />} />
                    <Route path=":slug?" element={<GetTopicFeed />} />
                  </Route>



                  <Route path="/main">
                    <Route index element={<Main />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="admin/orders" element={<OrderList />} />
                    <Route path="cart/checkout" element={<Checkout />} />
                    <Route path="shipping-thank-you" element={<Success />} />
                    <Route path="account" element={<MyAccount />} />
                    <Route path="search" element={<Search />} />
                    <Route path="profile" element={<Profile />} />
                    <Route
                      path="shipping-address"
                      element={<ShippingAddress />}
                    />
                    <Route path="product/:slug?" element={<Product />} />
                  </Route>

                  {/* <Route path="/ras-product/:id?" element={<RasProduct />} />
                  <Route path="/ras-success" element={<RasMessage />} />
                  <Route path="ras-checkout/:id" element={<RasCheckOut />} />
                  <Route path="ras" element={<RasHomepage />} /> */}
                </Route>
              </Routes>
              {/* </Layout> */}
            </AuthProvider>
          </Router>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
