const { Profile, Job, Contract } = require('../model');

async function findClientProfile(userId) {
  const clientProfile = await Profile.findOne({
    where: { id: userId },
  });
  if (!clientProfile) {
    throw new Error('Client profile not found.');
  }
  return clientProfile;
}

async function calculateUnpaidJobsTotal(clientId) {
  return await Job.sum('price', {
    include: [
      {
        model: Contract,
        as: 'Contract',
        where: { status: 'in_progress', ClientId: clientId },
      },
    ],
    where: { paid: false },
  });
}

async function updateBalance(clientProfile, amount) {
  clientProfile.balance += amount;
  await clientProfile.save();
}

module.exports = {
  findClientProfile,
  calculateUnpaidJobsTotal,
  updateBalance,
};
