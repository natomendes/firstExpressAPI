const express = require('express');
const validateTeam = require('../middlewares/validateTeam');
const existingId = require('../middlewares/existingId');
const apiCredentials = require('../middlewares/apiCredentials');

const router = express.Router();

let teams = require('../data/teams');

let nextId = 3;

router.use(apiCredentials);

router.get('/:id', existingId, (req, res) => {
  const { id: reqId } = req.params;
  const team = teams.find(({ id }) => id === Number(reqId));

  res
    .status(200)
    .json({
      ...team,
    });
});

router.get('/', (req, res) => res
  .status(200)
  .json(
    {
      teams,
    },
  ));    

router.post('/', validateTeam, (req, res) => {
  const team = { id: nextId, ...req.body };
  const { teams: teamsAllowed } = req.teams;
  const { initials: reqInitials } = req.body;
  if (!teamsAllowed.includes(reqInitials)) {
    return res
      .status(401)
      .json({
        message: `Cannot add this team, choose one of the follow: ${teamsAllowed.toString()}`,
      });
  }

  if (teams.some(({ initials }) => initials === reqInitials)) {
    return res
      .status(401)
      .json({
        message: 'Team allready on the list',
      });
  }
  teams.push(team);
  nextId += 1;
  res
    .status(201)
    .json(
      {
        team,
      },
    );
});

router.put('/:id', validateTeam, (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  let updatedTeam;

  for (let i = 0; i < teams.length; i += 1) {
    const team = teams[i];
    if (team.id === Number(id)) {
      team.name = name;
      team.initials = initials;
      updatedTeam = team;
    }
  }

  res
    .status(200)
    .json(
      {
        updatedTeam,
      },
    );
});

router.delete('/:id', existingId, (req, res) => {
  const { id: reqId } = req.params;
  const deletedTeam = teams.find(({ id }) => id === Number(reqId));

  teams = teams.filter(({ id }) => id !== Number(reqId));
  res
    .status(200)
    .json({
      deletedTeam,
    });
});

module.exports = router;