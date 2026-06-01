import type { Order } from "../../../shared/types/order.types";
import StatusBadge from "./StatusBadge";

type Props = {
  order: Order;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
};

const OrderCard = ({ order, onStatusChange, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border">
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-lg">
            Order #{order.orderNumber || order.id}
          </h2>
          {/* <p className="text-gray-500 text-sm">
            {new Date(order.createdAt).toLocaleString()}
          </p> */}
        </div>

        <StatusBadge status={order.paymentStatus} />
      </div>

      {/* CUSTOMER */}
      <div className="mt-4 text-sm text-gray-600">
        <p>📞 {order.phoneNumber}</p>
        {order.deliveryAddress && <p>📍 {order.deliveryAddress}</p>}
        <p>🚚 {order.deliveryType}</p>
        <p>💳 {order.paymentStatus}</p>
        <p>💳 {order.paymentReference}</p>
      </div>

      {/* ITEMS */}
      <div className="mt-4 border-t pt-3 space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {item.foodName} × {item.quantity}
            </span>
            <span>₦{(item.unitPrice * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t mt-4 pt-3 flex justify-between font-bold">
        <span>Total</span>
        <span className="text-red-600">
          ₦{order.totalAmount.toLocaleString()}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <button
          onClick={() => onStatusChange(order.id, "PROCESSING")}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
        >
          Processing
        </button>

        <button
          onClick={() => onStatusChange(order.id, "DELIVERED")}
          className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm"
        >
          Delivered
        </button>

        <button
          onClick={() => onStatusChange(order.id, "CANCELLED")}
          className="px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => onDelete(order.id)}
          className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
