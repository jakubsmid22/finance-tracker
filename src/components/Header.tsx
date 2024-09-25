import { useContext } from "react";
import UserContext from "../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const userContext = useContext(UserContext);

  const logOut = () => {
    userContext?.setUser(null);
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex flex-col lg:flex-row whitespace-nowrap gap-5 lg:gap-0 justify-between items-center shadow-md">
      <Link to="" className="text-3xl font-bold">
        FINANCE TRACKER
      </Link>
      <nav className="flex flex-wrap justify-center space-x-4">
        <NavLink to="/" className="hover:text-blue-200 transition duration-200">
          Home
        </NavLink>
        <NavLink
          to="/transactions"
          className="hover:text-blue-200 transition duration-200"
        >
          Transactions
        </NavLink>
        <NavLink
          to="/add"
          className="hover:text-blue-200 transition duration-200"
        >
          Add Transaction
        </NavLink>
        <NavLink
          to="/cryptocurrencies"
          className="hover:text-blue-200 transition duration-200"
        >
          Cryptocurrencies
        </NavLink>
        <NavLink
          to="/settings"
          className="hover:text-blue-200 transition duration-200"
        >
          Settings
        </NavLink>
      </nav>
      <p
        onClick={logOut}
        className="cursor-pointer hover:underline hover:text-red-500 transition duration-200 flex items-center gap-2"
      >
        Log Out <FiLogOut />
      </p>
    </header>
  );
};

export default Header;
