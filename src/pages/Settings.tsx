import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import getData from "../functions/getData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUser } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

const Settings = () => {
  const userContext = useContext(UserContext);
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (userContext?.user?.uid) {
        const data = await getData(userContext.user.uid);
        setBudget(data?.monthlyBudget ?? 0);
      }
    };

    fetchData();
  }, [userContext]);

  const changeBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userContext?.user?.uid) {
      const docRef = doc(db, "users", userContext.user.uid);
      try {
        await updateDoc(docRef, {
          monthlyBudget: budget,
        });
        toast.success("Budget updated successfully");
      } catch (error) {
        toast.error("Failed to update budget");
      }
    } else {
      toast.error("Failed to update budget");
    }
  };

  const deleteAllTransactions = async () => {
    if (!confirm("Are you sure you want to delete all transactions?")) return;

    if (userContext?.user?.uid) {
      const docRef = doc(db, "users", userContext.user.uid);
      try {
        await updateDoc(docRef, {
          transactions: [],
        });
        toast.success("All transactions deleted successfully");
      } catch (error) {
        toast.error("Failed to delete transactions");
      }
    } else {
      toast.error("Failed to delete transactions");
    }
  };

  const deleteAcc = () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    deleteUser(userContext?.user as FirebaseUser)
      .then(() => {
        userContext?.setUser(null);
      })
      .catch((error) => {
        toast.error("Failed to delete account: " + error.message);
        console.log(error);
      });
  };

  return (
    <main className="container mx-auto p-4 flex flex-col items-center min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <form onSubmit={(e) => changeBudget(e)} className="mb-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Change Monthly Budget</h2>
        <input
          type="number"
          value={budget}
          min={0}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          placeholder="Enter your budget"
        />
        <input
          type="submit"
          value="Change"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        />
      </form>

      <div className="mb-6 w-full max-w-sm">
        <p className="text-lg font-semibold mb-2">Delete All Transactions</p>
        <button
          onClick={deleteAllTransactions}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
        >
          DELETE ALL TRANSACTIONS
        </button>
      </div>

      <div className="w-full max-w-sm">
        <p className="text-lg font-semibold mb-2">Delete Account</p>
        <button
          onClick={deleteAcc}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
        >
          DELETE ACCOUNT
        </button>
      </div>
    </main>
  );
};

export default Settings;
