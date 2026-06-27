import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { api } from "../../../shared/api";

import RiderStats from "../../delivery/components/RiderStats";
import AddRiderModal from "../../delivery/components/AddRiderModal";

import PackageCard from "../components/PackageCard";

import type { PackageOrder } from "../../../shared/types/packages.types";
import RiderCard from "../../delivery/components/RiderCard";

export const mockRiders = [
  {
    id: "rider-001",
    fullName: "Daniel Adebayo",
    phoneNumber: "08031234567",
    status: "ACTIVE",
    totalDeliveries: 48,
  },
  {
    id: "rider-002",
    fullName: "Chinedu Okafor",
    phoneNumber: "08144567890",
    status: "ON_DELIVERY",
    totalDeliveries: 73,
  },
  {
    id: "rider-003",
    fullName: "Aisha Bello",
    phoneNumber: "07099887766",
    status: "OFFLINE",
    totalDeliveries: 29,
  },
];

const RidersPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState<PackageOrder[]>([]);

  // const [riders, setRiders] = useState<Rider[]>([]);

  /**
   * Fetch Orders + Riders
   */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [ordersRes] = await Promise.all([
        api.get("/order"),
        // api.get("/riders"),
      ]);

      const fetchedOrders = ordersRes.data.data.orders;
      // const fetchedRiders = ridersRes.data.data.riders;

      /**
       * Map backend order -> PackageOrder shape
       */
      const mappedOrders: PackageOrder[] = fetchedOrders.map((order: any) => ({
        id: order.id,

        orderNumber: order.orderNumber,

        customerName: order.customerName ?? "Guest",

        phoneNumber: order.phoneNumber,

        address: order.deliveryAddress,

        amount: order.totalAmount,

        status: order.packageStatus ?? "PENDING",

        assignedRider: order.assignedRider ?? null,
      }));

      setOrders(mappedOrders);

      // setRiders(fetchedRiders);
    } catch (error) {
      toast.error("Failed to load delivery data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Assign Rider
   */
  const handleAssignRider = async (packageId: string, riderId: string) => {
    try {
      await api.patch(`/packages/${packageId}/assign`, {
        riderId,
      });

      toast.success("Rider assigned successfully");

      fetchData();
    } catch (error) {
      toast.error("Failed to assign rider");
    }
  };

  /**
   * Delete Package
   */
  const handleDeletePackage = async (packageId: string) => {
    try {
      await api.delete(`/packages/${packageId}`);

      toast.success("Package deleted");

      fetchData();
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rider Management</h1>

          <p className="text-gray-500 mt-2">
            Manage delivery riders and monitor activity
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Rider
        </button>
      </header>

      {/* Stats */}
      <section className="mt-8">
        <RiderStats />
      </section>

      {/* Riders */}
      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockRiders.map((rider) => (
            <RiderCard key={rider.id} rider={rider} />
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Pending Deliveries</h2>

        {loading ? (
          <div className="text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500">No pending deliveries</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order) => (
              <PackageCard
                key={order.id}
                order={order}
                riders={mockRiders}
                onAssign={handleAssignRider}
                onDelete={handleDeletePackage}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {showModal && <AddRiderModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default RidersPage;
