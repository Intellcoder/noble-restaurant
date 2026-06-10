import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./features/home/pages/HomePage";
import Layout from "./shared/layout/Layout";
import MenuPage from "./features/menu/pages/MenuPage";
import CheckOut from "./features/checkout/pages/CheckOut";
import VerifyPayment from "./features/payments/pages/verifyPayment";
import AboutPage from "./features/home/pages/AboutPage";
import ContactUsPage from "./features/home/pages/ContactPage";
import AdminLayout from "./features/admin/pages/AdminLayout";
import Categories from "./features/admin/pages/Categories";
import Products from "./features/admin/pages/Product";
import EditCategory from "./features/admin/pages/EditCategory";
import Dashboard from "./features/admin/pages/Dashboard";
import ReservationPage from "./features/reservation/ReservationPage";
import NewProduct from "./features/admin/pages/NewProduct";
import CreateCategory from "./features/admin/pages/CreateCategory";
import VerifyPayments from "./features/admin/pages/VerifyPayment";
import Reservation from "./features/admin/pages/Reservation";
import Orders from "./features/admin/pages/Orders";
import Combos from "./features/admin/pages/Combos";
import OrderConfirmation from "./features/payments/pages/OrderConfirmation";
import EditProduct from "./features/admin/pages/EditProduct";
import TrackOrder from "./features/orders/pages/TrackOrder";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            padding: "16px",
          },
        }}
      />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order" element={<TrackOrder />} />
          <Route path="payment/verify/paystack" element={<VerifyPayment />} />
          <Route path="reservation" element={<ReservationPage />} />
        </Route>
        <Route>
          <Route path="order-confirmation" element={<OrderConfirmation />} />
        </Route>
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/new" element={<CreateCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="product/new" element={<NewProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="combos" element={<Combos />} />
          <Route path="reservations" element={<Reservation />} />
          <Route path="payments" element={<VerifyPayments />} />
          <Route path="settings" element={<CheckOut />} />
          <Route path="promotions" element={<CheckOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
