import { useState } from "react";
import { Trash2, UserPlus, RefreshCcw } from "lucide-react";
import type { PackageOrder, Rider } from "../../../shared/types/packages.types";

type Props = {
  order: PackageOrder;
  riders: Rider[];
  onAssign: (orderId: string, riderId: string) => Promise<void>;
  onDelete: (orderId: string) => Promise<void>;
};

const statusStyles = {
  PENDING_PAYMENT: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  OUT_FOR_DELIVERY: "bg-green-100 text-green-700",
  PREPARING: "bg-yello-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function PackageCard({
  order,
  riders,
  onAssign,
  onDelete,
}: Props) {
  const [selectedRider, setSelectedRider] = useState("");
  const [assigning, setAssigning] = useState(false);

  const isAssigned = !!order.assignedRider;

  const handleAssign = async () => {
    if (!selectedRider) return;

    try {
      setAssigning(true);
      await onAssign(order.id, selectedRider);
      setSelectedRider("");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">{order.customerName}</p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            statusStyles[order.orderStatus]
          }`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Body */}
      <div className="text-sm space-y-2">
        <InfoRow label="Phone" value={order.phoneNumber} />
        <InfoRow label="Amount" value={`₦${order.amount.toLocaleString()}`} />
        <InfoRow label="Address" value={order.address} />

        {isAssigned && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-400">Assigned Rider</p>
            <p className="font-medium">{order.assignedRider?.fullName}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <select
          value={selectedRider}
          onChange={(e) => setSelectedRider(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="">
            {isAssigned ? "Select new rider" : "Select rider"}
          </option>

          {riders.map((rider) => (
            <option key={rider.id} value={rider.id}>
              {rider.fullName}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAssign}
            disabled={!selectedRider || assigning}
            className="bg-blue-500 text-white rounded-xl py-3 flex items-center justify-center gap-2"
          >
            {isAssigned ? <RefreshCcw size={16} /> : <UserPlus size={16} />}

            {assigning ? "Processing..." : isAssigned ? "Reassign" : "Assign"}
          </button>

          <button
            onClick={() => onDelete(order.id)}
            className="bg-red-500 text-white rounded-xl py-3 flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
