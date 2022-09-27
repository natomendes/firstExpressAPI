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
module.exports = app;
