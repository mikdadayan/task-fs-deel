const asyncHandler = require("../utils/asyncHandler");
const {
  queryBestClients,
  mapClientsResult,
  queryBestProfession,
} = require("../services/adminServices");

/**
 * @route GET /admin/best-profession?start=<date>&end=<date>
 * @description Returns the profession that earned the most money (sum of jobs paid) for any contractor that worked in the query time range.
 * @param {Date} start - Start date.
 * @param {Date} end - End date.
 * @returns {Object} Profession details with the most earnings.
 * @throws {400} If the start or end date is not provided or invalid.
 * @throws {500} If an unexpected error occurs.
 */
exports.getBestProfession = asyncHandler(async (req, res) => {
  const { start, end } = req.query;

  const bestProfession = await queryBestProfession(start, end);

  if (bestProfession.length === 0) {
    return res
      .status(404)
      .json({ message: "No data found for the given date range." });
  }

  res.json({
    profession: bestProfession[0].dataValues.profession,
    totalEarnings: bestProfession[0].dataValues.totalEarnings,
  });
});

/**
 * @route GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>
 * @description Returns the clients who paid the most for jobs in the specified time period.
 * @param {Date} start - Start date.
 * @param {Date} end - End date.
 * @param {number} limit - Limit of number of clients.
 * @returns {Array} List of clients with their IDs, full names, and total paid.
 * @throws {400} If the start or end date is not provided or invalid.
 * @throws {500} If an unexpected error occurs.
 */
exports.getBestClients = asyncHandler(async (req, res) => {
  const { start, end, limit = 2 } = req.query;

  const bestClients = await queryBestClients(start, end, limit);
  const result = mapClientsResult(bestClients);

  res.json(result);
});
