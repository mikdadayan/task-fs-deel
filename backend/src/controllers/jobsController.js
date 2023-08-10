const { Job, Contract, Profile, sequelize } = require("../model");
const { Op } = require("sequelize");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route GET /jobs/unpaid
 * @middleware getProfile
 * @description Returns all unpaid jobs for the authenticated user (either as a client or contractor), for active contracts only.
 * @returns {Array} List of unpaid jobs for active contracts.
 * @throws {500} If an unexpected error occurs.
 */
exports.getUnpaidJobs = asyncHandler(async (req, res) => {
  const { id } = req.profile;

  const unpaidJobs = await Job.findAll({
    where: { paid: false },
    include: [
      {
        model: Contract,
        where: {
          [Op.or]: [{ ClientId: id }, { ContractorId: id }],
          status: "in_progress",
        },
      },
    ],
  });

  res.json(unpaidJobs);
});

exports.getJobs = asyncHandler(async (req, res) => {
  const contractorId = req.get("selectedContractorId");

  const jobs = await Job.findAll({
    include: [
      {
        model: Contract,
        where: {
          [Op.or]: [{ ContractorId: contractorId }],
          status: "in_progress",
        },
      },
    ],
  });

  res.json(jobs);
});

/**
 * @route POST /jobs/:id/pay
 * @middleware getProfile
 * @description Pay for a job, a client can only pay if his balance >= the amount to pay.
 * @param {number} id - Job ID which will be payed
 * @returns {Object} Success message if the payment is successful.
 * @throws {400} If the profile is not a client or the balance is insufficient or id is invalid.
 * @throws {404} If the job is not found.
 * @throws {500} If an unexpected error occurs.
 */
exports.payForJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const client = req.profile;

  if (client.type !== "client") {
    return res.status(400).json({ error: "Only clients can pay for a job." });
  }

  const job = await Job.findOne({ where: { id: id } });

  if (!job) return res.status(404).end();

  const contract = await Contract.findOne({ where: { id: job.ContractId } });
  const contractor = await Profile.findOne({
    where: { id: contract.ContractorId },
  });

  if (client.balance < job.price) {
    return res
      .status(400)
      .json({ error: "Insufficient balance to pay for this job." });
  }
  if (job.paid) {
    return res.status(400).json({ error: "This job is already paid for." });
  }

  const transaction = await sequelize.transaction();

  try {
    // Update the balances
    client.balance -= job.price;
    contractor.balance += job.price;
    await client.save({ transaction });
    await contractor.save({ transaction });

    job.paid = true;
    job.paymentDate = new Date();
    await job.save({ transaction });

    await transaction.commit();

    res.json({ success: "Payment successful!", profile: client });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
});
