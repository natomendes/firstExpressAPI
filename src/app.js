const express = require('express');
require('express-async-errors');
const teamsRouter = require('./routes/teamsRouter');

const app = express();

app.use(express.json());

app.use('/teams', teamsRouter);

module.exports = app;
