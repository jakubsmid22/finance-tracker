import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

interface UserData {
  monthlyBudget: number;
  transactions: object[];
}

const getData = async (id: string) => {
  if (id) {
    const userDoc = doc(db, "users", id);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data() as UserData;
    }
  }
};

export default getData;
