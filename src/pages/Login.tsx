import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router";
import { auth, db } from "../firebase/config";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import UserContext from "../context/UserContext";
import { doc, setDoc } from "firebase/firestore";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return new URL(request.url).searchParams.get("msg");
};

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    if (userContext?.user) {
      navigate("/");
    }
  }, [userContext?.user]);

  const message = useLoaderData() as string | null;

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerPassword !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        userContext?.setUser(user);
      })
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, { displayName: name });
        }
      })
      .then(async () => {
        if (auth.currentUser?.uid) {
          const docRef = doc(db, "users", auth.currentUser.uid);
          const data = {
            monthlyBudget: 0,
            transactions: [],
          };
          await setDoc(docRef, data);
        } else {
          toast.error("Could not create user");
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        userContext?.setUser(user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      {message && <p className="mb-5">{message}</p>}
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={(e) => login(e)} className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          />
        </form>
        <h2 className="text-xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={(e) => register(e)}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="submit"
            value="Register"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          />
        </form>
      </div>
    </main>
  );
};

export default Login;
