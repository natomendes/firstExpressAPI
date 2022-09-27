const express = require('express');

const teams = require('./data/teams');

const app = express();

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
module.exports = app;
