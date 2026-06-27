const FoodInfo = () => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
          🔥 Popular
        </span>

        <span className="text-yellow-500">⭐ 4.8 (210 reviews)</span>
      </div>

      <h1 className="text-4xl font-bold mt-4">Jollof Rice & Chicken</h1>

      <p className="text-gray-500 mt-4 leading-8">
        Smoky Nigerian jollof rice served with spicy grilled chicken, fresh
        vegetables and chef special sauce.
      </p>

      <div className="mt-6">
        <span className="text-3xl font-bold text-red-600">₦4,500</span>
      </div>
    </div>
  );
};

export default FoodInfo;
