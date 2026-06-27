import { Bike, Trash2 } from "lucide-react";
import type { Rider } from "../../../shared/types/packages.types";

type Props = {
  rider: Rider;
  onDelete?: (id: string) => void;
};

export default function RiderCard({ rider, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{rider.fullName}</h3>
          <p className="text-sm text-gray-500">{rider.phoneNumber}</p>
        </div>

        <Bike size={20} />
      </div>

      <div className="mt-4 text-sm space-y-2">
        <p>Status: {rider.status}</p>
        <p>Deliveries: {rider.totalDeliveries}</p>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(rider.id)}
          className="mt-4 bg-red-500 text-white rounded-xl px-4 py-2 w-full flex justify-center gap-2"
        >
          <Trash2 size={16} />
          Remove Rider
        </button>
      )}
    </div>
  );
}
