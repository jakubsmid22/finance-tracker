import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login, { loader as loginLoader } from "./pages/Login";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import AddTransaction from "./pages/AddTransaction";
import authLoader from "./auth/authLoader";
import Transactions from "./pages/Transactions";
import Cryptocurrencies, { loader as cryptoLoader } from "./pages/Cryptocurrencies";
import Settings from "./pages/Settings";

const App = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user || null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Home />}
            loader={async () => authLoader(user)}
          />
          <Route
            path="/add"
            element={<AddTransaction />}
            loader={async () => authLoader(user)}
          />
          <Route
            path="/transactions"
            element={<Transactions />}
            loader={async () => authLoader(user)}
          />
          <Route
            path="/cryptocurrencies"
            element={<Cryptocurrencies />}
            loader={async () => cryptoLoader(user)}
          />
          <Route
            path="/settings"
            element={<Settings />}
            loader={async () => authLoader(user)}
          />
        </Route>
        <Route path="/login" element={<Login />} loader={loginLoader} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
