import { Pencil, Trash2 } from "lucide-react";

import { Link } from "react-router-dom";

type Food = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  isAvailable: boolean;
};

type Props = {
  food: Food;
  onDelete: () => void;
};

const AdminFoodCard = ({ food, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border">
      <img
        src={food.imageUrl || "https://placehold.co/600x400"}
        alt={food.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg">{food.name}</h2>

            <p className="text-gray-500 text-sm mt-1">
              {food.description || "No description"}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              food.isAvailable
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {food.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="mt-4">
          <p className="font-bold text-red-600 text-xl">
            ₦{food.price.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            to={`/admin/product/edit/${food.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-xl"
          >
            <Pencil size={16} />
            Edit
          </Link>

          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFoodCard;
