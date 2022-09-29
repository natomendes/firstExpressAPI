const validateTeam = (req, res, next) => {
  const requiredProperties = ['name', 'initials'];
  if (requiredProperties.every((property) => property in req.body)) {
    next(); // Chama o próximo middleware
  } else {
    res
      .status(400)
      .json({
        error: 'Team not found!',
      }); // Ou já responde avisando que deu errado
  }
};

module.exports = validateTeam;