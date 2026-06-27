import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

const AddRiderModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add New Rider</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full border p-4 rounded-xl"
          />

          <input placeholder="Email" className="w-full border p-4 rounded-xl" />

          <input
            placeholder="Phone Number"
            className="w-full border p-4 rounded-xl"
          />

          <input
            placeholder="Address"
            className="w-full border p-4 rounded-xl"
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full border p-4 rounded-xl"
          />

          <button className="w-full bg-red-600 text-white py-4 rounded-xl">
            Create Rider
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRiderModal;
