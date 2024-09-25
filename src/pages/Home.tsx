import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import BudgetTracker from "../components/BudgetTracker";
import LastTransactions from "../components/LastTransactions";
import getData from "../functions/getData";

interface UserData {
  monthlyBudget: number;
  transactions: object[];
}

interface Transaction {
  amount: string;
  category: string;
  date: string;
  type: string;
}

const Home = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [expences, setExpences] = useState<number>(0);
  const [incomes, setIncomes] = useState<number>(0);
  const [lastTransactions, setLastTransactions] = useState<Transaction[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");

  const userContext = useContext(UserContext);

  const budget = userData?.monthlyBudget;

  const remainingBudget = (budget ?? 0) - expences + incomes;

  const remainingBudgetPercentage = budget
    ? ((remainingBudget / budget) * 100).toFixed(2)
    : "0";

  useEffect(() => {
    const fetchData = async () => {
      if (userContext?.user?.uid) {
        const data = await getData(userContext.user.uid);
        setUserData(data || null);
      }
    };

    fetchData();
  }, [userContext]);

  useEffect(() => {
    const calculateExpences = () => {
      if (userData?.transactions) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const transactions = userData.transactions as Transaction[];
        const expences = transactions.filter((transaction) => {
          if (!transaction.date) return false;

          const [year, month] = transaction.date.split("-").map(Number);
          return (
            transaction.type === "expense" &&
            year === currentYear &&
            month === currentMonth
          );
        });

        const totalExpences = expences.reduce(
          (total, expence) => total + parseInt(expence.amount),
          0
        );
        setExpences(totalExpences);
      }
    };

    calculateExpences();
  }, [userData]);

  useEffect(() => {
    const calculateIncomes = () => {
      if (userData?.transactions) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const transactions = userData.transactions as Transaction[];
        const incomes = transactions.filter((transaction) => {
          if (!transaction.date) return false;

          const [year, month] = transaction.date.split("-").map(Number);
          return (
            transaction.type === "income" &&
            year === currentYear &&
            month === currentMonth
          );
        });

        const totalIncomes = incomes.reduce(
          (total, income) => total + parseInt(income.amount),
          0
        );
        setIncomes(totalIncomes);
      }
    };

    calculateIncomes();
  }, [userData]);

  useEffect(() => {
    const getLastTransactions = () => {
      if (userData?.transactions) {
        const transactions = userData.transactions as Transaction[];
        const sortedTransactions = transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setLastTransactions(sortedTransactions.slice(0, 5));
      }
    };

    getLastTransactions();
  }, [userData]);

  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    setCurrentDate(`${month} ${year}`);
  }, []);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {userContext?.user?.displayName}
      </h1>
      <h2 className="text-2xl font-bold mb-4">{currentDate}</h2>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <p className="text-lg">
          Remaining Budget:{" "}
          <span className="font-bold">{remainingBudget.toLocaleString()}</span>
        </p>
        <BudgetTracker
          remainingBudgetPercentage={remainingBudgetPercentage}
          remainingBudget={remainingBudget}
          budget={budget ?? 0}
        />
        <p className="mt-2">
          Total Incomes:{" "}
          <span className="font-bold text-green-600">
            {incomes.toLocaleString()}
          </span>
        </p>
        <p>
          Total Expenses:{" "}
          <span className="font-bold text-red-600">
            {expences.toLocaleString()}
          </span>
        </p>
      </div>
      <LastTransactions transactions={lastTransactions} />
    </main>
  );
};

export default Home;
