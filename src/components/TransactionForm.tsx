import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast, ToastContainer } from "react-toastify";

const TransactionForm = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [type, setType] = useState<string>("income");
  const [category, setCategory] = useState<string>("other");
  const [date, setDate] = useState<string>("");
  const userContext = useContext(UserContext);

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      amount,
      type,
      category,
      date,
    };

    if (userContext?.user?.uid) {
      try {
        const userRef = doc(db, "users", userContext.user.uid);
        await updateDoc(userRef, {
          transactions: arrayUnion(data),
        });
        toast.success("Transaction added successfully");
      } catch (error) {
        toast.error("Error adding transaction");
      }
    } else {
      console.error("User ID is undefined");
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={(e) => addTransaction(e)}
        className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            min={0}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="other">Other</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="bills">Bills</option>
            <option value="entertainment">Entertainment</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="shopping">Shopping</option>
            <option value="housing">Housing</option>
            <option value="savings">Savings</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance Income</option>
            <option value="investment">Investment</option>
            <option value="gifts">Gifts</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="taxes">Taxes</option>
            <option value="travel">Travel</option>
            <option value="insurance">Insurance</option>
            <option value="charity">Charity/Donations</option>
            <option value="maintenance">Maintenance/Repairs</option>
            <option value="utilities">Utilities</option>
            <option value="pet-care">Pet Care</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="clothing">Clothing</option>
            <option value="hobbies">Hobbies</option>
            <option value="investment-property">Investment Property</option>
            <option value="childcare">Childcare</option>
            <option value="personal-loans">Personal Loans</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="submit"
          value="Add Transaction"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
        />
      </form>
    </>
  );
};

export default TransactionForm;
