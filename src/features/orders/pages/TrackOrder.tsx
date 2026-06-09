import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Search,
  Package,
  CreditCard,
  ChefHat,
  Truck,
  CheckCircle2,
  Loader2,
  Phone,
  MapPin,
  ShoppingBag,
  XCircle,
} from "lucide-react";

type OrderItem = {
  id: string;
  foodName: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  id: string;
  orderNumber: string;
  phoneNumber: string;
  deliveryAddress?: string;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  items: OrderItem[];
};

type StatusKey =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "PICKED_UP"
  | "CANCELLED";

const STATUS_CONFIG: Record<
  StatusKey,
  {
    label: string;
    badgeClass: string;
    icon: React.ElementType;
    illustration: string;
    message: string;
  }
> = {
  PENDING_PAYMENT: {
    label: "Awaiting Payment",
    badgeClass: "bg-amber-100 text-amber-800",
    icon: CreditCard,
    illustration: "💳",
    message: "Waiting for your payment confirmation.",
  },
  PAID: {
    label: "Paid",
    badgeClass: "bg-green-100 text-green-800",
    icon: CheckCircle2,
    illustration: "✅",
    message: "Payment received! Your order is being queued.",
  },
  PREPARING: {
    label: "Preparing",
    badgeClass: "bg-orange-100 text-orange-800",
    icon: ChefHat,
    illustration: "👨‍🍳",
    message: "Our chefs are cooking your meal right now.",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    badgeClass: "bg-blue-100 text-blue-800",
    icon: Truck,
    illustration: "🛵",
    message: "Your order is on its way to you!",
  },
  DELIVERED: {
    label: "Delivered",
    badgeClass: "bg-green-100 text-green-800",
    icon: Package,
    illustration: "📦",
    message: "Your order has been delivered. Enjoy your meal!",
  },
  PICKED_UP: {
    label: "Picked Up",
    badgeClass: "bg-teal-100 text-teal-800",
    icon: ShoppingBag,
    illustration: "🛍️",
    message: "Order picked up successfully.",
  },
  CANCELLED: {
    label: "Cancelled",
    badgeClass: "bg-red-100 text-red-800",
    icon: XCircle,
    illustration: "❌",
    message: "This order has been cancelled.",
  },
};

const statusSteps: {
  key: StatusKey;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "PENDING_PAYMENT", label: "Awaiting Payment", icon: CreditCard },
  { key: "PAID", label: "Paid", icon: CheckCircle2 },
  { key: "PREPARING", label: "Preparing Food", icon: ChefHat },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: Package },
];

const mockOrder: Order = {
  id: "ord_1",
  orderNumber: "ORD-38292",
  phoneNumber: "07012062584",
  deliveryAddress: "Osogbo, Fola Filling Station Area",
  totalAmount: 5600,
  paymentStatus: "PAID",
  orderStatus: "PREPARING",
  items: [
    { id: "1", foodName: "Jollof Rice", quantity: 2, unitPrice: 1500 },
    { id: "2", foodName: "Chicken", quantity: 1, unitPrice: 1800 },
    { id: "3", foodName: "Coke", quantity: 2, unitPrice: 400 },
  ],
};

// --- Status Badge ---
const StatusBadge = ({ status }: { status: string }) => {
  const cfg = STATUS_CONFIG[status as StatusKey] ?? {
    label: status,
    badgeClass: "bg-gray-100 text-gray-700",
    icon: Package,
  };
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${cfg.badgeClass}`}
    >
      <Icon size={13} />
      {cfg.label}
    </span>
  );
};

// --- Status Illustration Banner ---
const StatusIllustration = ({ status }: { status: string }) => {
  const cfg = STATUS_CONFIG[status as StatusKey];
  if (!cfg) return null;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col items-center text-center gap-3">
      <div className="text-6xl leading-none">{cfg.illustration}</div>
      <div>
        <p className="font-semibold text-base">{cfg.label}</p>
        <p className="text-sm text-gray-500 mt-1">{cfg.message}</p>
      </div>
    </div>
  );
};

// --- Main Component ---
const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleTrack = async () => {
    if (!orderNumber.trim()) return toast.error("Enter an order number");

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (orderNumber.toUpperCase() === mockOrder.orderNumber) {
        setOrder(mockOrder);
        toast.success("Order found");
      } else {
        toast.error("Order not found");
        setOrder(null);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = statusSteps.findIndex(
    (step) => step.key === order?.orderStatus,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Track Order</h1>
          <p className="text-gray-500 text-sm">
            Enter your order number to check status
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border mb-6">
          <div className="flex gap-3">
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="e.g. ORD-38292"
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:border-red-500 text-sm"
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-red-600 text-white px-5 rounded-xl flex items-center gap-2 text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={15} />
                  Loading
                </>
              ) : (
                <>
                  <Search size={15} />
                  Track
                </>
              )}
            </button>
          </div>
        </div>

        {order && (
          <div className="space-y-5">
            {/* Illustration Banner */}
            <StatusIllustration status={order.orderStatus} />

            {/* Order Details */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <div className="flex justify-between flex-wrap gap-3">
                <div>
                  <h2 className="font-bold text-lg">#{order.orderNumber}</h2>
                  <p className="text-sm text-gray-500">
                    Total: ₦{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={order.orderStatus} />
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  {order.phoneNumber}
                </div>
                {order.deliveryAddress && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {order.deliveryAddress}
                  </div>
                )}
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h3 className="font-semibold mb-5">Order Progress</h3>
              <div className="flex flex-col">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isDone = index < currentStepIndex;
                  const isActive = index === currentStepIndex;
                  const isLast = index === statusSteps.length - 1;

                  return (
                    <div key={step.key} className="flex gap-4">
                      {/* Icon + line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDone
                              ? "bg-green-500 text-white"
                              : isActive
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 flex-1 my-1 min-h-[20px] ${
                              isDone ? "bg-green-400" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>

                      {/* Label */}
                      <div className="pb-5 pt-1.5">
                        <p
                          className={`text-sm font-medium ${
                            isDone || isActive
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        {isActive && (
                          <p className="text-xs text-red-500 mt-0.5">
                            In progress
                          </p>
                        )}
                        {isDone && (
                          <p className="text-xs text-green-600 mt-0.5">Done</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h3 className="font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.foodName}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      ₦{(item.unitPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
