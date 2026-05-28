import {
  Bike,
  CreditCard,
  Landmark,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

type OrderType = "Delivery" | "Pickup";
type PaymentMethod = "Bank_Transfer" | "Card_Payment";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Bank_Transfer");

  const [orderType, setOrderType] = useState<OrderType>("Delivery");

  // MOCK TOTAL
  const subtotal = 6500;
  const deliveryFee = orderType === "Delivery" ? 1000 : 0;
  const total = subtotal + deliveryFee;

  // HANDLE CARD PAYMENT
  const handleCardCheckout = () => {
    // Replace with your payment provider checkout page
    window.location.href = "https://paystack.com/pay/noble-restaurant";
  };

  return (
    <section className="bg-[#F7F3ED] min-h-screen py-16 px-5">
      <div className="max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <header className="mb-12 text-center">
          <h1 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-gray-900">
            Complete Your Order
          </h1>

          <p className="mt-4 text-gray-500">
            Just a few more steps to enjoy Noble Restaurant’s finest cuisine.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* CART */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Review Your Cart</h2>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border rounded-2xl p-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=400"
                    alt="Signature Jollof Rice"
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">Signature Jollof</h3>

                    <p className="text-red-600 font-medium mt-1">₦6,500</p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-4">
                      <button className="w-8 h-8 rounded-lg border flex items-center justify-center hover:border-red-500 transition">
                        <Minus size={16} />
                      </button>

                      <span>1</span>

                      <button className="w-8 h-8 rounded-lg border flex items-center justify-center hover:border-red-500 transition">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="text-red-500 hover:text-red-700 transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* CONTACT */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>

              <div className="space-y-5">
                <input
                  type="tel"
                  placeholder="+234xxxxxxxxxx"
                  className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <input
                  type="text"
                  placeholder="Delivery Address"
                  className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* ORDER TYPE */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Order Type</h2>

              <div className="space-y-4">
                {/* DELIVERY */}
                <button
                  onClick={() => setOrderType("Delivery")}
                  className={`w-full border-2 rounded-2xl p-5 text-left transition ${
                    orderType === "Delivery"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Bike
                        className={
                          orderType === "Delivery"
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      />

                      <div>
                        <h3 className="font-semibold text-lg">Delivery</h3>

                        <p className="text-gray-500 mt-1">
                          Delivered within Osogbo
                        </p>

                        <p className="text-red-500 mt-2 font-medium">
                          Delivery Fee: ₦1,000
                        </p>
                      </div>
                    </div>

                    {orderType === "Delivery" && (
                      <CheckCircle2 className="text-red-500" />
                    )}
                  </div>
                </button>

                {/* PICKUP */}
                <button
                  onClick={() => setOrderType("Pickup")}
                  className={`w-full border-2 rounded-2xl p-5 text-left transition ${
                    orderType === "Pickup"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Bike
                        className={
                          orderType === "Pickup"
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      />

                      <div>
                        <h3 className="font-semibold text-lg">Pickup</h3>

                        <p className="text-gray-500 mt-1">
                          Pick up at restaurant
                        </p>

                        <p className="text-green-600 mt-2 font-medium">
                          Ready in 30 minutes
                        </p>
                      </div>
                    </div>

                    {orderType === "Pickup" && (
                      <CheckCircle2 className="text-red-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

              <div className="space-y-4">
                {/* BANK TRANSFER */}
                <button
                  onClick={() => setPaymentMethod("Bank_Transfer")}
                  className={`w-full border-2 rounded-2xl p-5 text-left transition ${
                    paymentMethod === "Bank_Transfer"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Landmark
                        className={
                          paymentMethod === "Bank_Transfer"
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      />

                      <div>
                        <h3 className="font-semibold text-lg">Bank Transfer</h3>

                        <p className="text-gray-500 mt-1">
                          Transfer before delivery
                        </p>
                      </div>
                    </div>

                    {paymentMethod === "Bank_Transfer" && (
                      <CheckCircle2 className="text-red-500" />
                    )}
                  </div>
                </button>

                {/* BANK DETAILS */}
                {paymentMethod === "Bank_Transfer" && (
                  <div className="border-2 border-red-200 bg-red-50 rounded-2xl p-6 animate-in fade-in duration-300">
                    <h3 className="text-lg font-semibold mb-5">
                      Bank Account Details
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-500">Bank Name</p>

                        <p className="font-semibold mt-1">Moniepoint</p>
                      </div>

                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-500">Account Number</p>

                        <p className="font-semibold mt-1">8282557112</p>
                      </div>

                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-500">Account Name</p>

                        <p className="font-semibold mt-1">Noble Restaurant</p>
                      </div>

                      <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                          Amount To Transfer
                        </p>

                        <p className="font-bold text-red-600 mt-1">
                          ₦{total.toLocaleString()}
                        </p>
                      </div>

                      <input
                        type="text"
                        placeholder="Transaction Reference (Optional)"
                        className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />

                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <p className="text-sm text-yellow-800">
                          Important: Complete the transfer before placing your
                          order.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CARD PAYMENT */}
                <button
                  onClick={() => {
                    setPaymentMethod("Card_Payment");
                    handleCardCheckout();
                  }}
                  className={`w-full border-2 rounded-2xl p-5 text-left transition ${
                    paymentMethod === "Card_Payment"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <CreditCard
                        className={
                          paymentMethod === "Card_Payment"
                            ? "text-red-500"
                            : "text-blue-500"
                        }
                      />

                      <div>
                        <h3 className="font-semibold text-lg">Card Payment</h3>

                        <p className="text-gray-500 mt-1">
                          Secure debit card payment
                        </p>
                      </div>
                    </div>

                    {paymentMethod === "Card_Payment" && (
                      <CheckCircle2 className="text-red-500" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>

                  <span className="text-red-600">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full mt-8 bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-2xl font-semibold text-lg">
                Place Order →
              </button>

              {/* TRUST */}
              <p className="text-center text-xs text-gray-400 mt-4">
                Secure checkout • Fast delivery • Trusted restaurant
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
