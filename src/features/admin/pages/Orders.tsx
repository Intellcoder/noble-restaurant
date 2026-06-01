import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { Order } from "../../../shared/types/order.types";

import OrderCard from "../components/OrderCard";
import { api } from "../../../shared/api";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/order");
      const { orders } = res.data.data;
      console.log("orders:", orders);
      setOrders(orders);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await api.put(`/orders/${id}`);
      console.log(res);
      toast.success("Order updated");
      setOrders((prev: any) =>
        prev.map((order: Order) =>
          order.id === id ? { ...order, status } : order,
        ),
      );
    } catch {
      toast.error("Failed to update order");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = api.delete(`/orders/${id}`);
      console.log(res);
      toast.success("Order deleted");

      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch {
      toast.error("Failed to delete order");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading orders...</div>
    );
  }

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 col-span-2">No orders found</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusChange={handleStatusUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Orders;
