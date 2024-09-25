import { createContext, useState, ReactNode, useEffect } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase/config";

interface UserContextType {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
