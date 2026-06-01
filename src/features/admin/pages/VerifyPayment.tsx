const VerifyPayments = () => {
  const payments = [
    {
      id: "TXN001",
      customer: "James",
      amount: 10000,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6">
      <h1 className="font-bold text-2xl mb-6">Verify Payments</h1>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="border rounded-xl p-4 flex justify-between"
          >
            <div>
              <h2>{payment.id}</h2>

              <p>{payment.customer}</p>
            </div>

            <div>
              <p>₦{payment.amount}</p>

              <button className="bg-green-500 px-3 py-2 rounded-lg text-white">
                Verify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyPayments;
