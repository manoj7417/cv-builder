import { FaPoundSign, FaDollarSign, FaRupeeSign } from "react-icons/fa";

export const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    GBP: <FaPoundSign className="text-orange-500" />,
    USD: <FaDollarSign className="text-green-500" />,
    INR: <FaRupeeSign className="text-blue-500" />,
  };

  return symbols[currencyCode] || null; // Default to null if no match found
};
