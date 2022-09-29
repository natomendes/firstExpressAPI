const teams = require('../data/teams');

const existingId = (req, res, next) => {
  const { id: reqId } = req.params;
  const team = teams.find(({ id }) => id === Number(reqId));
  if (!team) {
    return res
      .status(400)
      .json({ 
          message: 'Team not found!',
        });
  }

  next();
};

module.exports = existingId;