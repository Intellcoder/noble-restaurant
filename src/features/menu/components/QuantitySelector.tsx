const QuantitySelector = () => {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="flex gap-3">
        <button className="w-12 h-12 rounded-xl bg-gray-100">-</button>

        <div className="w-12 h-12 flex items-center justify-center">2</div>

        <button className="w-12 h-12 rounded-xl bg-red-600 text-white">
          +
        </button>
      </div>

      <span className="text-2xl font-bold">₦9,000</span>
    </div>
  );
};

export default QuantitySelector;
