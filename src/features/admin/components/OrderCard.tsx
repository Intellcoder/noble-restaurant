import { useState } from "react";
import {
  Phone,
  MapPin,
  Bike,
  CreditCard,
  Hash,
  ChevronDown,
  ChevronUp,
  Trash2,
  Clock,
} from "lucide-react";
import type { Order } from "../../../shared/types/order.types";
import StatusBadge from "./StatusBadge";

type Props = {
  order: Order;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

// ── Status action buttons config ─────────────────────────────────────────────
const STATUS_ACTIONS = [
  {
    label: "Confirmed",
    status: "CONFIRMED",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    label: "Preparing",
    status: "PREPARING",
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    label: "Out for Delivery",
    status: "OUT_FOR_DELIVERY",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    label: "Delivered",
    status: "DELIVERED",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    label: "Cancelled",
    status: "CANCELLED",
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
] as const;

const OrderCard = ({ order, onStatusChange, onDelete }: Props) => {
  const [itemsExpanded, setItemsExpanded] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fmt = (n: number) => `₦${Number(n).toLocaleString()}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-gray-50">
        <div>
          <div className="flex items-center gap-1.5">
            <Hash size={14} className="text-gray-400" />
            <h2 className="font-bold text-base text-gray-900">
              {order.orderNumber || order.id}
            </h2>
          </div>
          {order.createdAt && (
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <Clock size={11} />
              {new Date(order.createdAt).toLocaleString("en-NG", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <StatusBadge status={order.paymentStatus} />
          <StatusBadge status={order.orderStatus} />
        </div>
      </div>

      {/* ── Customer details ─────────────────────────────────────────────── */}
      <div className="px-5 py-4 space-y-2 border-b border-gray-50">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={13} className="text-gray-400 shrink-0" />
          <span>{order.phoneNumber}</span>
        </div>

        {order.deliveryAddress && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />
            <span>{order.deliveryAddress}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Bike size={13} className="text-gray-400 shrink-0" />
          <span>{order.deliveryType}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard size={13} className="text-gray-400 shrink-0" />
          <span>{order.paymentMethod?.replace("_", " ")}</span>
        </div>

        {order.paymentReference && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Hash size={11} className="shrink-0" />
            <span className="font-mono truncate">{order.paymentReference}</span>
          </div>
        )}
      </div>

      {/* ── Order items ──────────────────────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-gray-50">
        {/* Collapsible toggle */}
        <button
          type="button"
          onClick={() => setItemsExpanded((p) => !p)}
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-3"
        >
          <span>
            Items{" "}
            <span className="text-gray-400 font-normal">
              ({order.items.length})
            </span>
          </span>
          {itemsExpanded ? (
            <ChevronUp size={15} className="text-gray-400" />
          ) : (
            <ChevronDown size={15} className="text-gray-400" />
          )}
        </button>

        {itemsExpanded && (
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Item image */}
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.foodName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
                      🍽️
                    </div>
                  )}
                </div>

                {/* Name + qty */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.foodName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {fmt(item.unitPrice)} × {item.quantity}
                  </p>
                </div>

                {/* Line total */}
                <span className="text-sm font-semibold text-gray-900 shrink-0">
                  {fmt(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Totals ───────────────────────────────────────────────────────── */}
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 space-y-1.5">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Subtotal</span>
          <span>{fmt(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Delivery fee</span>
          <span>{order.deliveryFee > 0 ? fmt(order.deliveryFee) : "Free"}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-gray-900 pt-1.5 border-t border-gray-200">
          <span>Total</span>
          <span className="text-red-600">{fmt(order.totalAmount)}</span>
        </div>
      </div>

      {/* ── Status actions ───────────────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
          Update Status
        </p>
        <div className="flex flex-wrap gap-2">
          {STATUS_ACTIONS.map(({ label, status, color }) => (
            <button
              key={status}
              onClick={() => onStatusChange(order.id, status)}
              className={`px-3 py-1.5 ${color} text-white rounded-lg text-xs font-medium transition-colors`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Delete ───────────────────────────────────────────────────────── */}
      <div className="px-5 pb-5">
        {confirmDelete ? (
          <div className="flex items-center gap-2 mt-2">
            <p className="text-xs text-gray-500 flex-1">Are you sure?</p>
            <button
              onClick={() => {
                onDelete(order.id);
                setConfirmDelete(false);
              }}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="mt-2 flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={13} />
            Delete order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
