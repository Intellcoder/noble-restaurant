import {
  Bike,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MapPin,
  Copy,
  CheckCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../store/cart.store";
import { api } from "../../../shared/api";
import { toast } from "react-hot-toast";
import type { ReceiptItem } from "../../payments/pages/OrderReceipt";

type OrderType = "DELIVERY" | "PICKUP";

type DeliveryArea = {
  name: string;
  fee: number;
};

const DELIVERY_AREAS: DeliveryArea[] = [
  { name: "Within School to Small Gate", fee: 1000 },
  { name: "Cele Area", fee: 1200 },
  { name: "Akede", fee: 1000 },
  { name: "After Akede", fee: 1200 },
  { name: "Outside town", fee: 2500 },
  { name: "Abere", fee: 3000 },
  { name: "Fountain University", fee: 1500 },
  { name: "Fola Filling Station Area", fee: 800 },
  { name: "Army Barracks Area", fee: 2000 },
  { name: "Kasimo Area", fee: 1200 },
  { name: "Sogbo Area", fee: 1000 },
];

const BANK_ACCOUNT = {
  bank: "MoniePoint",
  accountNumber: "8282557112",
  accountName: "Noble Restaurant",
} as const;

// ── Copy button ───────────────────────────────────────────────────────────────
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
      aria-label="Copy account number"
    >
      {copied ? (
        <>
          <CheckCheck size={13} /> Copied
        </>
      ) : (
        <>
          <Copy size={13} /> Copy
        </>
      )}
    </button>
  );
};

// ── Bank details card ─────────────────────────────────────────────────────────
const BankDetails = () => (
  <div className="bg-white rounded-3xl p-6">
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
      <h2 className="text-xl font-semibold text-gray-900">
        Pay via Bank Transfer
      </h2>
    </div>
    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
      Transfer your payment directly to the account below. Send your receipt
      screenshot to us on WhatsApp after payment.
    </p>
    <div className="bg-gray-50 border border-gray-100 rounded-2xl divide-y divide-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Bank
        </span>
        <span className="text-sm font-semibold text-gray-800">
          {BANK_ACCOUNT.bank}
        </span>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Account No.
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900 tracking-widest">
            {BANK_ACCOUNT.accountNumber}
          </span>
          <CopyButton text={BANK_ACCOUNT.accountNumber} />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          Account Name
        </span>
        <span className="text-sm font-semibold text-gray-800">
          {BANK_ACCOUNT.accountName}
        </span>
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-3 leading-relaxed">
      Use your <span className="font-medium text-gray-600">phone number</span>{" "}
      as the transfer narration so we can match your payment to your order.
    </p>
  </div>
);

