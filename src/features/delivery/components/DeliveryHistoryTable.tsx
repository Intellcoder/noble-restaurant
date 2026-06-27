const DeliveryHistoryTable = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold mb-5">Delivery History</h3>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Order</th>
            <th className="text-left">Date</th>
            <th className="text-left">Status</th>
            <th className="text-left">Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="py-4">NRW-34555</td>
            <td>Jun 19, 2026</td>
            <td>
              <span className="text-green-600">Delivered</span>
            </td>
            <td>₦15,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryHistoryTable;
