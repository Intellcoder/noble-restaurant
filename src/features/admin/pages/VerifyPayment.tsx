import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../../shared/api";

interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    orderNumber: string;
    phoneNumber: string;
    totalAmount: number;
    paymentStatus: string;
    orderStatus: string;
  };
}

const VerifyPayments = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [paymentData, setPaymentData] =
    useState<VerificationResponse["data"]>();

  const verifyPayment = async () => {
    if (!orderNumber.trim()) {
      toast.error("Please enter order number");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/order/verify-payment/${orderNumber}`);

      const resData = data.data.data;
      console.log(resData);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setPaymentData(resData);

      toast.success("Payment verified successfully");
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to verify payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 max-w-3xl">
      <h1 className="font-bold text-2xl mb-6">Verify Payments</h1>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter Order Number (e.g NR-06rR36)"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={verifyPayment}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white font-medium
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {/* Result */}
      {paymentData && (
        <div className="mt-8 border rounded-2xl p-5 bg-gray-50">
          <h2 className="font-semibold text-lg mb-4">Payment Details</h2>

          <div className="space-y-3">
            <p>
              <span className="font-medium">Order Number:</span>{" "}
              {paymentData.orderNumber}
            </p>

            <p>
              <span className="font-medium">Phone:</span>{" "}
              {paymentData.phoneNumber}
            </p>

            <p>
              <span className="font-medium">Amount:</span> ₦
              {Number(paymentData.totalAmount).toLocaleString()}
            </p>

            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              <span
                className={`font-semibold ${
                  paymentData.paymentStatus === "PAID"
                    ? "text-green-600"
                    : paymentData.paymentStatus === "PENDING"
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {paymentData.paymentStatus}
              </span>
            </p>

            <p>
              <span className="font-medium">Order Status:</span>{" "}
              {paymentData.orderStatus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPayments;
