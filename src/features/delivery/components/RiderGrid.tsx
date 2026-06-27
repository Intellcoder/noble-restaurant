const RiderGrid = () => {
  const stats = [
    { title: "Total Riders", value: 12 },
    { title: "Deliveries Today", value: 39 },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 mt-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-5 border shadow-sm"
          >
            <p className="text-gray-500">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderGrid;
