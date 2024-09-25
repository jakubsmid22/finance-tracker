import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import getData from "../functions/getData";
import { TiDelete } from "react-icons/ti";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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

const Transactions = () => {
  const userContext = useContext(UserContext);
  const [userData, setUserData] = useState<UserData | null>(null);
  const transactions = userData?.transactions as Transaction[];

  useEffect(() => {
    const fetchData = async () => {
      if (userContext?.user?.uid) {
        const data = await getData(userContext.user.uid);
        setUserData(data || null);
      }
    };

    fetchData();
  }, [userContext]);

  const updateTransactions = async (modifiedTransactions: Transaction[]) => {
    try {
      if (userContext?.user?.uid) {
        const userDocRef = doc(db, "users", userContext?.user?.uid);
        await updateDoc(userDocRef, {
          transactions: modifiedTransactions,
        });
      }
    } catch (error) {
      console.error("Error updating transactions: ", error);
    }
  };

  const deleteTransaction = (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      const filteredTransactions = transactions.filter(
        (_, index) => index !== id
      );
      updateTransactions(filteredTransactions);

      setUserData((prevData) =>
        prevData ? { ...prevData, transactions: filteredTransactions } : null
      );
    }
  };

  const sortedTransactions = transactions
    ? [...transactions].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
    : [];

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Transactions</h1>
      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((transaction: Transaction, index: number) => {
          const { amount, category, date, type } = transaction;
          return (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div className="flex flex-col">
                <p className="text-gray-700 font-semibold">{category}</p>
                <p className="text-sm text-gray-500">{date}</p>
              </div>
              <div className="flex items-center">
                <p
                  className={`font-bold ${
                    type === "expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {`${type === "expense" ? "- " : "+ "}`}{Number(amount).toLocaleString()}
                </p>
                <button
                  className="ml-4 text-red-500 hover:text-red-700 transition duration-200"
                  onClick={() => deleteTransaction(index)}
                >
                  <TiDelete size={24} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No transactions available.</p>
      )}
    </main>
  );
};

export default Transactions;
