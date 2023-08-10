const express = require("express");
const { getProfile } = require("../middleware/getProfile");

const {
  getUnpaidJobs,
  payForJob,
  getJobs,
} = require("../controllers/jobsController");
const { depositBalance } = require("../controllers/balancesController");
const {
  getBestProfession,
  getBestClients,
} = require("../controllers/adminController");
const {
  validatePayJob,
  validateDeposit,
  validateBestProfession,
  validateBestClients,
} = require("../validators");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const {
  adminRateLimiter,
  balanceRateLimiter,
  jobsRateLimiter,
  profilesRateLimiter,
} = require("../utils/rateLimiter");
const {
  getProfiles,
  loginProfile,
} = require("../controllers/profileController");

const router = express.Router();

// Profile Routes
router.get("/profiles", profilesRateLimiter, getProfiles);
router.post("/login", loginProfile);

// Jobs Routes
router.get("/jobs/unpaid", jobsRateLimiter, getProfile, getUnpaidJobs);
router.get("/jobs", jobsRateLimiter, getProfile, getJobs);

router.post(
  "/jobs/:id/pay",
  jobsRateLimiter,
  validatePayJob,
  handleValidationErrors,
  getProfile,
  payForJob
);

// Balances Routes
router.post(
  "/balances/deposit/:userId",
  balanceRateLimiter,
  validateDeposit,
  handleValidationErrors,
  depositBalance
);

// Admin Routes
router.get(
  "/admin/best-profession",
  adminRateLimiter,
  validateBestProfession,
  handleValidationErrors,
  getBestProfession
);
router.get(
  "/admin/best-clients",
  adminRateLimiter,
  validateBestClients,
  handleValidationErrors,
  getBestClients
);

module.exports = router;
