type Props = {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    occasion: string;
    specialRequests: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Business Dinner",
  "Date Night",
  "Family Gathering",
  "Graduation",
  "Other",
];

const StepGuestDetails = ({ formData, onChange, onNext, onBack }: Props) => {
  const isValid =
    formData.fullName.trim() && formData.phone.trim() && formData.email.trim();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-6">
        Guest Details
      </h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5 font-medium">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-red-400 transition-colors"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5 font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="+23480986536"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-red-400 transition-colors"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5 font-medium">
          Email Address
        </label>
        <input
          type="email"
          placeholder="yourexample@gmail.com"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-red-400 transition-colors"
        />
      </div>

      {/* Occasion */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1.5 font-medium">
          Occasion
        </label>
        <div className="relative">
          <select
            value={formData.occasion}
            onChange={(e) => onChange("occasion", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:border-red-400 transition-colors appearance-none pr-10"
          >
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="14" height="8" fill="none" viewBox="0 0 14 8">
              <path
                d="M1 1l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="mb-7">
        <label className="block text-sm text-gray-500 mb-1.5 font-medium">
          Special Requests{" "}
          <span className="text-gray-300 font-normal">(optional)</span>
        </label>
        <textarea
          rows={4}
          placeholder="Dietary requirements, allergies, seating preferences"
          value={formData.specialRequests}
          onChange={(e) => onChange("specialRequests", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-red-400 transition-colors resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm"
        >
          Review Booking
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default StepGuestDetails;
