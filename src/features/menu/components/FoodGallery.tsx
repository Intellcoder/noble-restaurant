const FoodGallery = () => {
  return (
    <div>
      <img
        src="/food.jpg"
        className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
      />

      <div className="grid grid-cols-4 gap-3 mt-4">
        {[1, 2, 3, 4].map((item) => (
          <img
            key={item}
            src="/food.jpg"
            className="h-24 rounded-xl object-cover cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default FoodGallery;
