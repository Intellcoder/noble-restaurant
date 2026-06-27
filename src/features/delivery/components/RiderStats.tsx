const RiderStats = () => {
  const stats = [
    { title: "Active Deliveries", value: 4 },
    { title: "Delivered Today", value: 9 },
    { title: "Total Completed", value: 184 },
    { title: "Failed Deliveries", value: 2 },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5 mt-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <p className="text-gray-500">{item.title}</p>

          <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default RiderStats;
