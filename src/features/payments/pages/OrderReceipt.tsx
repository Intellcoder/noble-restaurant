import { useRef } from "react";
import {
  CheckCircle2,
  Download,
  Phone,
  MapPin,
  Clock,
  ShoppingBag,
  Banknote,
  UtensilsCrossed,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export type ReceiptItem = {
  name: string;
  quantity: number;
  price: number;
};

export type OrderReceiptProps = {
  orderNumber: string;
  phoneNumber: string;
  deliveryType: "DELIVERY" | "PICKUP";
  deliveryAddress: string | null;
  items: ReceiptItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  placedAt?: string; // ISO date string
};

// ── helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₦${n.toLocaleString()}`;

const fmtDate = (iso?: string) => {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ── Receipt component ─────────────────────────────────────────────────────────
const OrderReceipt = ({
  orderNumber,
  phoneNumber,
  deliveryType,
  deliveryAddress,
  items,
  subtotal,
  deliveryFee,
  total,
  placedAt,
}: OrderReceiptProps) => {
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);

  // ── Download as PNG via html2canvas (loaded dynamically) ──────────────────
  const handleDownload = async () => {
    try {
      // @ts-ignore — html2canvas is loaded at runtime; add to your deps:
      // npm install html2canvas
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(receiptRef.current!, {
        backgroundColor: "#ffffff",
        scale: 2, // retina quality
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `Noble-Foods-Receipt-${orderNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: print dialog which the user can "save as PDF"
      window.print();
    }
  };

  return (
    <section className="bg-[#F7F3ED] min-h-screen py-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        {/* ── Action bar ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/menu")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowLeft size={15} />
            Back to menu
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            <Download size={15} />
            Download Receipt
          </button>
        </div>

        {/* ── Receipt card (this is what gets captured for download) ──── */}
        <div
          ref={receiptRef}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          {/* Header */}
          <div className="text-center border-b border-dashed border-gray-200 pb-5 mb-5">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={30} className="text-green-500" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Order Placed!</h1>
            <p className="text-sm text-gray-500 mt-1">
              Your order has been received. We'll start preparing once payment
              is confirmed.
            </p>
            {/* Order number pill */}
            <div className="inline-flex items-center gap-1.5 mt-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5">
              <span className="text-xs text-gray-400">Order</span>
              <span className="text-sm font-bold text-gray-900 tracking-wide">
                #{orderNumber}
              </span>
            </div>
          </div>

          {/* Customer & delivery info */}
          <div className="space-y-2.5 mb-5">
            <div className="flex items-center gap-2.5 text-sm">
              <Phone size={14} className="text-gray-400 shrink-0" />
              <span className="text-gray-600">{phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <ShoppingBag size={14} className="text-gray-400 shrink-0" />
              <span className="text-gray-600">
                {deliveryType === "DELIVERY" ? "Delivery" : "Pickup"}
              </span>
            </div>
            {deliveryType === "DELIVERY" && deliveryAddress && (
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                <span className="text-gray-600">{deliveryAddress}</span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm">
              <Clock size={14} className="text-gray-400 shrink-0" />
              <span className="text-gray-600">{fmtDate(placedAt)}</span>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-dashed border-gray-200 pt-4 mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5 mb-3">
              <UtensilsCrossed size={12} />
              Items ordered
            </h3>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name}{" "}
                    <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-900">
                    {fmt(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-dashed border-gray-200 pt-4 space-y-2 mb-5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery fee</span>
              <span>{deliveryFee > 0 ? fmt(deliveryFee) : "Free"}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-1 border-t border-gray-100">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>

          {/* Payment instruction box */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 space-y-2">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
              <Banknote size={13} />
              Payment Instructions
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Transfer <span className="font-bold">{fmt(total)}</span> to:
            </p>
            <div className="bg-white rounded-xl border border-amber-100 divide-y divide-amber-50 text-sm">
              <div className="flex justify-between px-3 py-2">
                <span className="text-gray-400">Bank</span>
                <span className="font-semibold text-gray-800">MoniePoint</span>
              </div>
              <div className="flex justify-between px-3 py-2">
                <span className="text-gray-400">Account No.</span>
                <span className="font-bold text-gray-900 tracking-widest">
                  8282557112
                </span>
              </div>
              <div className="flex justify-between px-3 py-2">
                <span className="text-gray-400">Account Name</span>
                <span className="font-semibold text-gray-800">
                  Noble Restaurant
                </span>
              </div>
            </div>
            <p className="text-xs text-amber-700">
              Use <strong>{phoneNumber}</strong> as transfer narration. Send
              your receipt screenshot on WhatsApp after payment.
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-5">
            Noble Restaurant · Thank you for your order 🍽️
          </p>
        </div>

        {/* ── CTA buttons ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/menu")}
            className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl text-sm transition"
          >
            Order More
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-xl text-sm transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderReceipt;
