interface Props {
  transactions: object[];
}

const LastTransactions = ({ transactions }: Props) => {
  return (
    <section className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Last Transactions</h1>
      <div className="space-y-4">
        {transactions.map((transaction: any, index: number) => {
          const { amount, category, date, type } = transaction;
          return (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-b last:border-b-0"
            >
              <div className="flex-1">
                <p className="font-semibold">{category}</p>
                <p className="text-sm text-gray-500">{date}</p>
              </div>
              <p
                className={`font-bold ${
                  type === "expense" ? "text-red-500" : "text-green-500"
                }`}
              >
                {`${type === "expense" ? "- " : "+ "}`}{Number(amount).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LastTransactions;
