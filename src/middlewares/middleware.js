const validatePokemon = (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight } = req.body;
  if (!name || !hp || !attack || !defense || !speed || !height || !weight)
    return res.status(400).send({ error: 'Missing info' });
  next();
};

module.exports = validatePokemon;
