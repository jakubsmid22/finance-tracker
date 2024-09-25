import { redirect, useLoaderData } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import "./Cryptocurrencies.css";
import axios from "axios";
import { User as FirebaseUser } from "firebase/auth";

interface Coin {
  id: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export const loader = async (user: FirebaseUser | null) => {
  if (!user) {
    return redirect("/login?msg=You need to be logged in");
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch data");
    return null;
  }
};

const Cryptocurrencies = () => {
  const data: Coin[] = useLoaderData() as Coin[];
  const loading = !data;

  return (
    <main className="container mx-auto p-4 flex flex-col items-center min-h-screen">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Cryptocurrencies</h1>
      {loading ? (
        <p className="text-lg mt-64 rotate animate__animated animate__infinite animate__slow">
          <VscLoading className="text-8xl" />
        </p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                #
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Coins
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Price
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                24H Change
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin: Coin, i: number) => {
              const {
                id,
                image,
                current_price,
                price_change_percentage_24h,
                market_cap,
              } = coin;
              return (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">
                    {i + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 flex items-center">
                    <img
                      src={image}
                      alt={`${id}-img`}
                      className="w-6 h-6 mr-2"
                    />
                    {id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    $ {current_price.toLocaleString()}
                  </td>
                  <td
                    className={`py-2 px-4 border-b border-gray-300 ${
                      price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    $ {market_cap.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Cryptocurrencies;
