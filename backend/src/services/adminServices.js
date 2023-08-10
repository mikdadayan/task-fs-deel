const { Job, Contract, Profile, sequelize } = require('../model');
const { Op } = require('sequelize');

async function queryBestClients(start, end, limit) {
  // Query to find the clients who paid the most for jobs in the specified time period
  const bestClients = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)],
      },
    },
    include: [
      {
        model: Contract,
        attributes: ['ClientId'],
        include: {
          model: Profile,
          as: 'Client',
          attributes: ['id', 'firstName', 'lastName'],
        },
      },
    ],
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'paid']],
    group: ['Contract.ClientId'],
    order: [[sequelize.literal('paid'), 'DESC']],
    limit: parseInt(limit, 10),
  });

  return bestClients;
}

function mapClientsResult(clients) {
  // Map the result to include fullName
  return clients.map((client) => ({
    id: client.Contract.Client.id,
    fullName: `${client.Contract.Client.firstName} ${client.Contract.Client.lastName}`,
    paid: client.getDataValue('paid'),
  }));
}

async function queryBestProfession(start, end) {
  // Query to find the best profession for a contractor
  const bestProfession = await Job.findAll({
    include: [
      {
        model: Contract,
        where: {
          status: 'in_progress',
        },
        include: [
          {
            model: Profile,
            as: 'Contractor',
            attributes: ['profession'],
          },
        ],
      },
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)],
      },
    },
    attributes: [
      [sequelize.fn('SUM', sequelize.col('price')), 'totalEarnings'],
      [sequelize.col('Contract.Contractor.profession'), 'profession'],
    ],
    group: [sequelize.col('Contract.Contractor.profession')],
    order: [[sequelize.fn('SUM', sequelize.col('price')), 'DESC']],
    limit: 1,
  });

  return bestProfession;
}

module.exports = { queryBestClients, mapClientsResult, queryBestProfession };
