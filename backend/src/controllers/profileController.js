const asyncHandler = require("../utils/asyncHandler");

const getProfiles = asyncHandler(async (req, res, next) => {
  let { type } = req.query;
  type = type || "client";
  const { Profile } = req.app.get("models");
  const profiles = await Profile.findAll({
    where: { type },
  });
  res.json({
    message: "Client profiles.",
    profiles: profiles,
  });
});

const loginProfile = asyncHandler(async (req, res, next) => {
  const id = req.body.id;
  const { Profile } = req.app.get("models");
  const profile = await Profile.findOne({
    where: { id },
  });
  if (!profile) return res.status(401).end();
  res.json({
    token: profile.id,
    profile: profile,
  });
});
module.exports = { getProfiles, loginProfile };
