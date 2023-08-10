const rateLimit = require("express-rate-limit");

// windowsMS - minute
// limit each IP to max requests per windowMs

const adminRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many requests from this IP, please try again later",
});

const balanceRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "Too many requests for balance operations, please try again later",
});

const jobsRateLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 55, 
  message: "Too many requests for job operations, please try again later",
});

const profilesRateLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 35, 
  message: "Too many requests for profiles operations, please try again later",
});

module.exports = {
  adminRateLimiter,
  balanceRateLimiter,
  jobsRateLimiter,
  profilesRateLimiter,
};
