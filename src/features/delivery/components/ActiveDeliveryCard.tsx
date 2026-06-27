const ActiveDeliveryCard = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-lg">Order #NRW-23455</h3>

          <p className="text-gray-500 mt-2">📞 +2348100000000</p>

          <p className="text-gray-500">📍 Port Harcourt, Rivers State</p>
        </div>

        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full h-fit">
          In Transit
        </span>
      </div>

      <div className="mt-5 flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-gray-100">Call</button>

        <button className="px-4 py-2 rounded-lg bg-gray-100">Open Map</button>

        <select className="border rounded-lg px-3">
          <option>Picked Up</option>
          <option>In Transit</option>
          <option>Delivered</option>
          <option>Failed</option>
        </select>
      </div>
    </div>
  );
};

export default ActiveDeliveryCard;
