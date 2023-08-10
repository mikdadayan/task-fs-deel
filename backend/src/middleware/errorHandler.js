module.exports = (err, req, res, next) => {
  console.error(err);

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  // Handle Sequelize errors
  if (err.name === "SequelizeError") {
    return res.status(400).json({ error: err.message });
  }

  // Handle custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle unexpected errors
  return res.status(500).json({ error: "An unexpected error occurred." });
};
