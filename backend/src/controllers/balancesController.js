const { sequelize } = require("../model");
const {
  findClientProfile,
  calculateUnpaidJobsTotal,
  updateBalance,
} = require("../services/balanceServices");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route POST /balances/deposit/:userId
 * @description Deposits money into the balance of a client,
 * with a restriction that the deposit cannot be more than 25% of the client's total unpaid jobs to pay.
 * @param {number} req.body.amount - The amount to be deposited.
 * @param {number} req.params.userId - User ID where the deposit will be sent
 * @returns {Object} Success message if the deposit is successful with the balance of a client
 * @throws {400} If the deposit amount is invalid or exceeds the allowed limit, or userId is invalid.
 * @throws {403} If the user who's trying to deposit is not a client.
 * @throws {404} If the client profile is not found.
 * @throws {500} If an unexpected error occurs.
 */
exports.depositBalance = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  const clientProfile = await findClientProfile(userId);

  if (clientProfile.type !== "client") {
    return res.status(403).json({
      error: "You do not have permission to deposit into this account.",
    });
  }

  const unpaidJobsTotal = await calculateUnpaidJobsTotal(clientProfile.id);

  if (amount <= 0 || amount > unpaidJobsTotal * 0.25) {
    return res.status(400).json({
      error:
        "Invalid deposit amount. It must not exceed 25% of the total unpaid jobs.",
    });
  }

  const transaction = await sequelize.transaction();
  try {
    await updateBalance(clientProfile, amount);
    await transaction.commit();
    res.json({
      message: "Deposit successful.",
      balance: clientProfile.balance,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(error.code || 500).json({ error: error.message });
  }
});
