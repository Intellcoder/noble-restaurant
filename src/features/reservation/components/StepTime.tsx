type Props = {
  formData: {
    date: string;
    noOfGuest: number;
    time: string;
  };
  onChange: (field: string, value: string | number) => void;
  onNext: () => void;
};

const TIME_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

const StepDateAndTime = ({ formData, onChange, onNext }: Props) => {
  const today = new Date().toISOString().split("T")[0];

  const isValid = formData.date && formData.time;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-6">
        Select Date &amp; Time
      </h2>

      {/* Date */}
      <div className="mb-5">
        <label className="block text-sm text-gray-500 mb-1.5 font-medium">
          Select Date
        </label>
        <input
          type="date"
          min={today}
          value={formData.date}
          onChange={(e) => onChange("date", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-red-400 transition-colors"
        />
      </div>

      {/* Party size */}
      <div className="mb-5">
        <label className="block text-sm text-gray-500 mb-1.5 font-medium">
          Party Size
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              onChange("noOfGuest", Math.max(1, formData.noOfGuest - 1))
            }
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-light"
          >
            −
          </button>
          <span className="text-base font-semibold text-gray-900 min-w-[2rem] text-center">
            {formData.noOfGuest}
          </span>
          <button
            type="button"
            onClick={() =>
              onChange("noOfGuest", Math.min(20, formData.noOfGuest + 1))
            }
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-light"
          >
            +
          </button>
          <span className="text-sm text-gray-400">guests</span>
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-7">
        <label className="block text-sm text-gray-500 mb-2 font-medium">
          Select Time
        </label>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onChange("time", slot)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-150
                ${
                  formData.time === slot
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 bg-white"
                }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={onNext}
        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm"
      >
        Continue to Details
      </button>
    </div>
  );
};

export default StepDateAndTime;
