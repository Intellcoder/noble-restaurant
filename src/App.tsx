import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/pages/HomePage";
import Layout from "./shared/layout/Layout";
import MenuPage from "./features/menu/pages/MenuPage";
import CheckOut from "./features/checkout/pages/CheckOut";
import Cart from "./features/cart/pages/Cart";
import VerifyPayment from "./features/payments/pages/verifyPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<MenuPage />} path="/contact" />
          <Route element={<MenuPage />} path="/about" />
          <Route element={<MenuPage />} path="/menu" />
          <Route element={<CheckOut />} path="/checkout" />
          <Route element={<VerifyPayment />} path="/verifypayment" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<CheckOut />} path="/reservation" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
