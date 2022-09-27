const express = require('express');

const teams = require('./data/teams');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res
    .status(200)
    .json(
      {
        message: 'Olá Mundo!',
      },
    ));

app.get('/teams/:id', (req, res) => {
  const { id: reqId } = req.params;
  const team = teams.find(({ id }) => id === Number(reqId));
  if (!team) {
    return res
      .status(404)
      .json({ 
          message: 'Team not found!',
        });
  }

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

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res
    .status(201)
    .json(
      {
        team: newTeam,
      },
    );
});

app.put('/teams/:id', (req, res) => {
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
module.exports = app;
