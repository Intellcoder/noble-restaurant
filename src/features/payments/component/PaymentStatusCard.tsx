// components/PaymentStatusCard.tsx
import successImage from "../../../assets/noble-restaurant-order-success.png";
import failedImage from "../../../assets/noble-restaurant-order-error.png";
import { CheckCircle2, XCircle, Clock3 } from "lucide-react";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

// ✅ aligned with VerifyPayment's PaymentState
type PaymentStatus = "success" | "failed" | "pending";

type Props = {
  status: PaymentStatus;
  orderId: string;
  customer: { phone: string; address: string };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  errorMessage?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

const PaymentStatusCard = ({
  status,
  orderId,
  customer,
  items,
  subtotal,
  deliveryFee,
  total,
  paymentMethod,
  errorMessage,
  onPrimaryAction,
  onSecondaryAction,
}: Props) => {
  const statusConfig = {
    success: {
      image: successImage,
      title: "Order Placed Successfully!",
      subtitle: "Thank you for choosing Noble Restaurant",
      color: "text-green-600",
      border: "border-green-200",
      bg: "bg-green-50",
      icon: <CheckCircle2 size={28} />, // ✅ added missing icon
      primaryBtn: "Browse Menu Again",
      secondaryBtn: "Back To Home",
    },
    failed: {
      image: failedImage,
      title: "Payment Failed",
      subtitle: "We could not verify your payment",
      color: "text-red-600",
      border: "border-red-200",
      bg: "bg-red-50",
      icon: <XCircle size={28} />,
      primaryBtn: "Try Payment Again",
      secondaryBtn: "Back To Checkout",
    },
    pending: {
      image: successImage,
      title: "Payment Verification Pending",
      subtitle: "We are currently verifying your transfer",
      color: "text-yellow-600",
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      icon: <Clock3 size={28} />,
      primaryBtn: "Refresh Status",
      secondaryBtn: "Back To Home",
    },
  };

  const current = statusConfig[status];

  return (
    <section className="bg-[#F7F3ED] min-h-screen py-16 px-5">
      <div className="max-w-5xl mx-auto">
        {/* STATUS HEADER */}
        <div className="flex flex-col items-center text-center">
          <img
            src={current.image}
            alt={`noble-restaurant-${status}`}
            className="w-36 md:w-44"
          />

          {/* ✅ icon now renders — removed comment wrapper */}
          {/* <div className={`mt-5 flex items-center gap-2 ${current.color}`}>
            {current.icon}
          </div> */}

          <h1 className="mt-5 font-[Playfair_Display] text-4xl md:text-5xl font-bold text-gray-900">
            {current.title}
          </h1>

          <p className="mt-4 text-gray-500 text-lg">{current.subtitle}</p>

          <div
            className={`mt-6 ${current.bg} ${current.border} border px-5 py-3 rounded-full`}
          >
            <p className="font-medium">Order ID: #{orderId}</p>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {status === "failed" && errorMessage && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700">
            {errorMessage}
          </div>
        )}

        {/* SUMMARY CARD */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div className="mt-5 space-y-2 text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Phone:</span>{" "}
                {customer.phone}
              </p>
              <p>
                <span className="font-medium text-gray-900">Address:</span>{" "}
                {customer.address}
              </p>
            </div>
          </div>

          <div className="border-t my-8" />

          <div>
            <h2 className="text-2xl font-semibold">Order Items</h2>
            <div className="mt-5 space-y-5">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-red-600">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t my-8" />

          <div>
            <h2 className="text-2xl font-semibold">Payment Summary</h2>
            <div className="mt-5 space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="border-t pt-5 flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-red-600">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <button
            onClick={onPrimaryAction}
            className="bg-red-600 hover:bg-red-700 transition text-white px-8 py-4 rounded-xl font-semibold min-w-[240px]"
          >
            {current.primaryBtn}
          </button>
          <button
            onClick={onSecondaryAction}
            className="border border-red-500 text-red-600 hover:bg-red-50 transition px-8 py-4 rounded-xl font-semibold min-w-[240px]"
          >
            {current.secondaryBtn}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatusCard;
