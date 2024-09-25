import { User as FirebaseUser } from "firebase/auth";
import { redirect } from "react-router";

const authLoader = (user: FirebaseUser | null) => {
  if (!user) {
    return redirect("/login?msg=You need to be logged in");
  }

  return null;
};

export default authLoader;  