// ── Main Checkout ─────────────────────────────────────────────────────────────
const Checkout = () => {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("DELIVERY");
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    area: "",
  });

  const subtotal = getTotalPrice();

  const selectedArea = DELIVERY_AREAS.find(
    (area) => area.name === customerInfo.area,
  );

  const deliveryFee = useMemo(() => {
    if (orderType === "PICKUP") return 0;
    return selectedArea?.fee ?? 0;
  }, [orderType, selectedArea]);

  const total = subtotal + deliveryFee;

  const handleChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!customerInfo.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!customerInfo.phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (orderType === "DELIVERY") {
      if (!customerInfo.address.trim()) {
        toast.error("Please enter your delivery address");
        return false;
      }
      if (!customerInfo.area) {
        toast.error("Please select your delivery area");
        return false;
      }
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        phoneNumber: customerInfo.phoneNumber,
        deliveryType: orderType,
        deliveryAddress:
          orderType === "DELIVERY"
            ? `${customerInfo.address}, ${customerInfo.area}`
            : null,
        items: items.map((item) => ({
          foodId: item.id,
          foodName: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      };

      const res = await api.post("/order", payload);

      // ── Grab the order data returned by the backend ──────────────────────
      const order = res.data.data.data.order;
      console.log("order:", order);
      // Build receipt items from current cart (in case order.items is not returned)
      const receiptItems: ReceiptItem[] = items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      // Clear cart before navigating
      clearCart();

      // Navigate to receipt page — no Monnify, no verification
      navigate("/order-confirmation", {
        state: {
          orderNumber: order.orderNumber ?? order.id,
          phoneNumber: customerInfo.phoneNumber,
          deliveryType: orderType,
          deliveryAddress:
            orderType === "DELIVERY"
              ? `${customerInfo.address}, ${customerInfo.area}`
              : null,
          items: receiptItems,
          subtotal,
          deliveryFee,
          total,
          placedAt: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Unable to place order. Try again.";
      toast.error(message);
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isCartEmpty = items.length === 0;

  return (
    <section className="bg-[#F7F3ED] min-h-screen py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-bold text-4xl">Complete Your Order</h1>
          <p className="text-gray-500 mt-3">
            Review your items, fill in your details, then transfer payment.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* ── CART ──────────────────────────────────────────────── */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <ShoppingBag size={22} className="text-red-500" />
                Review Cart
              </h2>
              {isCartEmpty ? (
                <div className="text-center py-10 text-gray-400">
                  Your cart is empty
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-xl p-4 mb-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-red-500 mt-1">
                        ₦{item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-50 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-50 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* ── CUSTOMER INFO ────────────────────────────────────── */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl mb-6">Customer Information</h2>
              <div className="space-y-4">
                <input
                  placeholder="Full name"
                  value={customerInfo.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full border rounded-xl p-4 focus:outline-none focus:border-red-400 transition"
                />
                <input
                  placeholder="Phone number"
                  type="tel"
                  value={customerInfo.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full border rounded-xl p-4 focus:outline-none focus:border-red-400 transition"
                />
              </div>
            </div>

            {/* ── ORDER TYPE ───────────────────────────────────────── */}
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-xl mb-5 flex items-center gap-2">
                <Bike size={20} className="text-red-500" />
                Order Type
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {(["DELIVERY", "PICKUP"] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`border rounded-xl p-3 text-sm font-medium transition ${
                      orderType === type
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {type === "DELIVERY" ? "🛵 Delivery" : "🏪 Pickup"}
                  </button>
                ))}
              </div>
              {orderType === "DELIVERY" && (
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      placeholder="Street address"
                      value={customerInfo.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full border rounded-xl p-4 pl-10 focus:outline-none focus:border-red-400 transition"
                    />
                  </div>
                  <select
                    value={customerInfo.area}
                    onChange={(e) => handleChange("area", e.target.value)}
                    className="w-full border rounded-xl p-4 text-sm focus:outline-none focus:border-red-400 transition"
                  >
                    <option value="">Select nearest area</option>
                    {DELIVERY_AREAS.map((area) => (
                      <option key={area.name} value={area.name}>
                        {area.name} — ₦{area.fee.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* ── BANK DETAILS ─────────────────────────────────────── */}
            <BankDetails />
          </div>

          {/* ── ORDER SUMMARY sidebar ──────────────────────────────────── */}
          <aside className="bg-white rounded-3xl p-6 h-fit sticky top-8">
            <h2 className="text-2xl mb-6">Order Summary</h2>

            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>
                    {item.name}{" "}
                    <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery</span>
                <span>
                  {orderType === "PICKUP"
                    ? "Free (Pickup)"
                    : deliveryFee > 0
                      ? `₦${deliveryFee.toLocaleString()}`
                      : "Select area"}
                </span>
              </div>
              <div className="flex justify-between border-t pt-4 font-bold text-lg">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Mini account card */}
            <div className="mt-5 bg-green-50 border border-green-100 rounded-2xl px-4 py-3 space-y-1.5">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                Transfer to
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800 tracking-widest">
                  {BANK_ACCOUNT.accountNumber}
                </span>
                <CopyButton text={BANK_ACCOUNT.accountNumber} />
              </div>
              <p className="text-xs text-gray-500">
                {BANK_ACCOUNT.accountName} · {BANK_ACCOUNT.bank}
              </p>
            </div>

            <button
              disabled={loading || isCartEmpty}
              onClick={handleCheckout}
              className="w-full mt-5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-4 rounded-xl font-semibold transition-colors duration-200"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Your order receipt will be shown immediately after placing
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
