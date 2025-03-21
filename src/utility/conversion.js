import axios from "axios";

export const convertUsdToBtc = async (usdAmount) => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
      params: {
        ids: "bitcoin",
        vs_currencies: "usd"
      }
    });

    const btcPrice = response.data.bitcoin.usd;

    if (!btcPrice) throw new Error("Could not fetch BTC price");

    const btcAmount = usdAmount / btcPrice;
    return btcAmount.toFixed(8); 
  } catch (error) {
    console.error("Error fetching BTC price:", error.message);
    throw new Error("BTC conversion failed.");
  }
};
