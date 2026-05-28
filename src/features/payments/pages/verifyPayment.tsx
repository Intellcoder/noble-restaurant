// pages/VerifyPayment.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentStatusCard from "../component/PaymentStatusCard";

type PaymentState = "loading" | "success" | "failed" | "pending";

interface PaymentVerificationResponse {
  success: boolean;
  paymentStatus: "PAID" | "FAILED" | "PENDING";
  orderId: string;
  customer: {
    phone: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
}

const VerifyPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const reference = new URLSearchParams(location.search).get("reference");

  const [paymentState, setPaymentState] = useState<PaymentState>("loading");
  const [pageError, setPageError] = useState("");
  const [orderData, setOrderData] =
    useState<PaymentVerificationResponse | null>(null);

  useEffect(() => {
    if (!reference) {
      setPaymentState("failed");
      setPageError("No payment reference found. Please try again.");
      return;
    }

    const controller = new AbortController();

    const verifyPayment = async () => {
      try {
        // ✅ simulate real network delay so loading state is actually visible
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // const res = await axios.get(`/api/payments/verify/${reference}`, {
        //   signal: controller.signal,
        // });
        // const data: PaymentVerificationResponse = res.data;

        const data: PaymentVerificationResponse = {
          success: true,
          paymentStatus: "PAID",
          orderId: "NR-20394",
          customer: { phone: "090876543232", address: "OWODE EDE" },
          items: [{ name: "Signature Jollof", quantity: 1, price: 6500 }],
          subtotal: 6500,
          deliveryFee: 1000,
          total: 7500,
          paymentMethod: "Bank Transfer",
        };

        if (controller.signal.aborted) return;

        if (data.success && data.paymentStatus === "PAID") {
          // ✅ set orderData BEFORE paymentState so data is ready when card renders
          setOrderData(data);
          setPaymentState("success");
        } else if (data.paymentStatus === "PENDING") {
          setOrderData(data);
          setPaymentState("pending");
        } else {
          setPaymentState("failed");
          setPageError("Payment could not be verified.");
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while verifying payment.";

        setPaymentState("failed");
        setPageError(message);
      }
    };

    verifyPayment();

    return () => controller.abort();
  }, [reference]);

  // ✅ loading renders correctly now — visible for the duration of the delay
  if (paymentState === "loading") {
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

  return (
    <PaymentStatusCard
      status={paymentState}
      orderId={orderData?.orderId ?? "—"}
      customer={orderData?.customer ?? { phone: "—", address: "—" }}
      items={orderData?.items ?? []}
      subtotal={orderData?.subtotal ?? 0}
      deliveryFee={orderData?.deliveryFee ?? 0}
      total={orderData?.total ?? 0}
      paymentMethod={orderData?.paymentMethod ?? "—"}
      errorMessage={paymentState === "failed" ? pageError : undefined}
      onPrimaryAction={() => {
        navigate(paymentState === "success" ? "/menu" : "/checkout");
      }}
      onSecondaryAction={() => navigate("/")}
    />
  );
};

export default VerifyPayment;
