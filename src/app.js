const express = require('express');
const existingId = require('./middlewares/existingId');

let teams = require('./data/teams');
const validateTeam = require('./middlewares/validateTeam');

let nextId = 3;

const app = express();

app.use(express.json());

app.get('/teams/:id', existingId, (req, res) => {
  const { id: reqId } = req.params;
  const team = teams.find(({ id }) => id === Number(reqId));

  res
    .status(200)
    .json({
      ...team,
    });
});

app.get('/teams', (req, res) => res
  .status(200)
  .json(
    {
      teams,
    },
  ));    

app.post('/teams', validateTeam, (req, res) => {
  const team = { id: nextId, ...req.body };
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

app.put('/teams/:id', validateTeam, (req, res) => {
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

app.delete('/teams/:id', existingId, (req, res) => {
  const { id: reqId } = req.params;
  const deletedTeam = teams.find(({ id }) => id === Number(reqId));

  teams = teams.filter(({ id }) => id !== Number(reqId));
  res
    .status(200)
    .json({
      deletedTeam,
    });
});
module.exports = app;
