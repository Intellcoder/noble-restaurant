const FoodCustomization = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
      <h3 className="font-semibold text-lg">Customize Your Order</h3>

      <div className="space-y-3 mt-4">
        <label className="flex justify-between">
          <span>Extra Chicken</span>

          <input type="checkbox" />
        </label>

        <label className="flex justify-between">
          <span>Extra Sauce</span>

          <input type="checkbox" />
        </label>

        <label className="flex justify-between">
          <span>Extra Salad</span>

          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
};

export default FoodCustomization;
