import { convertUsdToBtc } from "../utility/conversion.js";


import { generateBitcoinWallet } from "../utility/btc_address.js";

export const createWallet = (req, res) => {
    try {
        const { address } = generateBitcoinWallet();

        return res.status(200).json({
            success: true,
            message: "Bitcoin wallet successfully created.",
            address,
        });
    } catch (error) {
        console.error("Error generating BTC wallet:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate Bitcoin wallet.",
        });
    }
};


let userWallet = {
  balanceUSDT: 5000 
};

export const withdrawAmount = async (req, res) => {
  try {
    const { amount } = req.body; 

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid withdrawal amount.",
      });
    }

    // Check if user has sufficient balance
    if (parsedAmount > userWallet.balanceUSDT) {
      return res.status(400).json({
        success: false,
        message: "Insufficient USDT balance.",
        currentBalance: userWallet.balanceUSDT,
      });
    }

    // Convert USD to BTC
    const btcAmount = await convertUsdToBtc(parsedAmount);

    // Deduct from USDT balance
    userWallet.balanceUSDT -= parsedAmount;

    return res.status(200).json({
      success: true,
      message: `Withdrawal successful! You have withdrawn ${btcAmount} BTC.`,
      btcAmount,
      withdrawnUSD: parsedAmount,
      remainingUSDTBalance: userWallet.balanceUSDT.toFixed(2),
    });

  } catch (error) {
    console.error("Withdrawal error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during withdrawal.",
    });
  }
};
