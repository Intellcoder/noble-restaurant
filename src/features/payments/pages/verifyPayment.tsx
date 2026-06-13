import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentStatusCard from "../component/PaymentStatusCard";
import { api } from "../../../shared/api";

type PaymentStatus = "loading" | "success" | "failed" | "pending";

type Order = {
  success: boolean;
  message: string;
  id: string;
  orderNumber: string;
  phoneNumber: string;
  deliveryAddress: string;
  deliveryType: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: "PAID" | "FAILED" | "PENDING";
  orderStatus: string;
  items: [];
};



const VerifyPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const paymentReference = new URLSearchParams(location.search).get(
    "reference",
  );

  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [error, setError] = useState("");
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    if (!paymentReference) {
      setStatus("failed");
      setError("Missing payment reference");
      return;
    }

    const verifyPayment = async () => {
      try {
        setStatus("loading");

        const res = await api.get(`/order/verify-payment/${paymentReference}`);

        const { success, message, data } = res.data;

        const resData = data;

        if (!success) {
          setStatus("failed");
          setError(message || "Payment verification failed");
          return;
        }

        setOrderData(resData);

        console.log("payment status:", resData.paymentStatus);
        if (resData.paymentStatus === "PAID") {
          setStatus("success");
        } else if (resData.paymentStatus === "PENDING") {
          setStatus("pending");
        } else {
          setStatus("failed");
        }
      } catch (err: any) {
        setStatus("failed");
        setError(
          err?.response?.data?.message || err.message || "Something went wrong",
        );
      }
    };

    verifyPayment();
  }, [paymentReference]);

  if (status === "loading") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#F7F3ED]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="mt-6 text-2xl font-semibold">Verifying Payment...</h2>
          <p className="text-gray-500 mt-2">
            Please wait while we confirm your order.
          </p>
        </div>
      </section>
    );
  }

  console.log("orders", orderData);
  return (
    <PaymentStatusCard
      status={status}
      orderId={orderData?.orderNumber ?? "—"}
      customer={{
        phone: orderData?.phoneNumber ?? "—",
        address: orderData?.deliveryAddress ?? "—",
      }}
      items={orderData?.items ?? []}
      subtotal={orderData?.subtotal ?? 0}
      deliveryFee={orderData?.deliveryFee ?? 0}
      total={orderData?.totalAmount ?? 0}
      // paymentMethod="Monnify"
      errorMessage={status === "failed" ? error : undefined}
      onPrimaryAction={() =>
        navigate(status === "success" ? "/menu" : "/checkout")
      }
      onSecondaryAction={() => navigate("/")}
    />
  );
};

export default VerifyPayment;
