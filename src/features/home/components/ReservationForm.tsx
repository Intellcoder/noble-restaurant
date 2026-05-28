const ReservationForm = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-900">Make A Reservation</h3>

      <p className="text-gray-500 mt-2">
        Secure your dining experience in just a few clicks.
      </p>

      <form className="mt-8 space-y-5">
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+234..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* DATE & TIME */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>

            <input
              type="time"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* GUESTS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>

          <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5 Guests</option>
            <option>6+ Guests</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-xl font-semibold"
        >
          Reserve Your Table
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
