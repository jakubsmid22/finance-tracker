interface BudgetTrackerProps {
  remainingBudgetPercentage: string;
  remainingBudget: number;
  budget: number;
}

const BudgetTracker = ({
  remainingBudgetPercentage,
  remainingBudget,
  budget,
}: BudgetTrackerProps) => {
  const progressPercentage = (remainingBudget / budget) * 100;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700">Budget Tracker</h2>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">Remaining Budget:</p>
        <p className={`text-lg font-bold ${Number(remainingBudgetPercentage) >= 0 ? "text-green-600" : "text-red-500"}`}>
          {remainingBudgetPercentage}%
        </p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-500">Budget Used:</p>
        <p className="text-sm text-gray-700">
          {remainingBudget.toLocaleString()}/{budget.toLocaleString()}
        </p>
      </div>

      <div className="relative w-full h-3 mt-3 bg-red-500 rounded-full">
        <div
          className={`absolute h-3 ${Number(remainingBudgetPercentage) >= 0 ? "bg-green-600" : "bg-red-500"} rounded-full`}
          style={{ width: `${progressPercentage}%`, maxWidth: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetTracker;
