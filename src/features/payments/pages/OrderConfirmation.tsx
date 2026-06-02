import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderReceipt, { type OrderReceiptProps } from "./OrderReceipt";

/**
 * Route: /order-confirmation
 *
 * Receives the full receipt data via react-router location.state
 * (set by Checkout after a successful POST /order).
 *
 * If state is missing (e.g. user refreshes or navigates directly),
 * we redirect them to the menu instead of showing an empty screen.
 */
const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as OrderReceiptProps | null;

  useEffect(() => {
    if (!state?.orderNumber) {
      navigate("/menu", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.orderNumber) return null;

  return <OrderReceipt {...state} />;
};

export default OrderConfirmation;
